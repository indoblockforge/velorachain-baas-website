import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/ui/HeroSection';
import SectionContainer from '../components/ui/SectionContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  CheckCircle, 
  X, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Headphones,
  Star,
  Clock
} from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect untuk developer dan startup yang baru memulai',
      features: [
        '10,000 API calls/bulan',
        '1 project',
        'Basic dashboard',
        'Community support',
        'Ethereum & Polygon support',
        'Basic analytics',
        'Standard SLA'
      ],
      limitations: [
        'No premium features',
        'Limited integrations'
      ],
      cta: 'Mulai Gratis',
      popular: false,
      href: '/dashboard'
    },
    {
      name: 'Pro',
      price: { monthly: 99, annual: 89 },
      description: 'Untuk bisnis yang scaling dan butuh features advanced',
      features: [
        '1,000,000 API calls/bulan',
        '10 projects',
        'Advanced dashboard',
        'Priority support',
        'All blockchain networks',
        'Advanced analytics',
        'Webhook notifications',
        'Custom integrations',
        'Team collaboration',
        '99.9% SLA'
      ],
      limitations: [],
      cta: 'Upgrade ke Pro',
      popular: true,
      href: '/contact'
    },
    {
      name: 'Enterprise',
      price: { monthly: 'Custom', annual: 'Custom' },
      description: 'Solusi enterprise dengan dukungan penuh dan customization',
      features: [
        'Unlimited API calls',
        'Unlimited projects',
        'Custom dashboard',
        '24/7 dedicated support',
        'All blockchain networks',
        'Custom analytics',
        'Priority webhooks',
        'Custom integrations',
        'Advanced team management',
        'Custom SLA',
        'On-premise deployment',
        'Security audit',
        'Compliance support'
      ],
      limitations: [],
      cta: 'Hubungi Sales',
      popular: false,
      href: '/contact'
    }
  ];

  const faqs = [
    {
      question: 'Apakah ada biaya setup atau hidden fees?',
      answer: 'Tidak ada biaya setup atau hidden fees. Anda hanya membayar untuk plan yang dipilih.'
    },
    {
      question: 'Bisakah saya upgrade atau downgrade kapan saja?',
      answer: 'Ya, Anda bisa upgrade atau downgrade plan kapan saja. Perubahan akan berlaku pada billing cycle berikutnya.'
    },
    {
      question: 'Apa yang terjadi jika saya exceed API limit?',
      answer: 'Kami akan mengirim notifikasi saat mendekati limit. Untuk overage, kami charge $0.001 per additional API call.'
    },
    {
      question: 'Apakah tersedia refund policy?',
      answer: 'Ya, kami menyediakan 30-hari money-back guarantee untuk semua paid plans.'
    },
    {
      question: 'Bagaimana cara migrasi dari provider lain?',
      answer: 'Tim kami akan membantu proses migrasi gratis, termasuk data migration dan API integration.'
    }
  ];

  const payAsYouGo = [
    { metric: 'API Calls', price: '$0.001', unit: 'per call' },
    { metric: 'Webhook Deliveries', price: '$0.0005', unit: 'per delivery' },
    { metric: 'Data Storage', price: '$0.10', unit: 'per GB/month' },
    { metric: 'Premium Support', price: '$200', unit: 'per hour' }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (typeof plan.price.monthly === 'string') return plan.price.monthly;
    return isAnnual ? plan.price.annual : plan.price.monthly;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Pricing yang Transparan"
        subtitle="Pilih plan yang sesuai dengan kebutuhan bisnis Anda"
        description="Mulai gratis dan scale sesuai pertumbuhan. Tidak ada hidden fees atau kontrak jangka panjang."
        backgroundGradient={true}
      />

      {/* Pricing Toggle */}
      <SectionContainer padding="small">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Annual
          </span>
          {isAnnual && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Save 10%
            </Badge>
          )}
        </div>
      </SectionContainer>

      {/* Pricing Plans */}
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {typeof getPrice(plan) === 'string' ? '' : '$'}{getPrice(plan)}
                  </span>
                  {typeof getPrice(plan) !== 'string' && (
                    <span className="text-gray-500">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-center">
                      <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{limitation}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <Link to={plan.href} className="block">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Pay-as-you-go */}
      <SectionContainer background="gray">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Pay-as-you-go</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Atau Bayar Sesuai Penggunaan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Untuk use case khusus atau volume yang tidak predictable, gunakan pay-as-you-go pricing.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {payAsYouGo.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.metric}</h4>
                      <p className="text-sm text-gray-600">{item.unit}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{item.price}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Features Comparison */}
      <SectionContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mengapa VeloraChain?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bandingkan features kami dengan kompetitor dan lihat value yang Anda dapatkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Setup</h3>
            <p className="text-gray-600">Deploy dalam 5 menit vs 2-3 hari kompetitor</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Security</h3>
            <p className="text-gray-600">SOC 2 certified dan 99.9% uptime SLA</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Support</h3>
            <p className="text-gray-600">Tim support Indonesia yang responsive</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Lock-in</h3>
            <p className="text-gray-600">Cancel kapan saja tanpa penalty fees</p>
          </div>
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer background="gray">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pertanyaan yang sering ditanyakan tentang pricing dan billing.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Masih ada pertanyaan?</p>
          <Link to="/contact">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Headphones className="w-4 h-4 mr-2" />
              Hubungi Support
            </Button>
          </Link>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Siap Memulai Journey Blockchain Anda?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan developer yang telah memilih VeloraChain untuk membangun masa depan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                Mulai Gratis Hari Ini
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                Bicara dengan Sales
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}