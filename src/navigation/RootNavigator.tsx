// src/navigation/RootNavigator.tsx
import React from 'react';
// src/navigation/RootNavigator.tsx
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import TaskCreateEditScreen from '../screens/TaskCreateEditScreen';
import TaskEditingScreen from '../screens/TaskEditingScreen';

const RootStack = createStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Drawer" component={DrawerNavigator} />
      <RootStack.Screen
        name="CreateEditTask"
        component={TaskCreateEditScreen}
      />
      <RootStack.Screen name="TaskEdit" component={TaskEditingScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
