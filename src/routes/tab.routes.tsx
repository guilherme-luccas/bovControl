import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreateChecklist from '../screens/CreateChecklist/CreateChecklist';
import Home from '../screens/Home/Home';
import {AddIcon, HamburgerIcon} from 'native-base';
const {Screen, Navigator} = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'orange.500',
        tabBarInactiveTintColor: 'gray.300',
      }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: 'black',
            fontSize: 14,
          },
          tabBarIcon: ({color}) => (
            <HamburgerIcon size="6" mt="0.5" color={color} />
          ),
        }}
      />
      <Screen
        name="CreateChecklist"
        component={CreateChecklist}
        options={{
          headerShown: false,
          tabBarLabelStyle: {color: 'black', fontSize: 14},

          tabBarLabel: 'Lançar Checklist',
          tabBarIcon: ({color}) => <AddIcon size="6" mt="0.5" color={color} />,
        }}
      />
    </Navigator>
  );
}
