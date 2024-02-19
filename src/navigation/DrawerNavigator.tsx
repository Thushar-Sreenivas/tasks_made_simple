// src/navigation/DrawerNavigator.tsx
import React from 'react';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomTabs from './BottomsTabs';
import DrawerContent from '../components/DrawerContent';
import {useTheme} from '../hooks/useTheme';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return <DrawerContent {...props} />;
};

const DrawerNavigator: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: colors.accent,
        headerTitleStyle: {color: colors.primaryText},
      }}
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="TasksMadeSimple" component={BottomTabs} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
