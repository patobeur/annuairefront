import React, { useState } from 'react';
import { MindMap } from './components/MindMap';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { mindMapData } from './constants';
import type { Language } from './types';

function App() {
  const [language, setLanguage] = useState<Language>('fr');

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <main
      className="relative w-screen h-screen text-white overflow-hidden font-sans"
      style={{
        backgroundImage: "url('https://auberon-ai.com/wp-content/uploads/2025/09/4K-High-Resolution-Galaxy-Wallpaper-scaled.jpeg?q=80&w=2071&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <header className="absolute top-4 right-4 z-20">
        <LanguageSwitcher
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </header>
      
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <MindMap data={mindMapData[language]} />
      </div>

      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-sky-400/50 z-20">
        <p>An interactive visualization of the AI Market Landscape</p>
      </footer>
    </main>
  );
}

export default App;