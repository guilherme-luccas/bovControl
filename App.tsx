import React from 'react';
import {NativeBaseProvider, StatusBar} from 'native-base';
import Home from './src/screens/Home/Home';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar
          animated={true}
          barStyle={'light-content'}
          showHideTransition={'fade'}
        />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
