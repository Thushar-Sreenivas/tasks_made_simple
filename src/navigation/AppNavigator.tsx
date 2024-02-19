import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import RootNavigator from './RootNavigator';
import {MyDarkTheme, MyLightTheme} from '../theme/themeProvider';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const defaultThemeValue: ThemeContextType = {
  theme: 'dark',
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeValue);

const AppNavigator: React.FC = () => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    scheme === 'dark' ? 'dark' : 'light',
  );

  const themeData: ThemeContextType = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer
        theme={theme === 'dark' ? MyDarkTheme : MyLightTheme}>
        <RootNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default AppNavigator;
