// App.tsx
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {RecoilRoot} from 'recoil';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={styles.container}>
        <AppNavigator />
      </GestureHandlerRootView>
    </RecoilRoot>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
