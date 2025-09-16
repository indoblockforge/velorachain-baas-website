import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SUPPORTED_CHAINS, type SupportedChain } from '../lib/chains';

interface WalletConnectProps {
  className?: string;
  showBalance?: boolean;
  showChainSelector?: boolean;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ 
  className = '',
  showBalance = true,
  showChainSelector = true 
}) => {
  const {
    account,
    chainId,
    isConnected,
    isConnecting,
    balance,
    error,
    connectWallet,
    disconnectWallet,
    switchChain,
    refreshBalance
  } = useWallet();

  const currentChain = Object.values(SUPPORTED_CHAINS).find(chain => chain.id === chainId);

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    return num.toFixed(4);
  };

  if (!isConnected) {
    return (
      <div className={className}>
        <Button 
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isConnecting ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </>
          )}
        </Button>
        
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Wallet Connected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Account Info */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-mono text-sm">{formatAddress(account!)}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.open(`${currentChain?.explorerUrl}/address/${account}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chain Info */}
          {showChainSelector && currentChain && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Network</p>
                <div className="flex items-center space-x-2">
                  <Badge variant={currentChain.testnet ? 'secondary' : 'default'}>
                    {currentChain.name}
                  </Badge>
                  {currentChain.testnet && (
                    <Badge variant="outline" className="text-xs">
                      Testnet
                    </Badge>
                  )}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {Object.entries(SUPPORTED_CHAINS).map(([key, chain]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() => switchChain(chain.id)}
                      disabled={chain.id === chainId}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{chain.name}</span>
                        {chain.testnet && (
                          <Badge variant="outline" className="text-xs">
                            Testnet
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Balance */}
          {showBalance && balance && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Balance</p>
                <p className="font-semibold">
                  {formatBalance(balance)} {currentChain?.symbol}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={refreshBalance}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          {/* Disconnect Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={disconnectWallet}
            className="w-full"
          >
            Disconnect
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletConnect;