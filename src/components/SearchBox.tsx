import React, { useRef } from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
  isAnimating: boolean;
  isSearching: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  inputValue,
  onInputChange,
  onSearch,
  isAnimating,
  isSearching
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAnimating) {
      onInputChange(e.target.value);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Google样式的搜索框 */}
      <div className="relative bg-white rounded-full shadow-lg border border-gray-300 overflow-hidden transition-all duration-300 hover:shadow-xl focus-within:shadow-xl">
        <div className="flex items-center">
          <div className="pl-6 pr-4">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder=""
            className="flex-1 py-4 pr-6 text-lg text-gray-700 bg-transparent border-none outline-none focus:ring-0"
            disabled={isAnimating}
          />
          {!isAnimating && (
            <button
              onClick={onSearch}
              disabled={isSearching}
              className="mr-3 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? '搜索中...' : 'Google 搜索'}
            </button>
          )}
        </div>
        
        {/* 光标动画效果 */}
        {isAnimating && (
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <span 
              className="inline-block w-0.5 h-6 bg-gray-700"
              style={{
                marginLeft: `${inputValue.length * 0.6}em`,
                animation: 'blink 1s infinite'
              }}
            />
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SearchBox;