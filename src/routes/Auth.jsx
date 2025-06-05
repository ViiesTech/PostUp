import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from '../screens/auth/OnBoarding';
import SignUp from '../screens/auth/SignUp';
import Login from '../screens/auth/Login';

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="OnBoarding">
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default Auth;
