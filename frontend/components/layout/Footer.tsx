import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const productLinks = [
    { name: 'API & SDK', href: '/products#api' },
    { name: 'Dashboard', href: '/products#dashboard' },
    { name: 'Multi-chain', href: '/products#multichain' },
    { name: 'Wallet Integration', href: '/products#wallet' },
    { name: 'Security', href: '/products#security' }
  ];

  const solutionLinks = [
    { name: 'Fintech', href: '/solutions#fintech' },
    { name: 'E-commerce', href: '/solutions#ecommerce' },
    { name: 'Supply Chain', href: '/solutions#supply-chain' },
    { name: 'Gaming & NFT', href: '/solutions#gaming' },
    { name: 'Education', href: '/solutions#education' }
  ];

  const resourceLinks = [
    { name: 'Documentation', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'API Reference', href: '/docs/api' },
    { name: 'Tutorials', href: '/docs/tutorials' },
    { name: 'Community', href: '/contact#community' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '/company' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/company#careers' },
    { name: 'Roadmap', href: '/company#roadmap' },
    { name: 'Partners', href: '/company#partners' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/velorachain' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/velorachain' },
    { name: 'Github', icon: Github, href: 'https://github.com/velorachain' },
    { name: 'Discord', icon: MessageCircle, href: 'https://discord.gg/velorachain' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@velorachain.com' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold">VeloraChain</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Platform Blockchain-as-a-Service yang memungkinkan developer dan bisnis membangun aplikasi blockchain dengan mudah dan cepat.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-2">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 VeloraChain. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}