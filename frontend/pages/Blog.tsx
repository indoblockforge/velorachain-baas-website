import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SectionContainer from '../components/ui/SectionContainer';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  TrendingUp,
  BookOpen,
  Lightbulb,
  Code,
  Shield,
  Globe
} from 'lucide-react';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Tutorials', 'Industry', 'Updates', 'Security'];

  const featuredPost = {
    id: 'featured-post',
    title: 'The Future of Blockchain: Trends to Watch in 2024',
    excerpt: 'Explore the emerging trends and technologies that will shape the blockchain landscape in 2024, from interoperability to sustainability.',
    author: 'Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Technology',
    image: '/api/placeholder/800/400',
    featured: true
  };

  const blogPosts = [
    {
      id: 'getting-started-defi',
      title: 'Getting Started with DeFi Development',
      excerpt: 'A comprehensive guide to building your first decentralized finance application using VeloraChain.',
      author: 'Ahmad Pratama',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'Tutorials',
      image: '/api/placeholder/400/250'
    },
    {
      id: 'smart-contract-security',
      title: 'Smart Contract Security Best Practices',
      excerpt: 'Learn how to write secure smart contracts and avoid common vulnerabilities that could compromise your application.',
      author: 'Maria Santos',
      date: '2024-01-10',
      readTime: '10 min read',
      category: 'Security',
      image: '/api/placeholder/400/250'
    },
    {
      id: 'nft-marketplace-guide',
      title: 'Building an NFT Marketplace from Scratch',
      excerpt: 'Step-by-step tutorial on creating a fully functional NFT marketplace with minting, trading, and royalty features.',
      author: 'David Kim',
      date: '2024-01-08',
      readTime: '12 min read',
      category: 'Tutorials',
      image: '/api/placeholder/400/250'
    },
    {
      id: 'blockchain-scalability',
      title: 'Solving Blockchain Scalability: Layer 2 Solutions',
      excerpt: 'Understanding the different approaches to blockchain scalability and how Layer 2 solutions are addressing current limitations.',
      author: 'Alex Rodriguez',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'Technology',
      image: '/api/placeholder/400/250'
    },
    {
      id: 'web3-gaming-future',
      title: 'The Future of Gaming in Web3',
      excerpt: 'How blockchain technology is revolutionizing the gaming industry with true ownership and play-to-earn mechanics.',
      author: 'Lisa Zhang',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'Industry',
      image: '/api/placeholder/400/250'
    },
    {
      id: 'velorachain-v2-release',
      title: 'VeloraChain v2.0: What\'s New',
      excerpt: 'Announcing the release of VeloraChain v2.0 with enhanced performance, new features, and improved developer experience.',
      author: 'VeloraChain Team',
      date: '2024-01-01',
      readTime: '5 min read',
      category: 'Updates',
      image: '/api/placeholder/400/250'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Technology': TrendingUp,
      'Tutorials': BookOpen,
      'Industry': Globe,
      'Updates': Lightbulb,
      'Security': Shield,
      'All': Code
    };
    return icons[category as keyof typeof icons] || Code;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Tutorials': 'bg-green-100 text-green-800',
      'Industry': 'bg-purple-100 text-purple-800',
      'Updates': 'bg-orange-100 text-orange-800',
      'Security': 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SectionContainer background="white" padding="normal">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">Blog & Resources</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            VeloraChain Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Insights, tutorials, and updates from the world of blockchain development
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </SectionContainer>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category);
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center space-x-2"
              >
                <Icon className="w-4 h-4" />
                <span>{category}</span>
              </Button>
            );
          })}
        </div>

        {/* Featured Post */}
        {selectedCategory === 'All' && !searchQuery && (
          <Card className="mb-12 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                  <Badge className={getCategoryColor(featuredPost.category)} variant="secondary">
                    Featured Article
                  </Badge>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className={getCategoryColor(featuredPost.category)} variant="secondary">
                    {featuredPost.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {featuredPost.author}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                  <Link to={`/blog/${featuredPost.id}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    {React.createElement(getCategoryIcon(post.category), { 
                      className: "w-8 h-8 text-white" 
                    })}
                  </div>
                  <Badge className={getCategoryColor(post.category)} variant="secondary">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-xl leading-tight hover:text-blue-600 transition-colors">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="outline" size="sm">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest blockchain insights, tutorials, and VeloraChain updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900"
              />
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}