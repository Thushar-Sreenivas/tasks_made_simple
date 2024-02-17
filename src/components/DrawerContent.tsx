// src/components/DrawerContent.js
import React from 'react';
import {View, Text, Switch, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
import {ThemeContext} from '../navigation/AppNavigator';

const DrawerContent = props => {
  const {setTheme, theme} = React.useContext(ThemeContext);
  const {colors} = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{alignItems: 'center', padding: 20}}>
        {/* User avatar and name */}
        {/* <Image
          source={require('../path-to-avatar.jpg')}
          style={{width: 80, height: 80, borderRadius: 40}}
        /> */}
        <Text style={{color: colors.text, fontSize: 16, marginTop: 10}}>
          Username
        </Text>
        {/* Dark mode toggle */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text style={{color: colors.text, marginRight: 10}}>Dark Mode</Text>
          <Switch
            value={true}
            onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        </View>
      </View>
      <DrawerItemList {...props} />
      {/* Placeholder for upcoming features */}
      <DrawerItem label="Notifications (Coming soon)" onPress={() => {}} />
      {/* ...other items */}
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
