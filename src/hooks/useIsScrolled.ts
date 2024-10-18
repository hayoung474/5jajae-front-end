import { useEffect, useState, MutableRefObject } from 'react';
import { throttle } from '~/lib';

const checkIsScrolled = (targetElement: MutableRefObject<HTMLElement | null> | null): boolean => {
  if (targetElement?.current) {
    return targetElement.current.scrollTop > 0;
  }
  return window.scrollY > 0;
};

export const useIsScrolled = (targetElement: MutableRefObject<HTMLElement | null> | null = null): boolean => {
  const [isScrolled, setIsScrolled] = useState<boolean>(checkIsScrolled(targetElement));

  useEffect(() => {
    const listener = throttle(() => {
      setIsScrolled(checkIsScrolled(targetElement));
    }, 200);

    const target = targetElement?.current || window;
    target.addEventListener('scroll', listener, { passive: true });

    return () => {
      target.removeEventListener('scroll', listener);
    };
  }, [targetElement]);

  return isScrolled;
};
