import React from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface AnimationControlsProps {
  isAnimating: boolean;
  animationSpeed: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  isAnimating,
  animationSpeed,
  onStart,
  onPause,
  onReset,
  onSpeedChange
}) => {
  const speedOptions = [
    { value: 200, label: '慢速' },
    { value: 150, label: '正常' },
    { value: 100, label: '快速' },
    { value: 50, label: '极速' }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 px-6 py-3">
        <div className="flex items-center gap-4">
          {/* 播放/暂停按钮 */}
          <button
            onClick={isAnimating ? onPause : onStart}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            title={isAnimating ? '暂停动画' : '开始动画'}
          >
            {isAnimating ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* 重置按钮 */}
          <button
            onClick={onReset}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200"
            title="重置动画"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* 分隔线 */}
          <div className="w-px h-6 bg-gray-300" />

          {/* 速度控制 */}
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-500" />
            <select
              value={animationSpeed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              title="动画速度"
            >
              {speedOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 状态指示器 */}
          <div className="flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                isAnimating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}
            />
            <span className="text-xs text-gray-600">
              {isAnimating ? '播放中' : '已暂停'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;