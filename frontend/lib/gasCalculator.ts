import { ethers } from 'ethers';
import { web3Service } from './web3';
import { SUPPORTED_CHAINS, type SupportedChain } from './chains';

export interface GasEstimate {
  gasLimit: bigint;
  gasPrice: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  totalCost: string;
  totalCostUSD?: number;
  speed: 'slow' | 'standard' | 'fast';
}

export interface GasPrices {
  slow: GasEstimate;
  standard: GasEstimate;
  fast: GasEstimate;
}

export interface TransactionType {
  type: 'transfer' | 'contract_deploy' | 'contract_call' | 'token_transfer' | 'nft_transfer';
  data?: any;
}

export class GasCalculator {
  private ethPrice: number = 0;
  private maticPrice: number = 0;
  private bnbPrice: number = 0;
  
  constructor() {
    this.updateTokenPrices();
  }

  private async updateTokenPrices() {
    try {
      // In production, use a real price API like CoinGecko
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,matic-network,binancecoin&vs_currencies=usd');
      const prices = await response.json();
      
      this.ethPrice = prices.ethereum?.usd || 2000;
      this.maticPrice = prices['matic-network']?.usd || 0.8;
      this.bnbPrice = prices.binancecoin?.usd || 300;
    } catch (error) {
      console.warn('Failed to fetch token prices, using defaults');
      this.ethPrice = 2000;
      this.maticPrice = 0.8;
      this.bnbPrice = 300;
    }
  }

  private getTokenPrice(chain: SupportedChain): number {
    const chainConfig = SUPPORTED_CHAINS[chain];
    
    switch (chainConfig.symbol) {
      case 'ETH':
        return this.ethPrice;
      case 'MATIC':
        return this.maticPrice;
      case 'BNB':
        return this.bnbPrice;
      default:
        return 0;
    }
  }

  private getGasLimitEstimate(transactionType: TransactionType): bigint {
    switch (transactionType.type) {
      case 'transfer':
        return BigInt(21000);
      case 'token_transfer':
        return BigInt(65000);
      case 'nft_transfer':
        return BigInt(85000);
      case 'contract_call':
        return BigInt(150000);
      case 'contract_deploy':
        return BigInt(2000000);
      default:
        return BigInt(21000);
    }
  }

  async estimateGas(
    chain: SupportedChain,
    transactionType: TransactionType,
    transaction?: any
  ): Promise<GasPrices> {
    try {
      const chainConfig = SUPPORTED_CHAINS[chain];
      const tokenPrice = this.getTokenPrice(chain);
      
      // Initialize web3 service if needed
      if (!web3Service.getProvider()) {
        await web3Service.initialize({ chain });
      }

      let gasLimit: bigint;
      
      if (transaction && web3Service.getProvider()) {
        try {
          gasLimit = await web3Service.getProvider()!.estimateGas(transaction);
        } catch {
          gasLimit = this.getGasLimitEstimate(transactionType);
        }
      } else {
        gasLimit = this.getGasLimitEstimate(transactionType);
      }

      // Get current gas prices
      const feeData = web3Service.getProvider() 
        ? await web3Service.getProvider()!.getFeeData()
        : await this.getDefaultGasPrices(chain);

      const isEIP1559 = feeData.maxFeePerGas !== null;

      if (isEIP1559 && feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
        // EIP-1559 (Ethereum post-London fork)
        const baseFee = feeData.maxFeePerGas - feeData.maxPriorityFeePerGas;
        
        return {
          slow: this.calculateEIP1559Gas(
            gasLimit,
            baseFee,
            feeData.maxPriorityFeePerGas / BigInt(2),
            tokenPrice,
            'slow'
          ),
          standard: this.calculateEIP1559Gas(
            gasLimit,
            baseFee,
            feeData.maxPriorityFeePerGas,
            tokenPrice,
            'standard'
          ),
          fast: this.calculateEIP1559Gas(
            gasLimit,
            baseFee,
            feeData.maxPriorityFeePerGas * BigInt(2),
            tokenPrice,
            'fast'
          )
        };
      } else {
        // Legacy gas pricing
        const baseGasPrice = feeData.gasPrice || BigInt(20000000000); // 20 gwei default
        
        return {
          slow: this.calculateLegacyGas(
            gasLimit,
            baseGasPrice * BigInt(8) / BigInt(10), // 80% of base
            tokenPrice,
            'slow'
          ),
          standard: this.calculateLegacyGas(
            gasLimit,
            baseGasPrice,
            tokenPrice,
            'standard'
          ),
          fast: this.calculateLegacyGas(
            gasLimit,
            baseGasPrice * BigInt(15) / BigInt(10), // 150% of base
            tokenPrice,
            'fast'
          )
        };
      }
    } catch (error) {
      console.error('Gas estimation failed:', error);
      throw new Error('Failed to estimate gas costs');
    }
  }

