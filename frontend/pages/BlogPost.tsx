import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SectionContainer from '../components/ui/SectionContainer';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  BookOpen,
  ChevronRight
} from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();

  // Mock blog post data - in real app, fetch based on slug
  const post = {
    id: slug,
    title: 'Getting Started with DeFi Development',
    content: `
# Getting Started with DeFi Development

Decentralized Finance (DeFi) has revolutionized the financial landscape, offering unprecedented opportunities for developers to build innovative financial applications. In this comprehensive guide, we'll explore how to get started with DeFi development using VeloraChain.

## What is DeFi?

DeFi refers to financial services built on blockchain technology that operate without traditional intermediaries like banks or financial institutions. These applications leverage smart contracts to automate financial processes, providing users with direct control over their assets.

## Prerequisites

Before diving into DeFi development, ensure you have:

- Basic understanding of blockchain technology
- Familiarity with smart contract development
- Knowledge of JavaScript/TypeScript
- VeloraChain account and API key

## Setting Up Your Development Environment

\`\`\`javascript
// Install VeloraChain SDK
npm install @velorachain/sdk

// Initialize the client
import { VeloraChain } from '@velorachain/sdk';

const client = new VeloraChain({
  apiKey: 'your_api_key_here',
  network: 'ethereum'
});
\`\`\`

## Building Your First DeFi Protocol

Let's create a simple lending protocol that allows users to deposit tokens and earn interest.

### Step 1: Token Contract

First, we'll deploy an ERC20 token that will serve as collateral:

\`\`\`javascript
const token = await client.contracts.deploy({
  type: 'ERC20',
  name: 'Lending Token',
  symbol: 'LEND',
  supply: 1000000,
  decimals: 18
});

console.log('Token deployed at:', token.address);
\`\`\`

### Step 2: Lending Pool Contract

Next, we'll create a lending pool where users can deposit tokens:

\`\`\`javascript
const lendingPool = await client.contracts.deploy({
  type: 'custom',
  name: 'LendingPool',
  constructor: [token.address, 500] // 5% annual interest rate
});
\`\`\`

### Step 3: User Interaction

Now users can interact with our DeFi protocol:

\`\`\`javascript
// Deposit tokens to earn interest
const depositTx = await lendingPool.deposit({
  amount: '1000',
  from: userAddress
});

// Withdraw tokens plus interest
const withdrawTx = await lendingPool.withdraw({
  amount: '1050', // original + interest
  from: userAddress
});
\`\`\`

## Advanced DeFi Concepts

### Liquidity Pools

Liquidity pools are smart contracts that hold tokens to facilitate trading. Users provide liquidity by depositing tokens and earn fees from trades.

### Yield Farming

Yield farming involves staking or lending crypto assets to generate returns. It's a way to earn passive income from your crypto holdings.

### Flash Loans

Flash loans allow users to borrow assets without collateral, as long as the loan is repaid within the same transaction.

## Security Considerations

When building DeFi applications, security is paramount:

1. **Smart Contract Audits**: Always audit your contracts before mainnet deployment
2. **Access Controls**: Implement proper access controls and multi-signature wallets
3. **Reentrancy Protection**: Use reentrancy guards to prevent attacks
4. **Oracle Security**: Use reliable price oracles and implement circuit breakers

## Testing Your DeFi Application

\`\`\`javascript
// Use VeloraChain's testnet for safe testing
const testClient = new VeloraChain({
  apiKey: 'test_api_key',
  network: 'ethereum-goerli'
});

// Run comprehensive tests
await testLendingPool();
await testTokenInteractions();
await testEdgeCases();
\`\`\`

## Deployment and Monitoring

Once your DeFi application is tested, deploy it to mainnet and set up monitoring:

\`\`\`javascript
// Deploy to mainnet
const mainnetClient = new VeloraChain({
  apiKey: 'live_api_key',
  network: 'ethereum'
});

// Set up monitoring
client.analytics.subscribe('contract_events', {
  contract: lendingPool.address,
  callback: handleContractEvent
});
\`\`\`

## Conclusion

Building DeFi applications with VeloraChain provides a robust foundation for creating innovative financial products. Start with simple protocols and gradually add complexity as you gain experience.

Remember to prioritize security, test thoroughly, and engage with the DeFi community for feedback and support.

## Next Steps

- Explore our [Advanced DeFi Patterns](/docs/advanced-defi) guide
- Join our [Developer Community](https://discord.gg/velorachain)
- Check out our [DeFi Templates](https://github.com/velorachain/defi-templates)

Happy building!
    `,
    author: 'Ahmad Pratama',
    date: '2024-01-12',
    readTime: '6 min read',
    category: 'Tutorials',
    tags: ['DeFi', 'Smart Contracts', 'Tutorial', 'VeloraChain'],
    excerpt: 'A comprehensive guide to building your first decentralized finance application using VeloraChain.'
  };

  const relatedPosts = [
    {
      id: 'smart-contract-security',
      title: 'Smart Contract Security Best Practices',
      category: 'Security',
      readTime: '10 min read'
    },
    {
      id: 'nft-marketplace-guide', 
      title: 'Building an NFT Marketplace from Scratch',
      category: 'Tutorials',
      readTime: '12 min read'
    },
    {
      id: 'blockchain-scalability',
      title: 'Solving Blockchain Scalability: Layer 2 Solutions',
      category: 'Technology', 
      readTime: '7 min read'
    }
  ];

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

  const sharePost = () => {
    navigator.share({
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    }).catch(() => {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <SectionContainer padding="small">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={sharePost}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className={getCategoryColor(post.category)} variant="secondary">
              {post.category}
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {post.date}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Article Content */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Hero Image Placeholder */}
            <div className="w-full h-64 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-8">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Article illustration would appear here</p>
              </div>
            </div>

            {/* Content - in a real app, this would be rendered from markdown */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                } else if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('```')) {
                  const codeContent = paragraph.replace(/```\w*\n?/g, '');
                  return (
                    <pre key={index} className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                      <code>{codeContent}</code>
                    </pre>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Author Bio */}
      <SectionContainer background="gray">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{post.author}</h4>
                  <p className="text-gray-600 mb-2">Senior Blockchain Developer at VeloraChain</p>
                  <p className="text-sm text-gray-500">
                    Ahmad is a blockchain expert with 5+ years of experience in DeFi development. 
                    He specializes in smart contract security and protocol design.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>

      {/* Related Posts */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge className={getCategoryColor(relatedPost.category)} variant="secondary">
                    {relatedPost.category}
                  </Badge>
                  <h4 className="font-semibold text-gray-900 mt-3 mb-2 leading-tight">
                    <Link to={`/blog/${relatedPost.id}`} className="hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </Link>
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{relatedPost.readTime}</span>
                    <Link to={`/blog/${relatedPost.id}`}>
                      <ChevronRight className="w-4 h-4 text-gray-400 hover:text-blue-600 transition-colors" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer background="gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Building?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Get started with VeloraChain today and build the future of decentralized finance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}