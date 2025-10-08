import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' }
];

export function LanguageSelector({ variant = 'default' }) {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const currentLanguageData = languages.find(lang => lang.code === currentLanguage) || languages[0];
  
  // Different styles for different variants (icon-only)
  const buttonStyles = variant === 'login' 
    ? "inline-flex items-center justify-center hover:text-white text-white/80 transition-colors p-2 rounded-md hover:bg-white/20"
    : "inline-flex items-center justify-center hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={buttonStyles}
          aria-label={t('common.language')}
          title={t('common.language')}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">{currentLanguageData.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center gap-3 ${
              currentLanguage === language.code 
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                : ''
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            {currentLanguage === language.code && (
              <span className="text-indigo-600 dark:text-indigo-400">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
