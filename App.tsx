import React from 'react';
import {NativeBaseProvider, StatusBar} from 'native-base';
import {ThemeProvider} from 'styled-components';
import Routes from './src/routes';
import theme from './src/globalStyles/theme';
import {ThemeProviderMode} from './src/context/useThemeMode';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <ThemeProviderMode>
        <ThemeProvider theme={theme}>
          <StatusBar
            animated={true}
            barStyle={'light-content'}
            showHideTransition={'fade'}
          />
          <Routes />
        </ThemeProvider>
      </ThemeProviderMode>
    </NativeBaseProvider>
  );
}

export default App;
