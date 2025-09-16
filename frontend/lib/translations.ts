export type Language = 'en' | 'id';

export const translations = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      refresh: 'Refresh'
    },
    navigation: {
      home: 'Home',
      products: 'Products',
      pricing: 'Pricing',
      solutions: 'Solutions',
      docs: 'Documentation',
      blog: 'Blog',
      company: 'Company',
      contact: 'Contact',
      dashboard: 'Dashboard',
      login: 'Login',
      logout: 'Logout'
    },
    hero: {
      title: 'Build Blockchain Apps Without Hassle',
      subtitle: 'API & SDK for All Businesses',
      description: 'Blockchain-as-a-Service platform that enables developers and businesses to build blockchain applications easily and quickly.',
      startFree: 'Start Free',
      scheduleDemo: 'Schedule Demo'
    },
    wallet: {
      connect: 'Connect Wallet',
      connecting: 'Connecting...',
      connected: 'Wallet Connected',
      disconnect: 'Disconnect',
      address: 'Address',
      balance: 'Balance',
      network: 'Network',
      switchNetwork: 'Switch Network',
      copyAddress: 'Copy Address',
      viewOnExplorer: 'View on Explorer'
    },
    gas: {
      calculator: 'Gas Fee Calculator',
      estimate: 'Gas Estimate',
      limit: 'Gas Limit',
      price: 'Gas Price',
      slow: 'Slow',
      standard: 'Standard',
      fast: 'Fast',
      totalCost: 'Total Cost',
      refresh: 'Refresh Estimates',
      calculating: 'Calculating...'
    },
    contracts: {
      templates: 'Smart Contract Templates',
      deploy: 'Deploy Contract',
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      token: 'Token',
      nft: 'NFT',
      defi: 'DeFi',
      dao: 'DAO',
      game: 'Gaming',
      utility: 'Utility'
    },
    pricing: {
      starter: 'Starter',
      pro: 'Pro',
      enterprise: 'Enterprise',
      monthly: 'Monthly',
      annual: 'Annual',
      save: 'Save 10%',
      mostPopular: 'Most Popular',
      upgradeToPro: 'Upgrade to Pro',
      contactSales: 'Contact Sales',
      freeForever: 'Free Forever'
    },
    footer: {
      description: 'Blockchain-as-a-Service platform that enables developers and businesses to build blockchain applications easily and quickly.',
      products: 'Products',
      solutions: 'Solutions',
      resources: 'Resources',
      company: 'Company',
      allRightsReserved: 'All rights reserved',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy'
    }
  },
  id: {
    common: {
      loading: 'Memuat...',
      error: 'Kesalahan',
      success: 'Berhasil',
      cancel: 'Batal',
      confirm: 'Konfirmasi',
      save: 'Simpan',
      delete: 'Hapus',
      edit: 'Edit',
      back: 'Kembali',
      next: 'Selanjutnya',
      previous: 'Sebelumnya',
      close: 'Tutup',
      search: 'Cari',
      filter: 'Filter',
      sort: 'Urutkan',
      refresh: 'Muat Ulang'
    },
    navigation: {
      home: 'Beranda',
      products: 'Produk',
      pricing: 'Harga',
      solutions: 'Solusi',
      docs: 'Dokumentasi',
      blog: 'Blog',
      company: 'Perusahaan',
      contact: 'Kontak',
      dashboard: 'Dashboard',
      login: 'Masuk',
      logout: 'Keluar'
    },
    hero: {
      title: 'Bangun Aplikasi Blockchain Tanpa Ribet',
      subtitle: 'API & SDK untuk Semua Bisnis',
      description: 'Platform Blockchain-as-a-Service yang memungkinkan developer dan bisnis membangun aplikasi blockchain dengan mudah dan cepat.',
      startFree: 'Mulai Gratis',
      scheduleDemo: 'Jadwalkan Demo'
    },
    wallet: {
      connect: 'Hubungkan Wallet',
      connecting: 'Menghubungkan...',
      connected: 'Wallet Terhubung',
      disconnect: 'Putuskan Koneksi',
      address: 'Alamat',
      balance: 'Saldo',
      network: 'Jaringan',
      switchNetwork: 'Ganti Jaringan',
      copyAddress: 'Salin Alamat',
      viewOnExplorer: 'Lihat di Explorer'
    },
    gas: {
      calculator: 'Kalkulator Biaya Gas',
      estimate: 'Estimasi Gas',
      limit: 'Batas Gas',
      price: 'Harga Gas',
      slow: 'Lambat',
      standard: 'Standar',
      fast: 'Cepat',
      totalCost: 'Total Biaya',
      refresh: 'Perbarui Estimasi',
      calculating: 'Menghitung...'
    },
    contracts: {
      templates: 'Template Smart Contract',
      deploy: 'Deploy Kontrak',
      basic: 'Dasar',
      intermediate: 'Menengah',
      advanced: 'Lanjutan',
      token: 'Token',
      nft: 'NFT',
      defi: 'DeFi',
      dao: 'DAO',
      game: 'Gaming',
      utility: 'Utilitas'
    },
    pricing: {
      starter: 'Pemula',
      pro: 'Pro',
      enterprise: 'Enterprise',
      monthly: 'Bulanan',
      annual: 'Tahunan',
      save: 'Hemat 10%',
      mostPopular: 'Paling Populer',
      upgradeToPro: 'Upgrade ke Pro',
      contactSales: 'Hubungi Sales',
      freeForever: 'Gratis Selamanya'
    },
    footer: {
      description: 'Platform Blockchain-as-a-Service yang memungkinkan developer dan bisnis membangun aplikasi blockchain dengan mudah dan cepat.',
      products: 'Produk',
      solutions: 'Solusi',
      resources: 'Sumber Daya',
      company: 'Perusahaan',
      allRightsReserved: 'Semua hak dilindungi',
      privacyPolicy: 'Kebijakan Privasi',
      termsOfService: 'Syarat Layanan',
      cookiePolicy: 'Kebijakan Cookie'
    }
  }
} as const;

export type TranslationKey = keyof typeof translations.en;
export type NestedTranslationKey<T> = T extends object 
  ? { [K in keyof T]: T[K] extends object 
      ? `${string & K}.${string & keyof T[K]}` 
      : string & K 
    }[keyof T]
  : never;

export type AllTranslationKeys = NestedTranslationKey<typeof translations.en>;