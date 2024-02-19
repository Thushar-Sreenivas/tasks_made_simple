import {useTheme as useOriginalTheme} from '@react-navigation/native';
import {MyTheme} from '../theme/themeProvider';

export const useTheme = (): MyTheme => {
  const theme = useOriginalTheme();
  return theme as MyTheme;
};
