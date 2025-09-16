import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { web3Service } from '../lib/web3';
import { SUPPORTED_CHAINS, type SupportedChain } from '../lib/chains';
import { ethers } from 'ethers';

interface WalletContextType {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: string | null;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchChain: (chainId: number) => Promise<void>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
    setupEventListeners();
  }, []);

  useEffect(() => {
    if (account) {
      refreshBalance();
    }
  }, [account, chainId]);

  const checkConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setChainId(parseInt(chainId, 16));
        }
      }
    } catch (err) {
      console.error('Failed to check wallet connection:', err);
    }
  };

  const setupEventListeners = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      setIsConnected(true);
    }
  };

  const handleChainChanged = (chainId: string) => {
    setChainId(parseInt(chainId, 16));
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainId, 16));

        // Initialize Web3 service with connected wallet
        await web3Service.connectWallet();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection failed:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setIsConnected(false);
    setBalance(null);
    setError(null);
  };

  const switchChain = async (targetChainId: number) => {
    try {
      setError(null);
      await web3Service.switchChain(targetChainId);
      setChainId(targetChainId);
    } catch (err: any) {
      setError(err.message || 'Failed to switch network');
      console.error('Chain switch failed:', err);
    }
  };

  const refreshBalance = async () => {
    if (!account || !chainId) return;

    try {
      // Initialize web3 service with current chain
      const chainKey = Object.keys(SUPPORTED_CHAINS).find(
        key => SUPPORTED_CHAINS[key as SupportedChain].id === chainId
      ) as SupportedChain;

      if (chainKey) {
        await web3Service.initialize({ chain: chainKey });
        const balance = await web3Service.getBalance(account);
        setBalance(balance);
      }
    } catch (err) {
      console.error('Failed to refresh balance:', err);
    }
  };

  const value: WalletContextType = {
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
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};