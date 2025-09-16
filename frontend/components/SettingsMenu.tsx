import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Sun, 
  Moon, 
  Monitor, 
  Languages,
  ChevronDown 
} from 'lucide-react';

interface SettingsMenuProps {
  className?: string;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, languages } = useI18n();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Languages className="w-4 h-4" />
            <span className="text-sm">{getCurrentLanguage()?.nativeName}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={language === lang.code ? 'bg-blue-50 text-blue-600' : ''}
            >
              <div className="flex items-center space-x-2">
                <span>{lang.nativeName}</span>
                {language === lang.code && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            {getThemeIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setTheme('light')}
            className={theme === 'light' ? 'bg-blue-50 text-blue-600' : ''}
          >
            <Sun className="w-4 h-4 mr-2" />
            Light
            {theme === 'light' && (
              <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            className={theme === 'dark' ? 'bg-blue-50 text-blue-600' : ''}
          >
            <Moon className="w-4 h-4 mr-2" />
            Dark
            {theme === 'dark' && (
              <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('system')}
            className={theme === 'system' ? 'bg-blue-50 text-blue-600' : ''}
          >
            <Monitor className="w-4 h-4 mr-2" />
            System
            {theme === 'system' && (
              <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SettingsMenu;