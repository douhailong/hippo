import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useClickAway = <T extends HTMLDivElement>(
  handler: (e: Event) => void,
  ref: RefObject<T>
) => {
  useEffect(() => {
    const el = ref.current;

    const listener = (event: Event) => {
      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, ref]);
};
