"use client";

import React from "react";
import KeywordsSection from "@/components/KeywordsSection";
import TextInputSection from "@/components/TextInputSection";
import { CONFIG } from "@/config/config";
import { useKeywords } from "@/contexts/KeywordsContext";

export default function Home() {
  const [description, setDescription] = React.useState<string>("");
  const { generateKeywords, isGenerating } = useKeywords();

  const handleGenerate = async () => {
    if (description.trim()) {
      await generateKeywords(description);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex justify-center items-center bg-gray-50">
      <main className="w-full max-w-[600px] bg-white rounded-lg shadow-2xl p-6 border-2 border-gray-200">
        <h2 className="text-black text-2xl font-bold text-center mb-6">YouTube K(AI)words Generator</h2>
        <TextInputSection 
          maxLength={CONFIG.DESCRIPTION.MAX_LENGTH}
          onTextChange={setDescription}
        />
        <div className="relative group">
          <button 
            className="w-full bg-[#ff4444] hover:bg-[#cc3333] text-white py-2 px-4 rounded-lg transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerate}
            disabled={isGenerating || !description.trim()}
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
          {!description.trim() && ( 
            <div className="absolute top-[calc(100%-1rem)] left-1/2 transform -translate-x-1/2 bg-[#ff4444] text-white px-3 py-1.5 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              Please enter a description to generate keywords
            </div>
          )}
        </div>
        <KeywordsSection />
      </main>
    </div>
  );
}
