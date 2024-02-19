import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

const useClock = () => {
  const [currentTime, setCurrentTime] = useState('');

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {hour12: true});
        const dateString = now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        setCurrentTime(`${dateString}, ${timeString}`);
      }, 1000);

      return () => clearInterval(interval);
    }, []),
  );

  return currentTime;
};

export default useClock;
