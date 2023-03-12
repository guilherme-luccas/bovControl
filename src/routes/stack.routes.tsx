import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CreateChecklist from '../screens/CreateChecklist/CreateChecklist';
import InfoChecklist from '../screens/InfoChecklist/InfoChecklist';
import Home from '../screens/Home/Home';

const {Screen, Navigator} = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{animation: 'none'}} initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="CreateChecklist"
        component={CreateChecklist}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="InfoChecklist"
        component={InfoChecklist}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
