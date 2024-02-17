// src/navigation/DrawerNavigator.tsx
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabs from './BottomsTabs';
import DrawerContent from '../components/DrawerContent';
import {useTheme} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: colors.accent,
        headerTitleStyle: {color: colors.primaryText},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="TasksMadeSimple" component={BottomTabs} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
