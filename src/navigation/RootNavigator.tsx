// src/navigation/RootNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import TaskCreateEditScreen from '../screens/TaskCreateEditScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const RootStack = createStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Drawer" component={DrawerNavigator} />
      <RootStack.Screen
        name="CreateEditTask"
        component={TaskCreateEditScreen}
      />
      <RootStack.Screen name="TaskDetail" component={TaskDetailScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
