// src/components/Checkbox.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface CheckboxProps {
  isChecked: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({isChecked, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      <Text style={styles.checkboxText}>{isChecked ? '✓' : ''}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#BFBFBF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxText: {
    fontSize: 18,
    color: '#8A2BE2',
  },
});

export default Checkbox;
