// src/navigation/AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TaskCreationScreen from '../screens/TaskCreationScreen';
import TaskEditingScreen from '../screens/TaskEditingScreen';

export type RootStackParamList = {
  Home: undefined;
  CreateTask: undefined;
  TaskEdit: {
    taskId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="CreateTask"
          component={TaskCreationScreen}
          options={{title: 'Create Task'}}
        />
        <Stack.Screen name="TaskEdit" component={TaskEditingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
