// App.tsx
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {RecoilRoot} from 'recoil';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <AppNavigator />
    </RecoilRoot>
  );
};

export default App;
