import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/main/Home';

const Stack = createStackNavigator();
const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={Home} />
    </Stack.Navigator>
  );
};

export default Main;
