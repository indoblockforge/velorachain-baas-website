import { Link } from 'react-router-dom';
import HeroSection from '../components/ui/HeroSection';
import SectionContainer from '../components/ui/SectionContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Lightbulb,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Building,
  Globe,
  Zap
} from 'lucide-react';

export default function Company() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      bio: 'Former blockchain architect at major fintech. 10+ years experience in distributed systems.',
      location: 'Jakarta, ID'
    },
    {
      name: 'Ahmad Pratama',
      role: 'CTO & Co-founder',
      bio: 'Ex-Google engineer with expertise in smart contracts and DeFi protocols.',
      location: 'Jakarta, ID'
    },
    {
      name: 'Maria Santos',
      role: 'Head of Product',
      bio: 'Product leader with background in developer tools and API platforms.',
      location: 'Singapore, SG'
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      bio: 'Full-stack engineer specializing in blockchain infrastructure and security.',
      location: 'Jakarta, ID'
    },
    {
      name: 'Lisa Zhang',
      role: 'Head of Business Development',
      bio: 'Growth expert focused on enterprise partnerships and market expansion.',
      location: 'Jakarta, ID'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Head of Security',
      bio: 'Cybersecurity specialist with focus on blockchain and smart contract auditing.',
      location: 'Remote'
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We push the boundaries of what\'s possible with blockchain technology'
    },
    {
      icon: Users,
      title: 'Developer-First',
      description: 'Everything we build is designed with developers in mind'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'We believe in building together with our community'
    },
    {
      icon: CheckCircle,
      title: 'Reliability',
      description: 'Our platform provides enterprise-grade stability and uptime'
    }
  ];

  const milestones = [
    {
      year: '2022',
      quarter: 'Q1',
      title: 'Company Founded',
      description: 'VeloraChain founded with vision to democratize blockchain development'
    },
    {
      year: '2022',
      quarter: 'Q3',
      title: 'Seed Funding',
      description: 'Raised $2M seed round led by prominent VCs'
    },
    {
      year: '2023',
      quarter: 'Q1',
      title: 'Platform Launch',
      description: 'Launched MVP with basic API and dashboard features'
    },
    {
      year: '2023',
      quarter: 'Q2',
      title: 'Multi-chain Support',
      description: 'Added support for Ethereum, Polygon, and BSC'
    },
    {
      year: '2023',
      quarter: 'Q4',
      title: '1000+ Developers',
      description: 'Reached milestone of 1000+ active developers'
    },
    {
      year: '2024',
      quarter: 'Q1',
      title: 'Series A',
      description: 'Raised $10M Series A to expand globally'
    }
  ];

  const roadmap = [
    {
      quarter: 'Q1 2024',
      title: 'Advanced Analytics',
      description: 'Real-time analytics dashboard with custom metrics and alerting',
      status: 'completed'
    },
    {
      quarter: 'Q2 2024',
      title: 'Mobile SDKs',
      description: 'Native iOS and Android SDKs for mobile dApp development',
      status: 'in-progress'
    },
    {
      quarter: 'Q3 2024',
      title: 'Layer 2 Integration',
      description: 'Support for Arbitrum, Optimism, and other L2 solutions',
      status: 'planned'
    },
    {
      quarter: 'Q4 2024',
      title: 'Enterprise Features',
      description: 'Advanced security, compliance tools, and dedicated support',
      status: 'planned'
    },
    {
      quarter: 'Q1 2025',
      title: 'Global Expansion',
      description: 'Expand to Europe and North America markets',
      status: 'planned'
    },
    {
      quarter: 'Q2 2025',
      title: 'AI Integration',
      description: 'AI-powered smart contract analysis and optimization',
      status: 'planned'
    }
  ];

  const partners = [
    { name: 'TechStars', type: 'Accelerator' },
    { name: 'Blockchain Capital', type: 'Investor' },
    { name: 'Coinbase Ventures', type: 'Investor' },
    { name: 'Polygon', type: 'Technology Partner' },
    { name: 'Chainlink', type: 'Technology Partner' },
    { name: 'Alchemy', type: 'Infrastructure Partner' }
  ];

  const openPositions = [
    {
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      location: 'Jakarta / Remote',
      type: 'Full-time'
    },
    {
      title: 'Blockchain Security Engineer',
      department: 'Security',
      location: 'Jakarta / Remote',
      type: 'Full-time'
    },
    {
      title: 'Developer Relations Manager',
      department: 'DevRel',
      location: 'Singapore / Remote',
      type: 'Full-time'
    },
    {
      title: 'Enterprise Sales Manager',
      department: 'Sales',
      location: 'Jakarta',
      type: 'Full-time'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Membangun Masa Depan Blockchain"
        subtitle="Tentang VeloraChain"
        description="Kami adalah tim passionate yang berdedikasi untuk membuat teknologi blockchain accessible untuk semua developer dan bisnis di Indonesia dan dunia."
        primaryCTA={{
          text: 'Bergabung dengan Tim',
          href: '#careers'
        }}
        secondaryCTA={{
          text: 'Hubungi Kami',
          href: '/contact'
        }}
      />

      {/* Mission & Vision */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Misi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Memberdayakan developer dan bisnis untuk membangun aplikasi blockchain dengan mudah, 
                cepat, dan aman. Kami menyediakan tools dan infrastructure yang reliable untuk 
                mengakselerasi adopsi teknologi blockchain di Indonesia dan Asia Tenggara.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Visi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Menjadi platform blockchain-as-a-service terdepan di Asia Tenggara yang memungkinkan 
                setiap developer dan perusahaan untuk mengintegrasikan teknologi blockchain dalam 
                produk mereka dengan mudah dan efisien.
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>

      {/* Company Values */}
      <SectionContainer background="gray">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Our Values</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nilai-nilai yang Kami Junjung
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nilai-nilai ini memandu setiap keputusan yang kami buat dan cara kami berinteraksi dengan komunitas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Team */}
      <SectionContainer>
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Our Team</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tim di Balik VeloraChain
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kenali para ahli yang membangun platform blockchain terdepan untuk developer Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{member.bio}</p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {member.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Company History */}
      <SectionContainer background="gray">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Our Journey</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perjalanan VeloraChain
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dari startup kecil hingga menjadi platform blockchain terpercaya di Asia Tenggara.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="secondary">{milestone.quarter} {milestone.year}</Badge>
                    <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                  </div>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
                {index < milestones.length - 1 && (
                  <div className="absolute left-6 mt-12 w-0.5 h-16 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Roadmap */}
      <SectionContainer id="roadmap">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Roadmap</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apa yang Akan Datang
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Rencana pengembangan platform kami untuk tahun-tahun mendatang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmap.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{item.quarter}</Badge>
                  <Badge className={getStatusColor(item.status)} variant="secondary">
                    {item.status === 'completed' ? 'Completed' : 
                     item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionContainer>

      {/* Partners */}
      <SectionContainer background="gray" id="partners">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Partners</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Partner dan Investor Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dipercaya dan didukung oleh investor dan partner terkemuka di industri blockchain.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto mb-3">
                <Building className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{partner.name}</h4>
              <p className="text-xs text-gray-500">{partner.type}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Careers */}
      <SectionContainer id="careers">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Careers</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bergabung dengan Tim Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bangun masa depan blockchain bersama tim yang passionate dan berpengalaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {openPositions.map((position, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{position.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <Badge variant="outline">Open</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Tidak menemukan posisi yang sesuai? Kami selalu terbuka untuk talenta luar biasa.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Send Us Your CV
            </Button>
          </Link>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer background="gradient">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Siap Membangun Bersama Kami?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan developer yang telah mempercayai VeloraChain untuk membangun aplikasi blockchain mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                Mulai Sekarang
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                Hubungi Tim Kami
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}