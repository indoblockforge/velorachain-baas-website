import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCw, Zap, Clock, DollarSign, Fuel } from 'lucide-react';
import { gasCalculator, type GasPrices, type TransactionType } from '../lib/gasCalculator';
import { SUPPORTED_CHAINS, type SupportedChain } from '../lib/chains';

interface GasCalculatorProps {
  className?: string;
}

export const GasCalculatorWidget: React.FC<GasCalculatorProps> = ({ className = '' }) => {
  const [selectedChain, setSelectedChain] = useState<SupportedChain>('ethereum');
  const [transactionType, setTransactionType] = useState<TransactionType['type']>('transfer');
  const [gasEstimates, setGasEstimates] = useState<GasPrices | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customGasLimit, setCustomGasLimit] = useState<string>('');

  useEffect(() => {
    calculateGas();
  }, [selectedChain, transactionType]);

  const calculateGas = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const estimates = await gasCalculator.estimateGas(selectedChain, { type: transactionType });
      setGasEstimates(estimates);
    } catch (err) {
      setError('Failed to calculate gas fees. Please try again.');
      console.error('Gas calculation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSpeedIcon = (speed: string) => {
    switch (speed) {
      case 'slow':
        return <Clock className="w-4 h-4" />;
      case 'standard':
        return <Zap className="w-4 h-4" />;
      case 'fast':
        return <Fuel className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case 'slow':
        return 'text-blue-600 bg-blue-100';
      case 'standard':
        return 'text-green-600 bg-green-100';
      case 'fast':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSpeedTime = (speed: string) => {
    switch (speed) {
      case 'slow':
        return '~5 min';
      case 'standard':
        return '~2 min';
      case 'fast':
        return '~30 sec';
      default:
        return '~2 min';
    }
  };

  const chainConfig = SUPPORTED_CHAINS[selectedChain];

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fuel className="w-5 h-5 mr-2" />
            Gas Fee Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="chain-select">Blockchain Network</Label>
              <Select value={selectedChain} onValueChange={(value: SupportedChain) => setSelectedChain(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SUPPORTED_CHAINS).map(([key, chain]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center space-x-2">
                        <span>{chain.name}</span>
                        {chain.testnet && (
                          <Badge variant="outline" className="text-xs">
                            Testnet
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="transaction-type">Transaction Type</Label>
              <Select value={transactionType} onValueChange={(value: TransactionType['type']) => setTransactionType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer">ETH/Native Transfer</SelectItem>
                  <SelectItem value="token_transfer">ERC20 Token Transfer</SelectItem>
                  <SelectItem value="nft_transfer">NFT Transfer</SelectItem>
                  <SelectItem value="contract_call">Smart Contract Call</SelectItem>
                  <SelectItem value="contract_deploy">Contract Deployment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Custom Gas Limit */}
          <div>
            <Label htmlFor="custom-gas">Custom Gas Limit (Optional)</Label>
            <Input
              id="custom-gas"
              type="number"
              placeholder="Leave empty for auto-estimate"
              value={customGasLimit}
              onChange={(e) => setCustomGasLimit(e.target.value)}
            />
          </div>

          {/* Refresh Button */}
          <Button
            onClick={calculateGas}
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Estimates
              </>
            )}
          </Button>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Gas Estimates */}
          {gasEstimates && !isLoading && (
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Gas Fee Estimates</h4>
              
              <Tabs defaultValue="standard" className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="slow" className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Slow</span>
                  </TabsTrigger>
                  <TabsTrigger value="standard" className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Standard</span>
                  </TabsTrigger>
                  <TabsTrigger value="fast" className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4" />
                    <span>Fast</span>
                  </TabsTrigger>
                </TabsList>

                {(['slow', 'standard', 'fast'] as const).map((speed) => {
                  const estimate = gasEstimates[speed];
                  return (
                    <TabsContent key={speed} value={speed}>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            {/* Speed Info */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge className={getSpeedColor(speed)}>
                                  {getSpeedIcon(speed)}
                                  <span className="ml-1 capitalize">{speed}</span>
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  {getSpeedTime(speed)}
                                </span>
                              </div>
                            </div>

                            {/* Gas Details */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Gas Limit</p>
                                <p className="font-semibold">
                                  {estimate.gasLimit.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Gas Price</p>
                                <p className="font-semibold">
                                  {gasCalculator.formatGasPrice(estimate.gasPrice)} gwei
                                </p>
                              </div>
                            </div>

                            {/* EIP-1559 Details */}
                            {estimate.maxFeePerGas && estimate.maxPriorityFeePerGas && (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-600">Max Fee</p>
                                  <p className="font-semibold">
                                    {gasCalculator.formatGasPrice(estimate.maxFeePerGas)} gwei
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Priority Fee</p>
                                  <p className="font-semibold">
                                    {gasCalculator.formatGasPrice(estimate.maxPriorityFeePerGas)} gwei
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Total Cost */}
                            <div className="pt-4 border-t">
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">Total Cost</span>
                                <div className="text-right">
                                  <p className="text-lg font-bold">
                                    {gasCalculator.formatCost(estimate.totalCost)} {chainConfig.symbol}
                                  </p>
                                  {estimate.totalCostUSD && (
                                    <p className="text-sm text-gray-600 flex items-center">
                                      <DollarSign className="w-3 h-3 mr-1" />
                                      {gasCalculator.formatUSD(estimate.totalCostUSD)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  );
                })}
              </Tabs>

              {/* Network Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-blue-900">{chainConfig.name}</p>
                      <p className="text-sm text-blue-700">
                        Native Token: {chainConfig.symbol}
                      </p>
                    </div>
                    {chainConfig.testnet && (
                      <Badge variant="outline" className="border-blue-300 text-blue-800">
                        Testnet
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GasCalculatorWidget;