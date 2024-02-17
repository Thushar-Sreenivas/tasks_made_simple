import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

interface CheckboxProps {
  isChecked: boolean;
  onPress: () => void;
  color: string;
}

const Checkbox: React.FC<CheckboxProps> = ({isChecked, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {isChecked && (
        <View style={[styles.checkedCircle, {backgroundColor: color}]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B3B3B3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Checkbox;
