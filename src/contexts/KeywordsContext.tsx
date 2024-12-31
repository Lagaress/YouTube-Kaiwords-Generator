"use client";

import React, { createContext, useContext, useState } from 'react';
import { showNotification } from '@/components/Notification';
import { LANGUAGES } from '@/components/LanguageSelector';

interface KeywordsContextType {
  keywords: string[];
  isGenerating: boolean;
  error: string | null;
  currentLanguage: typeof LANGUAGES[number];
  setCurrentLanguage: (language: typeof LANGUAGES[number]) => void;
  generateKeywords: (description?: string, language?: typeof LANGUAGES[number]) => Promise<void>;
}

const KeywordsContext = createContext<KeywordsContextType | undefined>(undefined);

export function KeywordsProvider({ children }: { children: React.ReactNode }) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<typeof LANGUAGES[number]>(LANGUAGES[0]);
  const [currentDescription, setCurrentDescription] = useState<string | null>(null);

  const generateKeywords = async (description?: string, language?: typeof LANGUAGES[number]): Promise<void> => {
    try {
      if (!description && !currentDescription) {
        throw new Error('Description is required');
      }
      
      if (language && !LANGUAGES.includes(language)) {
        throw new Error('Invalid language selected');
      }

      if (description) {
        setCurrentDescription(description);
      }
      
      if (language) {
        setCurrentLanguage(language);
      }

      if (!description && !language) {
        return;
      }

      const descriptionToUse = description || currentDescription;
      if (!descriptionToUse) {
        return;
      }

      setIsGenerating(true);
      setError(null);

      const languageToUse = language || currentLanguage;

      const response = await fetch('/api/generate-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          description: descriptionToUse, 
          language: languageToUse.code
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate keywords');
      }

      const data = await response.json();
      
      const keywordsList = data.keywords
        .split(',')
        .map((keyword: string) => keyword.trim())
        .filter((keyword: string) => keyword.length > 0);

      setKeywords(keywordsList);
      showNotification(`Successfully generated ${keywordsList.length} keywords in ${languageToUse.name}!`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      showNotification(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <KeywordsContext.Provider 
      value={{ 
        keywords, 
        isGenerating, 
        error, 
        currentLanguage,
        setCurrentLanguage,
        generateKeywords 
      }}
    >
      {children}
    </KeywordsContext.Provider>
  );
}

export function useKeywords() {
  const context = useContext(KeywordsContext);
  if (context === undefined) {
    throw new Error('useKeywords must be used within a KeywordsProvider');
  }
  return context;
} 