import { useRef } from 'react';

interface UseSwipeToCloseProps {
  onClose: () => void;
  threshold?: number;
}

export function useSwipeToClose({ onClose, threshold = 80 }: UseSwipeToCloseProps) {
  const startX = useRef(0);
  const dragging = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    dragging.current = false;
    if (elementRef.current) {
      elementRef.current.style.transition = 'none';
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - startX.current;
    // Only allow swiping to the right (closing)
    if (!dragging.current && Math.abs(dx) > 6) {
      dragging.current = true;
    }
    if (dragging.current && dx > 0 && elementRef.current) {
      elementRef.current.style.transform = `translateX(${dx}px)`;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (elementRef.current) {
      elementRef.current.style.transition = '';
      elementRef.current.style.transform = '';
    }
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dragging.current && dx > threshold) {
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
