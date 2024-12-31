import { useKeywords } from "@/contexts/KeywordsContext";
import Image from "next/image";
import KeywordTagsContainer from "./KeywordTagsContainer";
import LanguageSelector, { LANGUAGES } from "./LanguageSelector";
import { showNotification } from './Notification';

export default function KeywordsSection() {
  const { keywords, error, setCurrentLanguage } = useKeywords();

  const handleCopyAll = () => {
    if (keywords.length) {
      navigator.clipboard.writeText(keywords.join(', '));
      showNotification(`${keywords.length} keywords copied to clipboard!`);
    } else {
      showNotification('No keywords to copy');
    }
  };

  const handleKeywordClick = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    showNotification(`Keyword "${keyword}" copied to clipboard!`);
  };

  const handleLanguageChange = (language: typeof LANGUAGES[number]) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-black text-lg font-semibold">Keywords</h3>
        <div className="flex items-center gap-4">
          <LanguageSelector onLanguageChange={handleLanguageChange} />
          <div className="relative group">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCopyAll}
              disabled={!keywords.length}
            >
              <Image
                src="/icons/copy_all.svg"
                alt="Copy all"
                width={20}
                height={20}
              />
            </button>
            {!keywords.length && (
              <div className="absolute top-[calc(100%+0.1rem)] right-0 bg-[#ff4444] text-white px-3 py-1.5 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                No keywords to copy
              </div>
            )}
          </div>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}
      <KeywordTagsContainer 
        keywords={keywords} 
        onKeywordClick={handleKeywordClick}
      />
    </div>
  );
} 