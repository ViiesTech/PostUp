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
import AllReview from '../screens/main/AllReview';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CreatePost from '../screens/main/CreatePost';
import CreateEvent from '../screens/main/CreateEvent';
import CreateProfile from '../screens/auth/CreateProfile';

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
      <Stack.Screen name="AllReview" component={AllReview} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
    </Stack.Navigator>
  );
};

const TAB_ICONS = {
  Home: {lib: Ionicons, name: 'home-outline'},
  Search: {lib: Ionicons, name: 'search'},
  Messages: {lib: Ionicons, name: 'chatbox-ellipses-outline'},
  Profile: {lib: FontAwesome, name: 'user-o'},
};

function MyTabs() {
  const nav = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: AppColors.WHITE,
        tabBarInactiveTintColor: AppColors.WHITE,
        tabBarLabel: '',
        tabBarIcon: ({color, size}) => {
          const icon = TAB_ICONS[route.name];
          if (!icon) return null;
          const IconLib = icon.lib;
          return <IconLib name={icon.name} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="GeneralForum"
        component={GeneralForum}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity
              onPress={() => nav.navigate('Main', {screen: 'GeneralForum'})}
              style={styles.centerButton}
              activeOpacity={0.8}>
              <Ionicons name="add" size={40} color={AppColors.BTNCOLOURS} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: responsiveHeight(8),
    paddingTop: responsiveHeight(1.6),
    backgroundColor: AppColors.BTNCOLOURS,
    borderTopWidth: 0,
  },
  tabBarLabel: {
    fontSize: responsiveFontSize(1.6),
  },
  centerButton: {
    top: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: AppColors.BTNCOLOURS,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default Main;
