// src/navigation/TaskStackNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TaskCreationScreen from '../screens/TaskCreationScreen';
import TaskEditingScreen from '../screens/TaskEditingScreen';

const Stack = createStackNavigator();

const TaskStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TaskCreation" component={TaskCreationScreen} />
      <Stack.Screen name="TaskEditing" component={TaskEditingScreen} />
    </Stack.Navigator>
  );
};

export default TaskStackNavigator;
