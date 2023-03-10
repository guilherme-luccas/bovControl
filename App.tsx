import React from 'react';
import {NativeBaseProvider, StatusBar} from 'native-base';

import Routes from './src/routes';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <Routes />
    </NativeBaseProvider>
  );
}

export default App;
