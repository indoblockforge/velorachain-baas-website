import { Link } from 'react-router-dom';
import HeroSection from '../components/ui/HeroSection';
import SectionContainer from '../components/ui/SectionContainer';
import FeatureCard from '../components/ui/FeatureCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  BarChart3, 
  Shield, 
  Zap, 
  Wallet, 
  Globe,
  ArrowRight,
  CheckCircle,
  Monitor,
  Key,
  Database,
  Cloud,
  Smartphone,
  Settings
} from 'lucide-react';

export default function Products() {
  const mainFeatures = [
    {
      icon: Code,
      title: 'REST API & SDK',
      description: 'API yang mudah digunakan dengan SDK untuk berbagai bahasa pemrograman',
      features: [
        'REST API dengan dokumentasi lengkap',
        'SDK untuk JavaScript, Python, Go, dan PHP',
        'Real-time webhooks dan notifications',
        'Rate limiting dan caching built-in',
        'Sandbox environment untuk testing'
      ]
    },
    {
      icon: Monitor,
      title: 'Analytics Dashboard',
      description: 'Dashboard real-time untuk monitoring dan analytics aplikasi blockchain',
      features: [
        'Real-time transaction monitoring',
        'Performance metrics dan analytics',
        'Custom alerts dan notifications',
        'Export data ke CSV/JSON',
        'Multi-user access control'
      ]
    },
    {
      icon: Globe,
      title: 'Multi-chain Support',
      description: 'Dukungan untuk multiple blockchain networks dalam satu platform',
      features: [
        'Ethereum, Polygon, BSC, Solana',
        'Testnet dan mainnet support',
        'Automatic chain switching',
        'Cross-chain asset tracking',
        'Custom RPC endpoints'
      ]
    },
    {
      icon: Wallet,
      title: 'Wallet Integration',
      description: 'Integrasi mudah dengan berbagai wallet dan payment methods',
      features: [
        'MetaMask, WalletConnect integration',
        'Hardware wallet support',
        'Custodial wallet management',
        'Multi-signature wallets',
        'Fiat on/off ramp integration'
      ]
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Keamanan tingkat enterprise dengan audit dan compliance',
      features: [
        'End-to-end encryption',
        'SOC 2 Type II certified',
        'Regular security audits',
        'GDPR compliance',
        'Advanced threat detection'
      ]
    },
    {
      icon: Zap,
      title: 'Fast Deployment',
      description: 'Deploy aplikasi blockchain dalam hitungan menit',
      features: [
        'One-click smart contract deployment',
        'Pre-built templates dan boilerplates',
        'CI/CD integration',
        'Auto-scaling infrastructure',
        'Global CDN untuk performance'
      ]
    }
  ];

  const apiFeatures = [
    {
      title: 'Smart Contract Management',
      description: 'Deploy, manage, dan interact dengan smart contracts',
      code: `// Deploy ERC20 token
const token = await velorachain.contracts.deploy({
  type: 'ERC20',
  name: 'MyToken',
  symbol: 'MTK',
  supply: 1000000
});`
    },
    {
      title: 'Transaction Processing',
      description: 'Process transaksi dengan fee optimization',
      code: `// Send transaction dengan gas optimization
const tx = await velorachain.transactions.send({
  to: '0x...',
  value: '1.5',
  currency: 'ETH',
  optimize: true
});`
    },
    {
      title: 'Wallet Operations',
      description: 'Manage wallets dan balance checking',
      code: `// Check wallet balance
const balance = await velorachain.wallets.getBalance({
  address: '0x...',
  chain: 'ethereum'
});`
    }
  ];

  const dashboardFeatures = [
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Monitor performance dan usage metrics secara real-time'
    },
    {
      icon: Database,
      title: 'Transaction History',
      description: 'Detailed transaction logs dengan filtering dan search'
    },
    {
      icon: Settings,
      title: 'Configuration Management',
      description: 'Manage API keys, webhooks, dan application settings'
    },
    {
      icon: Key,
      title: 'Access Control',
      description: 'Team management dengan role-based permissions'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Platform Blockchain Terlengkap"
        subtitle="API, SDK, Dashboard & Tools untuk Developer"
        description="Semua yang Anda butuhkan untuk membangun aplikasi blockchain. Dari API yang mudah digunakan hingga dashboard analytics yang powerful."
        primaryCTA={{
          text: 'Coba Gratis',
          href: '/pricing'
        }}
        secondaryCTA={{
          text: 'Lihat Dokumentasi',
          href: '/docs'
        }}
      />

      {/* Main Features */}
      <SectionContainer>
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Core Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fitur Lengkap untuk Setiap Kebutuhan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Platform terintegrasi dengan semua tools yang dibutuhkan untuk development blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            >
              <ul className="space-y-2">
                {feature.features.map((item, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </FeatureCard>
          ))}
        </div>
      </SectionContainer>

      {/* API Section */}
      <SectionContainer background="gray" id="api">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">API & SDK</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Developer-First API Design
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            RESTful API yang intuitif dengan SDK multi-bahasa dan dokumentasi lengkap.
          </p>
        </div>

        <Tabs defaultValue="smart-contracts" className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full mb-8">
            <TabsTrigger value="smart-contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
          </TabsList>

          {apiFeatures.map((feature, index) => (
            <TabsContent key={index} value={['smart-contracts', 'transactions', 'wallets'][index]}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <Link to="/docs">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Lihat Dokumentasi <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{feature.code}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SectionContainer>

      {/* Dashboard Section */}
      <SectionContainer id="dashboard">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Dashboard</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dashboard Analytics yang Powerful
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Monitor, analyze, dan optimize aplikasi blockchain Anda dengan dashboard yang intuitif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Lihat Demo Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 ml-4">VeloraChain Dashboard</span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">1,234</div>
                    <div className="text-sm text-gray-600">Total Transactions</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">$12.5K</div>
                    <div className="text-sm text-gray-600">Volume Today</div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-end justify-center space-x-1 p-4">
                  <div className="w-8 bg-blue-300 rounded-t"></div>
                  <div className="w-8 bg-blue-400 rounded-t" style={{height: '60%'}}></div>
                  <div className="w-8 bg-blue-500 rounded-t" style={{height: '80%'}}></div>
                  <div className="w-8 bg-blue-600 rounded-t" style={{height: '100%'}}></div>
                  <div className="w-8 bg-blue-400 rounded-t" style={{height: '70%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Security Section */}
      <SectionContainer background="gradient" id="security">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Security</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Keamanan Enterprise Grade
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Infrastruktur yang aman dan compliance dengan standar industri terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>SOC 2 Certified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Infrastruktur yang memenuhi standar SOC 2 Type II dengan audit keamanan berkala.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Key className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>End-to-End Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Semua data dan komunikasi dienkripsi menggunakan AES-256 dan TLS 1.3.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Cloud className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>99.9% Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Infrastruktur global dengan multi-region deployment dan auto-failover.
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Siap Memulai dengan VeloraChain?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan developer yang telah membangun aplikasi blockchain dengan platform kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                Mulai Gratis
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                Hubungi Sales
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}