  private calculateEIP1559Gas(
    gasLimit: bigint,
    baseFee: bigint,
    priorityFee: bigint,
    tokenPrice: number,
    speed: 'slow' | 'standard' | 'fast'
  ): GasEstimate {
    const maxFeePerGas = baseFee + priorityFee;
    const totalCostWei = gasLimit * maxFeePerGas;
    const totalCost = ethers.formatEther(totalCostWei);
    const totalCostUSD = parseFloat(totalCost) * tokenPrice;

    return {
      gasLimit,
      gasPrice: maxFeePerGas,
      maxFeePerGas,
      maxPriorityFeePerGas: priorityFee,
      totalCost,
      totalCostUSD,
      speed
    };
  }

  private calculateLegacyGas(
    gasLimit: bigint,
    gasPrice: bigint,
    tokenPrice: number,
    speed: 'slow' | 'standard' | 'fast'
  ): GasEstimate {
    const totalCostWei = gasLimit * gasPrice;
    const totalCost = ethers.formatEther(totalCostWei);
    const totalCostUSD = parseFloat(totalCost) * tokenPrice;

    return {
      gasLimit,
      gasPrice,
      totalCost,
      totalCostUSD,
      speed
    };
  }

  private async getDefaultGasPrices(chain: SupportedChain) {
    const chainConfig = SUPPORTED_CHAINS[chain];
    
    // Default gas prices based on chain
    let defaultGasPrice: bigint;
    
    switch (chainConfig.symbol) {
      case 'ETH':
        defaultGasPrice = BigInt(20000000000); // 20 gwei
        break;
      case 'MATIC':
        defaultGasPrice = BigInt(30000000000); // 30 gwei
        break;
      case 'BNB':
        defaultGasPrice = BigInt(5000000000); // 5 gwei
        break;
      default:
        defaultGasPrice = BigInt(20000000000);
    }

    return {
      gasPrice: defaultGasPrice,
      maxFeePerGas: null,
      maxPriorityFeePerGas: null
    };
  }

  formatGasPrice(gasPrice: bigint, unit: 'wei' | 'gwei' = 'gwei'): string {
    if (unit === 'gwei') {
      return ethers.formatUnits(gasPrice, 'gwei');
    }
    return gasPrice.toString();
  }

  formatCost(cost: string, decimals: number = 6): string {
    const num = parseFloat(cost);
    return num.toFixed(decimals);
  }

  formatUSD(usd: number): string {
    return `$${usd.toFixed(2)}`;
  }

  async getOptimalGasPrice(chain: SupportedChain): Promise<bigint> {
    try {
      await web3Service.initialize({ chain });
      const feeData = await web3Service.getProvider()!.getFeeData();
      
      if (feeData.maxFeePerGas) {
        return feeData.maxFeePerGas;
      } else if (feeData.gasPrice) {
        return feeData.gasPrice;
      } else {
        return await this.getDefaultGasPrices(chain).then(data => data.gasPrice!);
      }
    } catch (error) {
      console.error('Failed to get optimal gas price:', error);
      return (await this.getDefaultGasPrices(chain)).gasPrice!;
    }
  }
}

export const gasCalculator = new GasCalculator();