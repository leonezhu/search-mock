import React, { useState } from 'react';
import SearchBox from '../components/SearchBox';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

const Home: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [manualInput, setManualInput] = useState('');
  
  const targetText = 'bearecho.com';
  
  const {
    displayText,
    isAnimating
  } = useTypingAnimation({
    targetText,
    speed: 100,
    autoStart: true,
    loop: true
  });

  // 获取当前输入值（动画文本或手动输入）
  const currentInputValue = isAnimating ? displayText : manualInput;

  const handleInputChange = (value: string) => {
    if (!isAnimating) {
      setManualInput(value);
    }
  };

  const handleSearch = async () => {
    const searchTerm = currentInputValue.trim();
    if (!searchTerm) return;

    setIsSearching(true);

    // 模拟搜索延迟
    setTimeout(() => {
      setIsSearching(false);
      // 可以在这里添加搜索结果处理逻辑
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo区域 - 占用1/3空间 */}
      <div className="flex-1 flex items-end justify-center pb-8">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="w-24 h-24 object-contain"
        />
      </div>
      
      {/* 搜索栏区域 - 占用2/3空间 */}
      <div className="flex-[2] flex items-start justify-center pt-8">
        <div className="w-full max-w-2xl px-4">
          <SearchBox
            inputValue={currentInputValue}
            onInputChange={handleInputChange}
            onSearch={handleSearch}
            isAnimating={isAnimating}
            isSearching={isSearching}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;