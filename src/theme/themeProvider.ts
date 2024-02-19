import {DefaultTheme, DarkTheme, Theme} from '@react-navigation/native';

export type MyTheme = Theme & {
  colors: {
    primaryText: string;
    secondaryText: string;
    accent: string;
    cardBackground: string;
    cardBorder: string;
    iconActive: string;
    iconInactive: string;
    priorityHigh: string;
    priorityMedium: string;
    priorityLow: string;
  };
};

export const MyLightTheme: MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    primaryText: '#121212',
    secondaryText: '#757575',
    accent: '#0057FF',
    cardBackground: '#F5F5F5',
    cardBorder: '#E0E0E0',
    iconActive: '#121212',
    iconInactive: '#757575',
    priorityHigh: '#D32F2F',
    priorityMedium: '#FFA500',
    priorityLow: '#388E3C',
  },
};

export const MyDarkTheme: MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    primaryText: '#FFFFFF',
    secondaryText: '#B3B3B3',
    accent: '#FFA500',
    cardBackground: '#1E1E1E',
    cardBorder: '#2D2D2D',
    iconActive: '#FFFFFF',
    iconInactive: '#B3B3B3',
    priorityHigh: '#FF1744',
    priorityMedium: '#FFA500',
    priorityLow: '#00E676',
  },
};
