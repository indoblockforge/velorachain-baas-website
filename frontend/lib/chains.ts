export interface ChainConfig {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
  testnet?: boolean;
}

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  ethereum: {
    id: 1,
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
    explorerUrl: 'https://etherscan.io'
  },
  goerli: {
    id: 5,
    name: 'Goerli Testnet',
    symbol: 'ETH',
    rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/demo',
    explorerUrl: 'https://goerli.etherscan.io',
    testnet: true
  },
  polygon: {
    id: 137,
    name: 'Polygon Mainnet',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com'
  },
  mumbai: {
    id: 80001,
    name: 'Mumbai Testnet',
    symbol: 'MATIC',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    explorerUrl: 'https://mumbai.polygonscan.com',
    testnet: true
  },
  bsc: {
    id: 56,
    name: 'BSC Mainnet',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed1.binance.org',
    explorerUrl: 'https://bscscan.com'
  },
  bscTestnet: {
    id: 97,
    name: 'BSC Testnet',
    symbol: 'BNB',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    explorerUrl: 'https://testnet.bscscan.com',
    testnet: true
  }
};

export type SupportedChain = keyof typeof SUPPORTED_CHAINS;