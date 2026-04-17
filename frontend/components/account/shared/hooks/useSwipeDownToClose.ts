import { useRef } from 'react';

interface UseSwipeDownToCloseProps {
  onClose: () => void;
  threshold?: number;
}

export function useSwipeDownToClose({ onClose, threshold = 100 }: UseSwipeDownToCloseProps) {
  const startY = useRef(0);
  const dragging = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    dragging.current = false;
    if (elementRef.current) {
      elementRef.current.style.transition = 'none';
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const dy = e.touches[0].clientY - startY.current;
    // Only allow swiping down (closing)
    if (!dragging.current && Math.abs(dy) > 6) {
      dragging.current = true;
    }
    if (dragging.current && dy > 0 && elementRef.current) {
      elementRef.current.style.transform = `translateY(${dy}px)`;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (elementRef.current) {
      elementRef.current.style.transition = '';
      elementRef.current.style.transform = '';
    }
    const dy = e.changedTouches[0].clientY - startY.current;
    if (dragging.current && dy > threshold) {
      onClose();
    }
    dragging.current = false;
  };

  return {
    elementRef,
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
