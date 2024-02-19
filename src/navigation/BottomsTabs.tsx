// src/navigation/BottomTabs.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TodayScreen from '../screens/HomeScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
import {TodayIcon, UpcomingIcon} from '../assets/icons/index';

import {StyleSheet, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

const Tab = createBottomTabNavigator();
const BottomTabs: React.FC = () => {
  const {colors} = useTheme();

  const renderTabBarIcon = (
    screenName: 'Today' | 'Upcoming',
    focused: boolean,
  ) => {
    const IconComponent = screenName === 'Today' ? TodayIcon : UpcomingIcon;
    return (
      <View style={styles.iconContainer}>
        <IconComponent color={focused ? colors.accent : colors.text} />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarStyle: {
          backgroundColor: colors.card,
          paddingBottom: 10,
          height: '10%',
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: ({focused}) => renderTabBarIcon('Today', focused),
        }}
      />
      <Tab.Screen
        name="Upcoming"
        component={UpcomingScreen}
        options={{
          tabBarLabel: 'Upcoming',
          tabBarIcon: ({focused}) => renderTabBarIcon('Upcoming', focused),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
  },
});

export default BottomTabs;
