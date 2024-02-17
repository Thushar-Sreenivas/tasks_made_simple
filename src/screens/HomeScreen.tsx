// src/screens/HomeScreen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useClock from '../hooks/useClock';

const HomeScreen: React.FC = () => {
  const currentTime = useClock();

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
