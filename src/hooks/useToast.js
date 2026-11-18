import { useCallback, useEffect, useRef, useState } from 'react';

// A message that clears itself after `duration` ms. Stacked calls restart the timer.
export default function useToast(duration = 3000) {
  const [message, setMessage] = useState('');
  const timer = useRef(null);

  const show = useCallback((text) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), duration);
  }, [duration]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message, show };
}
