import * as React from 'react';

function useOutsideClickHandler(
  ref: React.RefObject<HTMLElement> | React.RefObject<HTMLElement[]>,
  callback: () => void,
) {
  React.useEffect(() => {
    function handleClickOutside(event: TouchEvent | MouseEvent) {
      if (Array.isArray(ref.current) && !ref.current.some((node) => node.contains(event.target as Node))) {
        callback();
      } else if (ref.current && !Array.isArray(ref.current) && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

export default useOutsideClickHandler;