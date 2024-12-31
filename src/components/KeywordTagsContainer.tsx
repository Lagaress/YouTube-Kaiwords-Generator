import React, { useState } from "react";

interface KeywordTagsContainerProps {
  keywords?: string[];
  onKeywordClick?: (keyword: string) => void;
}

export default function KeywordTagsContainer({ 
  keywords = ["Example tag"], 
  onKeywordClick 
}: KeywordTagsContainerProps) {
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const handleClick = (keyword: string) => {
    onKeywordClick?.(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 2000); // Reset after 2 seconds
  };

  return (
    <div className="min-h-[80px] p-3 border-2 border-gray-200 rounded-lg flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <div key={`${keyword}-${index}`} className="relative group">
          <span 
            onClick={() => handleClick(keyword)}
            className="bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors"
          >
            {keyword}
          </span>
          {copiedKeyword === keyword && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              Copied!
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 