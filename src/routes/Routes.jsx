import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Auth';
import Main from './Main';
import {useSelector} from 'react-redux';
import CreateProfile from '../screens/auth/CreateProfile';
const Stack = createStackNavigator();

const Routes = () => {
  const {token, user} = useSelector(state => state?.persistedData);
  console.log('user', user);

  return (
    <Stack.Navigator
      // initialRouteName="Auth"
      screenOptions={{headerShown: false}}>
      {token && !user?.isupdated ? (
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
      ) : token && user?.isupdated ? (
        <Stack.Screen name="Main" component={Main} />
      ) : (
        <Stack.Screen name="Auth" component={Auth} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
