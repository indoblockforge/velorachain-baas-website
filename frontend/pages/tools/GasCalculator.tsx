import React from 'react';
import SectionContainer from '../../components/ui/SectionContainer';
import GasCalculatorWidget from '../../components/GasCalculator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fuel, Info, TrendingUp, Clock, DollarSign } from 'lucide-react';

export default function GasCalculatorPage() {
  const tips = [
    {
      icon: TrendingUp,
      title: 'Gas Price Patterns',
      description: 'Gas prices are typically lower during weekends and late night hours (UTC).'
    },
    {
      icon: Clock,
      title: 'Transaction Timing',
      description: 'For non-urgent transactions, consider using slow speed during network congestion.'
    },
    {
      icon: DollarSign,
      title: 'Cost Optimization',
      description: 'Batch multiple operations into a single transaction to save on gas costs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SectionContainer background="white" padding="normal">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">Tools</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gas Fee Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate accurate gas fees for your blockchain transactions across multiple networks
          </p>
        </div>
      </SectionContainer>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <GasCalculatorWidget />
          </div>

          {/* Tips and Info */}
          <div className="space-y-6">
            {/* Gas Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Gas Optimization Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Network Info */}
            <Card>
              <CardHeader>
                <CardTitle>Network Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ethereum</span>
                    <Badge variant="secondary">EIP-1559</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Polygon</span>
                    <Badge variant="secondary">Low Fees</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">BSC</span>
                    <Badge variant="secondary">Fast</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Status */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="font-medium text-green-900">Live Data</p>
                    <p className="text-sm text-green-700">Real-time gas prices from network</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}