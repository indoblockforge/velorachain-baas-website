import { Link } from 'react-router-dom';
import HeroSection from '../components/ui/HeroSection';
import SectionContainer from '../components/ui/SectionContainer';
import FeatureCard from '../components/ui/FeatureCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  BarChart3, 
  Shield, 
  Zap, 
  Wallet, 
  Globe,
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  Layers
} from 'lucide-react';

export default function Homepage() {
  const features = [
    {
      icon: Code,
      title: 'API & SDK',
      description: 'REST API dan SDK multi-bahasa yang mudah diintegrasikan dengan dokumentasi lengkap dan code examples.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Dashboard real-time untuk monitoring transaksi, performa, dan analytics aplikasi blockchain Anda.'
    },
    {
      icon: Globe,
      title: 'Multi-chain Support',
      description: 'Dukungan untuk Ethereum, Polygon, BSC, Solana, dan blockchain populer lainnya dalam satu platform.'
    },
    {
      icon: Wallet,
      title: 'Wallet Integration',
      description: 'Integrasi mudah dengan MetaMask, WalletConnect, dan wallet populer lainnya.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Keamanan tingkat enterprise dengan enkripsi end-to-end dan audit keamanan berkala.'
    },
    {
      icon: Zap,
      title: 'Fast Deployment',
      description: 'Deploy aplikasi blockchain dalam hitungan menit dengan template dan boilerplate siap pakai.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO, TechStart Indonesia',
      content: 'VeloraChain membantu kami mengintegrasikan blockchain ke platform fintech dalam 2 minggu. Luar biasa!',
      rating: 5
    },
    {
      name: 'Ahmad Pratama',
      role: 'Lead Developer, E-commerce Plus',
      content: 'API yang sangat mudah digunakan dan dokumentasi yang lengkap. Tim support juga sangat responsif.',
      rating: 5
    },
    {
      name: 'Maria Santos',
      role: 'Product Manager, Supply Chain Pro',
      content: 'Multi-chain support dan dashboard analytics sangat membantu untuk tracking supply chain kami.',
      rating: 5
    }
  ];

  const partners = [
    'TechStart', 'BlockDev', 'CryptoLab', 'FinanceChain', 'Web3Studio', 'InnovateTech'
  ];

  const stats = [
    { label: 'Active Developers', value: '10,000+' },
    { label: 'API Calls/Month', value: '50M+' },
    { label: 'Transactions Processed', value: '1B+' },
    { label: 'Uptime', value: '99.9%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Bangun Aplikasi Blockchain Tanpa Ribet"
        subtitle="API & SDK untuk Semua Bisnis"
        description="Platform Blockchain-as-a-Service yang memungkinkan developer dan bisnis membangun aplikasi blockchain dengan mudah dan cepat. Dukungan multi-chain, dashboard analytics, dan security enterprise."
        primaryCTA={{
          text: 'Mulai Gratis',
          href: '/pricing'
        }}
        secondaryCTA={{
          text: 'Jadwalkan Demo',
          href: '/contact'
        }}
      >
        {/* Hero Image/Demo */}
        <div className="mt-12 relative">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-4 text-left">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <code className="text-green-400 text-sm">
                <div>// Deploy smart contract dengan 3 baris kode</div>
                <div><span className="text-blue-400">const</span> contract = <span className="text-yellow-400">await</span> velorachain.deploy({`{`}</div>
                <div>&nbsp;&nbsp;type: <span className="text-orange-400">'ERC20'</span>,</div>
                <div>&nbsp;&nbsp;name: <span className="text-orange-400">'MyToken'</span>,</div>
                <div>&nbsp;&nbsp;supply: <span className="text-purple-400">1000000</span></div>
                <div>{`}`});</div>
              </code>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Stats Section */}
      <SectionContainer background="gray" padding="small">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Features Section */}
      <SectionContainer>
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Semua yang Anda Butuhkan untuk Blockchain
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Platform lengkap dengan API, SDK, dashboard, dan tools yang memudahkan development aplikasi blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Lihat Semua Features <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </SectionContainer>

      {/* Use Cases Preview */}
      <SectionContainer background="gradient">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Solutions</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Solusi untuk Setiap Industri
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dari fintech hingga supply chain, VeloraChain mendukung berbagai use case blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Fintech</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Payment gateway, lending platform, dan DeFi applications dengan keamanan tinggi.
              </p>
              <Link to="/solutions#fintech" className="text-blue-600 hover:text-blue-700 font-medium">
                Pelajari lebih lanjut →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Supply Chain</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Tracking produk, verifikasi authenticity, dan transparency supply chain.
              </p>
              <Link to="/solutions#supply-chain" className="text-blue-600 hover:text-blue-700 font-medium">
                Pelajari lebih lanjut →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Gaming & NFT</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Game assets, NFT marketplace, dan play-to-earn game mechanics.
              </p>
              <Link to="/solutions#gaming" className="text-blue-600 hover:text-blue-700 font-medium">
                Pelajari lebih lanjut →
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link to="/solutions">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Lihat Semua Solutions <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </SectionContainer>

      {/* Testimonials */}
      <SectionContainer>
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dipercaya oleh Developer Terbaik
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ribuan developer dan perusahaan telah membangun aplikasi blockchain menggunakan VeloraChain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Partners */}
      <SectionContainer background="gray">
        <div className="text-center mb-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-8">
            Dipercaya oleh perusahaan terdepan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-gray-400 font-semibold text-lg">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer background="gradient">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Siap Membangun Aplikasi Blockchain?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Mulai gratis hari ini dan rasakan kemudahan membangun aplikasi blockchain dengan VeloraChain.
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