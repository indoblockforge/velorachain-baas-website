import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, type Language, type AllTranslationKeys } from '../lib/translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: AllTranslationKeys) => string;
  languages: { code: Language; name: string; nativeName: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage for saved language preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('velorachain-language') as Language;
      if (saved && (saved === 'en' || saved === 'id')) {
        return saved;
      }
      
      // Check browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('id')) {
        return 'id';
      }
    }
    return defaultLanguage;
  });

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'id' as Language, name: 'Indonesian', nativeName: 'Bahasa Indonesia' }
  ];

  useEffect(() => {
    // Save language preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('velorachain-language', language);
    }
    
    // Update document language attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: AllTranslationKeys): string => {
    const keys = key.split('.') as string[];
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        let fallback: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
            fallback = fallback[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    languages
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};