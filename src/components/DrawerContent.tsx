// src/components/DrawerContent.tsx
import React, {useContext} from 'react';
import {View, Text, Switch, Image, StyleSheet} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {ThemeContext, ThemeContextType} from '../navigation/AppNavigator';
import {StanImg} from '../assets/images';
import {useTheme} from '../hooks/useTheme';

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const {colors} = useTheme();
  const {theme, setTheme} = useContext<ThemeContextType>(ThemeContext);
  const isDarkMode = theme === 'dark';
  const toggleTheme = () => setTheme(isDarkMode ? 'light' : 'dark');

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: colors.background}}>
      <View style={styles.logoContainer}>
        {StanImg ? (
          <Image source={StanImg} style={styles.profileImage} />
        ) : null}
        <Text style={[styles.userName, {color: colors.text}]}>
          STAN Esports
        </Text>
      </View>

      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleLabel, {color: colors.text}]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? '#FFA500' : '#757575'}
          trackColor={{false: '#767577', true: '#FFA500'}}
        />
      </View>

      <Text style={[styles.comingSoon, {color: colors.accent}]}>
        Coming Soon
      </Text>
      {[
        'User Authentication',
        'Reminders and Notifications',
        'Customizable Dashboard',
        'Collaboration and Sharing',
        'Search and Filters',
        'Analytics and Task Insights',
        'Widget Support',
        'Cloud Sync',
        'Voice Commands',
        'Internationalization',
      ].map(feature => (
        <Text
          key={feature}
          style={[styles.featureItem, {color: colors.primaryText}]}>
          {feature}
        </Text>
      ))}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
  },
  userName: {
    fontSize: 20,
    marginTop: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  comingSoonHeader: {
    padding: 20,
    paddingTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  comingSoonList: {
    paddingHorizontal: 20,
  },
  comingSoonItem: {
    fontSize: 14,
    margin: 0,
    padding: 10,
    opacity: 0.6,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 22,
  },
  toggleLabel: {
    fontSize: 16,
  },
  comingSoon: {
    paddingHorizontal: 24,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  featureItem: {
    paddingHorizontal: 24,
    marginBottom: 16,
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.7,
  },
});

export default DrawerContent;
