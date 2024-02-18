// src/navigation/AppNavigator.tsx
import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyDarkTheme, MyLightTheme} from '../theme/themeProvider';
import {useColorScheme} from 'react-native';
import RootNavigator from './RootNavigator';

export type RootStackParamList = {
  Today: undefined;
  CreateEditTask: undefined;
  TaskEdit: {
    taskId: string;
  };
};

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
});

const AppNavigator: React.FC = () => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(scheme);
  const themeData = {theme, setTheme};

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
