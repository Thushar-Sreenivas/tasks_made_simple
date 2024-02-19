// src/navigation/RootNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import TaskCreateEditScreen from '../screens/TaskCreateEditScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

export type RootStackParamList = {
  Drawer: undefined;
  CreateEditTask: {
    taskId?: string;
  };
  TaskDetail: {
    taskId: string;
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Drawer" component={DrawerNavigator} />
      <RootStack.Screen
        name="CreateEditTask"
        component={TaskCreateEditScreen}
        initialParams={{taskId: undefined}}
      />
      <RootStack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        initialParams={{taskId: ''}}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
