// src/components/TabBarIcon.tsx
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';

type Props = {
  focused: boolean;
  icon: string;
  size?: number;
};

const TabBarIcon: React.FC<Props> = ({focused, icon, size = 24}) => {
  const {colors} = useTheme();
  const fillColor = focused ? colors.primary : colors.text;

  return <SvgXml xml={icon} width={size} height={size} fill={fillColor} />;
};

export default TabBarIcon;
