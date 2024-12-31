import React from "react";
import { CONFIG } from "@/config/config";

interface TextInputSectionProps {
  maxLength: number;
  onTextChange?: (text: string) => void;
}

export default function TextInputSection({ 
  maxLength,
  onTextChange 
}: TextInputSectionProps) {
  const [text, setText] = React.useState<string>("");
  const charCount = React.useMemo(() => {
    return maxLength - text.length;
  }, [text, maxLength]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const isOverLimit = newText.length > maxLength;

    setText(newText);
    onTextChange?.(newText);

    if (isOverLimit) {
      setTimeout(() => {
        const truncatedText = newText.slice(0, maxLength);
        setText(truncatedText);
        onTextChange?.(truncatedText);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <textarea 
        className={`w-full h-32 p-3 border-2 rounded-lg resize-none transition-colors
          ${text.length > maxLength 
            ? 'border-red-500 text-red-500 focus:border-red-500' 
            : 'border-gray-200 text-gray-600 focus:border-gray-600'} 
          focus:outline-none`}
        placeholder={CONFIG.DESCRIPTION.PLACEHOLDER}
        onChange={handleTextChange}
        value={text}
      />
      <p className={`text-sm text-right ${
        text.length > maxLength ? 'text-red-500' : 'text-gray-600'
      }`}>
        {text.length > maxLength ? "0" : charCount} characters remaining
      </p>
    </div>
  );
} 