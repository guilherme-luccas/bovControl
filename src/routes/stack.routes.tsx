import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateChecklist from '../screens/CreateChecklist/CreateChecklist';
import Home from '../screens/Home/Home';
import {AddIcon, HamburgerIcon} from 'native-base';
import InfoChecklist from '../screens/InfoChecklist/InfoChecklist';
import EditChecklist from '../screens/EditChecklist/EditChecklist';
const {Screen, Navigator} = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator initialRouteName="Home">
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
      <Screen
        name="EditChecklist"
        component={EditChecklist}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
