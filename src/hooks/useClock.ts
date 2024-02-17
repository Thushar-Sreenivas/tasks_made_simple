// src/hooks/useClock.ts
import {useState, useEffect} from 'react';

const useClock = (): string => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US');
      const dateString = now.toLocaleDateString('en-US');
      setCurrentTime(`${dateString} ${timeString}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

export default useClock;
