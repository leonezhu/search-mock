import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypingAnimationProps {
  targetText: string;
  speed: number;
  autoStart?: boolean;
  loop?: boolean;
}

interface UseTypingAnimationReturn {
  displayText: string;
  isAnimating: boolean;
  currentIndex: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
}

export const useTypingAnimation = ({
  targetText,
  speed,
  autoStart = false,
  loop = false
}: UseTypingAnimationProps): UseTypingAnimationReturn => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(speed);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  // 清理定时器
  const clearAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 开始动画
  const start = useCallback(() => {
    if (currentIndex >= targetText.length) {
      return;
    }

    setIsAnimating(true);
    isPausedRef.current = false;

    clearAnimation();

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        
        if (nextIndex > targetText.length) {
          if (loop) {
            // 循环播放：等待一段时间后重新开始
            setTimeout(() => {
              setCurrentIndex(0);
              setDisplayText('');
            }, 2000); // 等待2秒后重新开始
            return prevIndex;
          } else {
            clearAnimation();
            setIsAnimating(false);
            return prevIndex;
          }
        }
        
        return nextIndex;
      });
    }, animationSpeed);
  }, [currentIndex, targetText.length, animationSpeed, clearAnimation]);

  // 暂停动画
  const pause = useCallback(() => {
    setIsAnimating(false);
    isPausedRef.current = true;
    clearAnimation();
  }, [clearAnimation]);

  // 重置动画
  const reset = useCallback(() => {
    setIsAnimating(false);
    isPausedRef.current = false;
    setCurrentIndex(0);
    setDisplayText('');
    clearAnimation();
  }, [clearAnimation]);

  // 设置动画速度
  const setSpeed = useCallback((newSpeed: number) => {
    setAnimationSpeed(newSpeed);
    
    // 如果正在动画中，重新启动以应用新速度
    if (isAnimating) {
      clearAnimation();
      setTimeout(() => {
        if (!isPausedRef.current) {
          start();
        }
      }, 0);
    }
  }, [isAnimating, start, clearAnimation]);

  // 更新显示文本
  useEffect(() => {
    setDisplayText(targetText.slice(0, currentIndex));
  }, [currentIndex, targetText]);

  // 自动开始
  useEffect(() => {
    if (autoStart && currentIndex === 0 && !isAnimating) {
      const timer = setTimeout(() => {
        start();
      }, 1000); // 延迟1秒开始
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, currentIndex, isAnimating, start]);

  // 清理效果
  useEffect(() => {
    return () => {
      clearAnimation();
    };
  }, [clearAnimation]);

  // 当目标文本改变时重置
  useEffect(() => {
    reset();
  }, [targetText, reset]);

  return {
    displayText,
    isAnimating,
    currentIndex,
    start,
    pause,
    reset,
    setSpeed
  };
};