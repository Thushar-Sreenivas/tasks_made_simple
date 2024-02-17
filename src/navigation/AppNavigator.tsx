// src/navigation/AppNavigator.tsx
import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TaskCreationScreen from '../screens/TaskCreationScreen';
import TaskEditingScreen from '../screens/TaskEditingScreen';
import {MyDarkTheme, MyLightTheme} from '../theme/themeProvider';
import {useColorScheme} from 'react-native';

export type RootStackParamList = {
  Today: undefined;
  CreateTask: undefined;
  TaskEdit: {
    taskId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Navigator initialRouteName="Today">
          <Stack.Screen name="Today" component={HomeScreen} />
          <Stack.Screen
            name="CreateTask"
            component={TaskCreationScreen}
            options={{title: 'Create Task'}}
          />
          <Stack.Screen name="TaskEdit" component={TaskEditingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default AppNavigator;
