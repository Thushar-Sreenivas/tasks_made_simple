// src/navigation/BottomTabs.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TodayScreen from '../screens/HomeScreen';
import UpcomingScreen from '../screens/UpcomingScreen';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Upcoming" component={UpcomingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
