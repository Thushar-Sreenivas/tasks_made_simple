// src/components/ListEmptyComponent.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ListEmptyIcon} from '../assets/icons';

interface Props {
  text: string;
  color: string;
}

export const ListEmptyComponent: React.FC<Props> = ({text, color}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ListEmptyIcon />
      </View>
      <Text style={[styles.text, {color}]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  iconContainer: {width: 240, height: 240},
});
