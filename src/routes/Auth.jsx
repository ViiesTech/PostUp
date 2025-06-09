import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from '../screens/auth/OnBoarding';
import SignUp from '../screens/auth/SignUp';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPVerifications from '../screens/auth/OTPVerifications';
import NewPassword from '../screens/auth/NewPassword';
import CreateProfile from '../screens/auth/CreateProfile';
import AllowAccess from '../screens/auth/AllowAccess';
import SelectLocation from '../screens/auth/SelectLocation';
import TermsOfService from '../screens/auth/TermsOfService';

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="OnBoarding">
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPVerifications" component={OTPVerifications} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="AllowAccess" component={AllowAccess} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="TermsOfService" component={TermsOfService} />
    </Stack.Navigator>
  );
};

export default Auth;
