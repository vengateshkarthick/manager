import * as React from 'react';

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState<typeof value>(value);

  React.useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [value]);

  return debouncedValue;
}

export default useDebounce;