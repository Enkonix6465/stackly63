import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Get language from localStorage or use current i18n language
    const savedLanguage = localStorage.getItem('i18nextLng') || i18n.language;
    setCurrentLanguage(savedLanguage);
  }, [i18n.language]);

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setCurrentLanguage(languageCode);
    
    // Keep document direction as LTR for all languages
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = languageCode;
  };

  return {
    currentLanguage,
    changeLanguage,
    isRTL: false // Always LTR
  };
}
