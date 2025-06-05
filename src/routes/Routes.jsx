import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Auth';
const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Auth">
      <Stack.Screen name="Auth" component={Auth} />
      {/* <Stack.Screen name="Main" component={Main} /> */}
    </Stack.Navigator>
  );
};

export default Routes;
