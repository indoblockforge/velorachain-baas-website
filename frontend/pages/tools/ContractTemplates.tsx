import React, { useState } from 'react';
import SectionContainer from '../../components/ui/SectionContainer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CONTRACT_TEMPLATES, 
  getTemplatesByCategory, 
  type ContractTemplate 
} from '../../lib/contractTemplates';
import { Code, Copy, ExternalLink, Zap, Shield, Users } from 'lucide-react';

export default function ContractTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ContractTemplate['category']>('token');
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);

  const categories = [
    { key: 'token' as const, name: 'Tokens', icon: Zap, count: getTemplatesByCategory('token').length },
    { key: 'nft' as const, name: 'NFTs', icon: Shield, count: getTemplatesByCategory('nft').length },
    { key: 'defi' as const, name: 'DeFi', icon: Code, count: getTemplatesByCategory('defi').length },
    { key: 'dao' as const, name: 'DAO', icon: Users, count: getTemplatesByCategory('dao').length },
    { key: 'game' as const, name: 'Gaming', icon: Users, count: getTemplatesByCategory('game').length },
    { key: 'utility' as const, name: 'Utility', icon: Code, count: getTemplatesByCategory('utility').length },
  ];

  const filteredTemplates = getTemplatesByCategory(selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SectionContainer background="white" padding="normal">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">Smart Contracts</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contract Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready-to-deploy smart contract templates for common blockchain use cases
          </p>
        </div>
      </SectionContainer>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ContractTemplate['category'])}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-8">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.key} 
                value={category.key}
                className="flex items-center space-x-2"
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.key} value={category.key}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge className={getDifficultyColor(template.difficulty)} variant="secondary">
                          {template.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Deployment Cost */}
                        <div className="text-sm">
                          <p className="text-gray-600 mb-1">Estimated Gas Cost:</p>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>ETH: ~{template.deploymentCost.ethereum} ETH</div>
                            <div>MATIC: ~{template.deploymentCost.polygon} MATIC</div>
                            <div>BNB: ~{template.deploymentCost.bsc} BNB</div>
                          </div>
                        </div>

                        <Button className="w-full" size="sm">
                          View Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Template Modal/Detail View */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
                  <p className="text-gray-600">{selectedTemplate.description}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTemplate(null)}
                >
                  ×
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Constructor Parameters */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Constructor Parameters</h3>
                <div className="space-y-3">
                  {selectedTemplate.constructorParams.map((param, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{param.name}</span>
                        <Badge variant="outline">{param.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{param.description}</p>
                      {param.defaultValue && (
                        <p className="text-xs text-gray-500 mt-1">
                          Default: {param.defaultValue}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Code */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Source Code</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyCode(selectedTemplate.sourceCode)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
                <div className="relative">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{selectedTemplate.sourceCode}</code>
                  </pre>
                </div>
              </div>

              {/* Deployment Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Deployment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-medium mb-2">Ethereum</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        ~{selectedTemplate.deploymentCost.ethereum} ETH
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-medium mb-2">Polygon</h4>
                      <p className="text-2xl font-bold text-purple-600">
                        ~{selectedTemplate.deploymentCost.polygon} MATIC
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-medium mb-2">BSC</h4>
                      <p className="text-2xl font-bold text-yellow-600">
                        ~{selectedTemplate.deploymentCost.bsc} BNB
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-4 border-t">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Deploy with VeloraChain
                </Button>
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}