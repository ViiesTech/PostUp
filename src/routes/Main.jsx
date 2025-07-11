/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/main/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  responsiveFontSize,
  responsiveHeight,
} from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from '../screens/main/Search';
import GeneralForum from '../screens/main/GeneralForum';
import Profile from '../screens/main/Profile';
import LocationSelection from '../screens/main/LocationSelection';
import Messages from '../screens/main/Messages';
import PrivateMessages from '../screens/main/PrivateMessages';
import EventDetails from '../screens/main/EventDetails';
import Favorites from '../screens/main/Favorites';
import PostUpPals from '../screens/main/PostUpPals';
import History from '../screens/main/History';
import Settings from '../screens/main/Settings';
import AccountSettings from '../screens/main/AccountSettings';
import ChangePassword from '../screens/main/ChangePassword';
import PrivacyPolicy from '../screens/main/PrivacyPolicy';
import Notifications from '../screens/main/Notifications';
import ShowMyLocation from '../screens/main/ShowMyLocation';
import FAQ from '../screens/main/FAQ';
import AllowAccess from '../screens/auth/AllowAccess';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={MyTabs} />
      <Stack.Screen name="LocationSelection" component={LocationSelection} />
      <Stack.Screen name="PrivateMessages" component={PrivateMessages} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="PostUpPals" component={PostUpPals} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="ShowMyLocation" component={ShowMyLocation} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="AllowAccess" component={AllowAccess} />
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: responsiveHeight(8),
          paddingTop: responsiveHeight(1.6),
          backgroundColor: AppColors.BTNCOLOURS,
        },
        tabBarLabelStyle: {
          fontSize: responsiveFontSize(1.6),
        },
        tabBarActiveTintColor: AppColors.WHITE,
        tabBarInactiveTintColor: AppColors.WHITE,
        tabBarLabel: '',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-outline' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Messages') {
            iconName = focused
              ? 'chatbox-ellipses-outline'
              : 'chatbox-ellipses-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user-o' : 'user-o';
          }

          if (route.name === 'Profile') {
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else {
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      {/* <Tab.Screen name="GeneralForum" component={GeneralForum} /> */}
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default Main;
