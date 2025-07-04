
import React from 'react';
import { Button } from "@/components/ui/button";
import { Language as LanguageIcon } from "lucide-react";
import { setLanguage, getLanguage, Language } from '@/utils/i18n';

const LanguageSwitcher = () => {
  const currentLang = getLanguage();

  const toggleLanguage = () => {
    const newLang: Language = currentLang === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    window.location.reload(); // Reload to apply language changes
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <LanguageIcon className="h-4 w-4" />
      {currentLang === 'en' ? 'हिंदी' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;
