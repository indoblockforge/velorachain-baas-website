import { useState } from 'react';
import HeroSection from '../components/ui/HeroSection';
import SectionContainer from '../components/ui/SectionContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  Headphones,
  Globe
} from 'lucide-react';
import backend from '~backend/client';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await backend.contact.submitContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        company: formData.company || undefined,
        phone: formData.phone || undefined
      });

      if (response.success) {
        toast({
          title: "Message sent!",
          description: response.message,
        });
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      info: 'hello@velorachain.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      info: '+62 21 1234 5678',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Office',
      info: 'Jakarta, Indonesia',
      description: 'Come say hello at our HQ'
    }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: '24/7',
      action: 'Start Chat'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      availability: 'Response within 4 hours',
      action: 'Send Email'
    },
    {
      icon: Calendar,
      title: 'Schedule Call',
      description: 'Book a demo or consultation',
      availability: 'Available slots',
      action: 'Book Now'
    }
  ];

  const faqs = [
    {
      question: 'Bagaimana cara memulai dengan VeloraChain?',
      answer: 'Anda bisa memulai dengan mendaftar akun gratis di platform kami. Setelah itu, Anda akan mendapatkan akses ke dashboard dan API documentation untuk mulai building.'
    },
    {
      question: 'Apakah ada trial period untuk Enterprise plan?',
      answer: 'Ya, kami menyediakan 30-hari trial untuk Enterprise plan. Hubungi sales team kami untuk mengatur trial dan demo khusus untuk kebutuhan perusahaan Anda.'
    },
    {
      question: 'Blockchain mana saja yang didukung?',
      answer: 'Saat ini kami mendukung Ethereum, Polygon, Binance Smart Chain, dan Solana. Kami terus menambahkan support untuk blockchain lain berdasarkan kebutuhan komunitas.'
    },
    {
      question: 'Bagaimana dengan keamanan data?',
      answer: 'VeloraChain menggunakan enkripsi end-to-end, certified SOC 2 Type II, dan mengikuti best practices keamanan industri. Data Anda aman dengan kami.'
    },
    {
      question: 'Apakah tersedia support dalam bahasa Indonesia?',
      answer: 'Ya, tim support kami bisa berkomunikasi dalam bahasa Indonesia dan tersedia untuk membantu Anda 24/7.'
    },
    {
      question: 'Bisakah VeloraChain diintegrasikan dengan sistem existing?',
      answer: 'Tentu saja! VeloraChain dirancang untuk mudah diintegrasikan dengan berbagai sistem existing melalui REST API dan webhooks.'
    }
  ];

  const communityLinks = [
    { name: 'Discord Community', href: 'https://discord.gg/velorachain', description: 'Join our developer community' },
    { name: 'Telegram Channel', href: 'https://t.me/velorachain', description: 'Get updates and announcements' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/velorachain', description: 'Professional updates and insights' },
    { name: 'GitHub', href: 'https://github.com/velorachain', description: 'Open source projects and SDKs' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Hubungi Kami"
        subtitle="Tim expert kami siap membantu Anda"
        description="Punya pertanyaan tentang produk, pricing, atau implementasi? Tim kami siap membantu Anda 24/7."
        backgroundGradient={true}
      />

      {/* Contact Info */}
      <SectionContainer padding="small">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-lg text-gray-900 font-medium mb-1">{info.info}</p>
              <p className="text-gray-600">{info.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Contact Form & Support */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <Badge variant="outline" className="mb-4">Get in Touch</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Kirim Pesan ke Tim Kami
              </h2>
              <p className="text-lg text-gray-600">
                Isi form di bawah dan kami akan menghubungi Anda dalam 24 jam.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Perusahaan
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="PT. Technology Indonesia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No. Telepon
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+62 812 3456 7890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Ceritakan tentang project Anda dan bagaimana kami bisa membantu..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </form>
          </div>

          {/* Support Channels */}
          <div>
            <div className="mb-8">
              <Badge variant="outline" className="mb-4">Support Channels</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Butuh Bantuan Segera?
              </h2>
              <p className="text-lg text-gray-600">
                Pilih channel support yang paling sesuai dengan kebutuhan Anda.
              </p>
            </div>

            <div className="space-y-6">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <channel.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {channel.title}
                          </h3>
                          <p className="text-gray-600 mb-2">{channel.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {channel.availability}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {channel.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer background="gray" id="faq">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang VeloraChain.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">{faq.question}</h4>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                {expandedFaq === index && (
                  <p className="text-gray-600 mt-4">{faq.answer}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Community */}
      <SectionContainer id="community">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Community</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bergabung dengan Komunitas
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect dengan developer lain, dapatkan tips, dan stay updated dengan perkembangan terbaru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{link.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{link.description}</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    Join Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Office Info */}
      <SectionContainer background="gradient">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kunjungi Kantor Kami
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Tim kami berlokasi di Jakarta dan siap bertemu untuk diskusi lebih lanjut tentang project Anda.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="w-8 h-8 text-blue-600 mr-3" />
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900">VeloraChain HQ</h3>
                <p className="text-gray-600">Jakarta Selatan, Indonesia</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Office Hours</p>
                  <p className="text-gray-600">Mon-Fri: 9AM - 6PM</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Team Size</p>
                  <p className="text-gray-600">50+ Experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}