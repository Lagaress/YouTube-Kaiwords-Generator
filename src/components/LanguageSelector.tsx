import Image from "next/image";
import React from "react";
import { showNotification } from './Notification';

export const LANGUAGES = [
  { code: 'en', flag: '/icons/flags/en.svg', name: 'English' },
  { code: 'es', flag: '/icons/flags/es.svg', name: 'Spanish' }
] as const;

interface LanguageSelectorProps {
  onLanguageChange?: (language: typeof LANGUAGES[number]) => void;
}

export default function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [currentLangIndex, setCurrentLangIndex] = React.useState(0);

  const handleLanguageChange = () => {
    const nextIndex = (currentLangIndex + 1) % LANGUAGES.length;
    setCurrentLangIndex(nextIndex);
    const nextLanguage = LANGUAGES[nextIndex];
    onLanguageChange?.(nextLanguage);
    
    showNotification(`Language changed to ${nextLanguage.name}`);
  };

  return (
    <button 
      className="w-8 h-8 hover:opacity-80 transition-opacity"
      onClick={handleLanguageChange}
    >
      <Image
        src={LANGUAGES[currentLangIndex].flag}
        alt={LANGUAGES[currentLangIndex].name}
        width={32}
        height={32}
        className="rounded-md"
      />
    </button>
  );
} 