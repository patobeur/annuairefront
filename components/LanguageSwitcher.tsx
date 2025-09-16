
import React from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageButton: React.FC<{
  lang: Language;
  label: string;
  isActive: boolean;
  onClick: (lang: Language) => void;
  disabled?: boolean;
}> = ({ lang, label, isActive, onClick, disabled }) => {
  const getButtonClasses = () => {
    const base = "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-sky-400";
    if (disabled) {
      return `${base} bg-sky-900/40 text-sky-300 opacity-50 cursor-not-allowed`;
    }
    if (isActive) {
      return `${base} bg-sky-500/80 text-white shadow-md`;
    }
    return `${base} bg-sky-900/40 text-sky-300 hover:bg-sky-900/80`;
  };

  return (
    <button
      onClick={() => !disabled && onClick(lang)}
      disabled={disabled}
      className={getButtonClasses()}
    >
      {label}
    </button>
  );
};


export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2 p-1 bg-black/20 border border-sky-700/50 rounded-lg">
      <LanguageButton
        lang="fr"
        label="FR"
        isActive={currentLanguage === 'fr'}
        onClick={onLanguageChange}
      />
      <LanguageButton
        lang="en"
        label="EN"
        isActive={currentLanguage === 'en'}
        onClick={onLanguageChange}
        disabled={true}
      />
    </div>
  );
};