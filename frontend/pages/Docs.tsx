import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SectionContainer from '../components/ui/SectionContainer';
import { 
  Book, 
  Code, 
  Play, 
  Search,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Zap,
  Shield,
  Globe,
  Wallet,
  Database
} from 'lucide-react';

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const quickStart = {
    title: 'Quick Start Guide',
    description: 'Get up and running with VeloraChain in under 5 minutes',
    steps: [
      {
        title: 'Install SDK',
        code: 'npm install @velorachain/sdk',
        description: 'Install our JavaScript/TypeScript SDK'
      },
      {
        title: 'Initialize Client',
        code: `import { VeloraChain } from '@velorachain/sdk';

const client = new VeloraChain({
  apiKey: 'your_api_key_here',
  network: 'ethereum'
});`,
        description: 'Create a new client instance'
      },
      {
        title: 'Deploy Contract',
        code: `const contract = await client.contracts.deploy({
  type: 'ERC20',
  name: 'MyToken',
  symbol: 'MTK',
  supply: 1000000
});

console.log('Contract deployed:', contract.address);`,
        description: 'Deploy your first smart contract'
      }
    ]
  };

  const apiCategories = [
    {
      title: 'Smart Contracts',
      icon: Code,
      description: 'Deploy and interact with smart contracts',
      endpoints: [
        { method: 'POST', path: '/contracts/deploy', description: 'Deploy smart contract' },
        { method: 'GET', path: '/contracts/{address}', description: 'Get contract details' },
        { method: 'POST', path: '/contracts/{address}/call', description: 'Call contract function' }
      ]
    },
    {
      title: 'Wallets',
      icon: Wallet,
      description: 'Manage wallets and balances',
      endpoints: [
        { method: 'POST', path: '/wallets/create', description: 'Create new wallet' },
        { method: 'GET', path: '/wallets/{address}/balance', description: 'Get wallet balance' },
        { method: 'GET', path: '/wallets/{address}/transactions', description: 'Get transaction history' }
      ]
    },
    {
      title: 'Transactions',
      icon: Zap,
      description: 'Send and track transactions',
      endpoints: [
        { method: 'POST', path: '/transactions/send', description: 'Send transaction' },
        { method: 'GET', path: '/transactions/{hash}', description: 'Get transaction details' },
        { method: 'GET', path: '/transactions/{hash}/receipt', description: 'Get transaction receipt' }
      ]
    },
    {
      title: 'Analytics',
      icon: Database,
      description: 'Access analytics and metrics',
      endpoints: [
        { method: 'GET', path: '/analytics/overview', description: 'Get overview metrics' },
        { method: 'GET', path: '/analytics/transactions', description: 'Get transaction analytics' },
        { method: 'GET', path: '/analytics/usage', description: 'Get API usage stats' }
      ]
    }
  ];

  const codeExamples = [
    {
      title: 'Deploy ERC20 Token',
      language: 'javascript',
      code: `// Deploy an ERC20 token contract
const tokenContract = await client.contracts.deploy({
  type: 'ERC20',
  name: 'VeloraToken',
  symbol: 'VLR',
  supply: 1000000, // 1M tokens
  decimals: 18
});

console.log('Token deployed at:', tokenContract.address);

// Mint additional tokens
const mintTx = await tokenContract.mint({
  to: '0x123...abc',
  amount: 10000
});

console.log('Mint transaction:', mintTx.hash);`
    },
    {
      title: 'Send Transaction',
      language: 'javascript',
      code: `// Send ETH transaction
const transaction = await client.transactions.send({
  from: '0x123...abc',
  to: '0x456...def',
  value: '1.5', // 1.5 ETH
  gasLimit: 21000
});

console.log('Transaction sent:', transaction.hash);

// Wait for confirmation
const receipt = await transaction.wait();
console.log('Transaction confirmed:', receipt.status);`
    },
    {
      title: 'Check Balance',
      language: 'javascript',
      code: `// Get native token balance (ETH)
const ethBalance = await client.wallets.getBalance({
  address: '0x123...abc',
  token: 'native'
});

console.log('ETH Balance:', ethBalance.formatted);

// Get ERC20 token balance
const tokenBalance = await client.wallets.getBalance({
  address: '0x123...abc',
  token: '0x456...def' // Token contract address
});

console.log('Token Balance:', tokenBalance.formatted);`
    }
  ];

  const tutorials = [
    {
      title: 'Building a DeFi App',
      description: 'Learn how to build a complete DeFi application with staking and rewards',
      duration: '45 min',
      level: 'Advanced'
    },
    {
      title: 'NFT Marketplace',
      description: 'Create an NFT marketplace with minting and trading functionality',
      duration: '30 min',
      level: 'Intermediate'
    },
    {
      title: 'Token Launchpad',
      description: 'Build a token launchpad for ICOs and token sales',
      duration: '25 min',
      level: 'Intermediate'
    },
    {
      title: 'Multi-signature Wallet',
      description: 'Implement a multi-signature wallet for enhanced security',
      duration: '35 min',
      level: 'Advanced'
    }
  ];

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SectionContainer background="white" padding="normal">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">Documentation</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Developer Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to build amazing blockchain applications with VeloraChain
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </SectionContainer>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { name: 'Quick Start', href: '#quick-start' },
                    { name: 'API Reference', href: '#api-reference' },
                    { name: 'Code Examples', href: '#examples' },
                    { name: 'Tutorials', href: '#tutorials' },
                    { name: 'SDKs', href: '#sdks' },
                    { name: 'Webhooks', href: '#webhooks' },
                    { name: 'Rate Limits', href: '#rate-limits' },
                    { name: 'Support', href: '#support' }
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Quick Start */}
            <section id="quick-start">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Play className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{quickStart.title}</CardTitle>
                      <p className="text-gray-600">{quickStart.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {quickStart.steps.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          <div className="relative">
                            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{step.code}</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 text-gray-400 hover:text-white"
                              onClick={() => copyCode(step.code, `step-${index}`)}
                            >
                              {copiedCode === `step-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                      {index < quickStart.steps.length - 1 && (
                        <div className="absolute left-4 top-10 w-0.5 h-16 bg-gray-200"></div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* API Reference */}
            <section id="api-reference">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">API Reference</h2>
                <p className="text-gray-600">Comprehensive API documentation for all endpoints</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apiCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <category.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle>{category.title}</CardTitle>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.endpoints.map((endpoint, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                            <div className="flex items-center space-x-3">
                              <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'} className="text-xs">
                                {endpoint.method}
                              </Badge>
                              <code className="text-sm font-mono">{endpoint.path}</code>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        View All Endpoints
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Code Examples */}
            <section id="examples">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Code Examples</h2>
                <p className="text-gray-600">Real-world examples to get you started quickly</p>
              </div>

              <div className="space-y-6">
                {codeExamples.map((example, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{example.title}</CardTitle>
                        <Badge variant="secondary">{example.language}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{example.code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-gray-400 hover:text-white"
                          onClick={() => copyCode(example.code, `example-${index}`)}
                        >
                          {copiedCode === `example-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Tutorials */}
            <section id="tutorials">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Tutorials</h2>
                <p className="text-gray-600">Step-by-step guides for building complete applications</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {tutorial.title}
                        <Badge variant="outline">{tutorial.level}</Badge>
                      </CardTitle>
                      <p className="text-gray-600">{tutorial.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <FileText className="w-4 h-4 mr-1" />
                          {tutorial.duration}
                        </div>
                        <Button variant="outline" size="sm">
                          Start Tutorial
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* SDKs */}
            <section id="sdks">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Official SDKs</CardTitle>
                  <p className="text-gray-600">Use VeloraChain in your preferred programming language</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'JavaScript/TypeScript', version: 'v2.1.0', downloads: '10K+' },
                      { name: 'Python', version: 'v1.8.3', downloads: '5K+' },
                      { name: 'Go', version: 'v1.5.2', downloads: '3K+' },
                      { name: 'PHP', version: 'v1.2.1', downloads: '2K+' },
                      { name: 'Java', version: 'v1.1.0', downloads: '1K+' },
                      { name: 'C#', version: 'v0.9.5', downloads: '800+' }
                    ].map((sdk, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{sdk.name}</h4>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{sdk.version}</span>
                          <span>{sdk.downloads}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          Install
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Support */}
            <section id="support">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Need Help?</CardTitle>
                  <p className="text-gray-600">Get support from our team and community</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Book className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Documentation</h4>
                      <p className="text-sm text-gray-600 mb-4">Comprehensive guides and API reference</p>
                      <Button variant="outline" size="sm">Browse Docs</Button>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
                      <p className="text-sm text-gray-600 mb-4">Join our Discord community</p>
                      <Button variant="outline" size="sm">Join Discord</Button>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                      <p className="text-sm text-gray-600 mb-4">24/7 technical support</p>
                      <Button variant="outline" size="sm">Contact Support</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}