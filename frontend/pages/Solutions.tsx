import { Link } from 'react-router-dom';
import HeroSection from '../components/ui/HeroSection';
import SectionContainer from '../components/ui/SectionContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  ShoppingCart, 
  Truck, 
  Gamepad2, 
  GraduationCap,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Shield,
  BarChart3,
  Users,
  Zap,
  Globe,
  Building,
  FileText,
  CreditCard,
  Package
} from 'lucide-react';

export default function Solutions() {
  const solutions = [
    {
      id: 'fintech',
      icon: TrendingUp,
      title: 'Fintech & Payment',
      description: 'Solusi pembayaran digital, lending, dan DeFi untuk industri finansial',
      color: 'green',
      features: [
        'Digital payment gateway dengan crypto',
        'Peer-to-peer lending platform',
        'DeFi protocols dan yield farming',
        'Cross-border remittance',
        'Stablecoin integration',
        'KYC/AML compliance tools'
      ],
      useCases: [
        'E-wallet dengan dukungan crypto',
        'P2P lending dengan smart contracts',
        'Remittance menggunakan stablecoin',
        'Decentralized exchange (DEX)',
        'Yield farming platform'
      ],
      benefits: [
        'Transaksi 24/7 tanpa downtime',
        'Biaya transfer internasional rendah',
        'Transparansi penuh dengan blockchain',
        'Keamanan tingkat enterprise'
      ]
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: 'E-commerce & Retail',
      description: 'Integrasi blockchain untuk platform e-commerce dan retail modern',
      color: 'blue',
      features: [
        'Crypto payment gateway',
        'NFT marketplace integration',
        'Loyalty points tokenization',
        'Supply chain tracking',
        'Product authenticity verification',
        'Decentralized reviews system'
      ],
      useCases: [
        'Marketplace dengan pembayaran crypto',
        'NFT collectibles store',
        'Loyalty program berbasis token',
        'Product authenticity tracking',
        'Decentralized affiliate program'
      ],
      benefits: [
        'Akses ke global crypto market',
        'Reduced chargeback fraud',
        'Enhanced customer loyalty',
        'Transparent supply chain'
      ]
    },
    {
      id: 'supply-chain',
      icon: Truck,
      title: 'Supply Chain & Logistics',
      description: 'Transparency dan traceability untuk supply chain management',
      color: 'purple',
      features: [
        'End-to-end product tracking',
        'Supplier verification system',
        'Quality assurance automation',
        'Smart contracts untuk logistics',
        'Carbon footprint tracking',
        'Compliance reporting'
      ],
      useCases: [
        'Food traceability dari farm ke consumer',
        'Pharmaceutical supply chain tracking',
        'Luxury goods authenticity verification',
        'Sustainable sourcing tracking',
        'Automated quality control'
      ],
      benefits: [
        'Complete product visibility',
        'Reduced counterfeit products',
        'Automated compliance reporting',
        'Enhanced consumer trust'
      ]
    },
    {
      id: 'gaming',
      icon: Gamepad2,
      title: 'Gaming & NFT',
      description: 'Platform gaming dengan asset blockchain dan NFT integration',
      color: 'orange',
      features: [
        'In-game asset tokenization',
        'NFT marketplace untuk gaming',
        'Play-to-earn mechanics',
        'Cross-game asset portability',
        'Tournament prize distribution',
        'Community governance tokens'
      ],
      useCases: [
        'RPG game dengan tradeable items',
        'Trading card game dengan NFT',
        'Virtual real estate marketplace',
        'Esports tournament platform',
        'Gaming guild management'
      ],
      benefits: [
        'True ownership of digital assets',
        'New revenue streams untuk players',
        'Cross-game interoperability',
        'Transparent tournament systems'
      ]
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: 'Education & Government',
      description: 'Solusi untuk institusi pendidikan dan sektor pemerintahan',
      color: 'indigo',
      features: [
        'Digital credential verification',
        'Secure document storage',
        'Identity management system',
        'Transparent voting systems',
        'Grant distribution automation',
        'Research data integrity'
      ],
      useCases: [
        'Digital diploma dan sertifikat',
        'Student record management',
        'Research publication tracking',
        'Government transparency platform',
        'Public fund distribution'
      ],
      benefits: [
        'Tamper-proof credentials',
        'Reduced bureaucracy',
        'Enhanced transparency',
        'Global credential recognition'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  const successStories = [
    {
      company: 'FinanceIndo',
      industry: 'Fintech',
      description: 'Mengintegrasikan crypto payment dan berhasil meningkatkan transaksi 300%',
      metrics: ['300% increase in transactions', '50% reduction in processing fees', '24/7 global availability']
    },
    {
      company: 'RetailChain',
      industry: 'E-commerce',
      description: 'Implementasi NFT loyalty program yang meningkatkan customer retention 40%',
      metrics: ['40% increase in retention', '200% boost in engagement', '60% higher lifetime value']
    },
    {
      company: 'LogisticsPro',
      industry: 'Supply Chain',
      description: 'Supply chain tracking yang mengurangi counterfeit products hingga 95%',
      metrics: ['95% reduction in counterfeits', '30% faster delivery', '100% product traceability']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Solusi Blockchain untuk Setiap Industri"
        subtitle="Transformasi Digital dengan Teknologi Blockchain"
        description="Dari fintech hingga supply chain, VeloraChain menyediakan solusi blockchain yang disesuaikan dengan kebutuhan industri Anda."
        primaryCTA={{
          text: 'Konsultasi Gratis',
          href: '/contact'
        }}
        secondaryCTA={{
          text: 'Lihat Demo',
          href: '/dashboard'
        }}
      />

      {/* Solutions Grid */}
      <SectionContainer>
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Industry Solutions</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blockchain untuk Semua Industri
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Solusi yang telah terbukti meningkatkan efisiensi, transparansi, dan inovasi di berbagai sektor industri.
          </p>
        </div>

        <div className="space-y-20">
          {solutions.map((solution, index) => (
            <div key={solution.id} id={solution.id} className="scroll-mt-20">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 ${getColorClasses(solution.color)} rounded-2xl flex items-center justify-center mb-6`}>
                    <solution.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8">
                    {solution.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Pelajari Lebih Lanjut
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <Card className="hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">Use Cases</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {solution.useCases.map((useCase, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">
                            {useCase}
                          </h5>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {solution.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center">
                            <Zap className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Success Stories */}
      <SectionContainer background="gray">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Success Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transformasi Nyata dari Klien Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lihat bagaimana perusahaan di berbagai industri berhasil bertransformasi dengan VeloraChain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-xl">{story.company}</CardTitle>
                  <Badge variant="secondary">{story.industry}</Badge>
                </div>
                <p className="text-gray-600">{story.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center">
                      <BarChart3 className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">{metric}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Industry Stats */}
      <SectionContainer>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Impact Across Industries
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Data menunjukkan transformasi positif yang dicapai klien kami.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Companies Transformed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">$50M+</div>
            <div className="text-gray-600">Cost Savings Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Availability</div>
          </div>
        </div>
      </SectionContainer>

      {/* Implementation Process */}
      <SectionContainer background="gradient">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Implementation</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proses Implementasi yang Terbukti
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Metodologi yang telah teruji untuk memastikan implementasi yang sukses dan ROI yang maksimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Discovery</h3>
            <p className="text-gray-600">Analisis kebutuhan dan assessment current system</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Design</h3>
            <p className="text-gray-600">Custom solution design dan architecture planning</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Deploy</h3>
            <p className="text-gray-600">Implementation dan integration dengan sistem existing</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              4
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimize</h3>
            <p className="text-gray-600">Monitoring, optimization, dan continuous improvement</p>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Siap Mentransformasi Industri Anda?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Konsultasi gratis dengan expert kami untuk mengetahui bagaimana blockchain dapat mengoptimalkan bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                Konsultasi Gratis
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                Lihat Pricing
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}