import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';
import {stopBackgroundFetch} from '../../services/LocationService';
import {ShowToast} from '../../utils/Hooks';

import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppTextComps/AppText';
import AppButton from '../../components/AppButton';
import WelcomeModal from '../../components/WelcomeModal';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useCustomNavigation} from '../../utils/Hooks';
import {setLogout} from '../../redux/slices/appSlice';
import {IMAGE_URL} from '../../redux/constant';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SETTINGS_SECTIONS = [
  {
    id: 'group1',
    items: [
      {
        id: '1',
        title: 'Settings',
        icon: 'settings-outline',
        lib: 'Ionicons',
        navTo: 'Settings',
      },
    ],
  },
  {
    id: 'group2',
    items: [
      {
        id: '4',
        title: 'Privacy and safety',
        icon: 'shield-checkmark-outline',
        lib: 'Ionicons',
        navTo: 'PrivacyPolicy',
      },
      {
        id: '6',
        title: 'Notifications',
        icon: 'notifications-outline',
        lib: 'Ionicons',
        navTo: 'Notifications',
      },
    ],
  },
  {
    id: 'group3',
    items: [
      {id: '8', title: 'Logout', icon: 'logout', lib: 'MaterialIcons'},
    ],
  },
];

// Reusable Icon Component to keep the data array clean
const SettingIcon = ({item}) => {
  const size = 20;
  const color = AppColors.BLACK;
  if (item.lib === 'Ionicons')
    return <Ionicons name={item.icon} size={size} color={color} />;
  if (item.lib === 'MaterialIcons')
    return <MaterialIcons name={item.icon} size={size} color={color} />;
  return null;
};

const Profile = () => {
  const {navigateToRoute} = useCustomNavigation();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const {user, isGoogleSign} = useSelector(state => state?.persistedData);

  const handlePress = item => {
    if (item.title === 'Logout') {
      setShowModal(true);
    } else if (item.navTo) {
      navigateToRoute(item.navTo);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        heading="My Profile"
        goBack
        isCenteredHead
        textFontWeight
        isCenteredHeadWidth={57.5}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <LineBreak space={3} />

        {/* User Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{uri: `${IMAGE_URL}${user?.image}`}}
            style={styles.profileImage}
          />
          <LineBreak space={2} />
          <AppText
            title={user?.userName || user?.fullName || 'User'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />
          <LineBreak space={1.5} />
          <AppButton
            title={'Edit Profile'}
            borderRadius={5}
            handlePress={() => navigateToRoute('AccountSettings')}
            textSize={1.4}
            buttoWidth={28}
          />
        </View>

        <LineBreak space={4} />

        {/* Settings Sections Mapping */}
        {SETTINGS_SECTIONS.map(group => (
          <View key={group.id} style={styles.card}>
            {group.items.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.item,
                  index === group.items.length - 1 && {borderBottomWidth: 0},
                ]}
                activeOpacity={0.7}
                onPress={() => handlePress(item)}>
                <View style={styles.iconContainer}>
                  <SettingIcon item={item} />
                </View>
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <WelcomeModal
        isVisible={showModal}
        exploreOnPress={() => setShowModal(false)}
        submitOnPress={async () => {
          try {
            // Remove stored auth token so background jobs stop using it
            await AsyncStorage.removeItem('authToken');

            // Sign out from Google if user signed in with Google
            if (isGoogleSign) {
              await GoogleSignin.signOut();
            }

            // Stop background fetch tasks
            stopBackgroundFetch();

            // Foreground service removed — BackgroundFetch stop is sufficient

            // Cancel any displayed notifications
            await notifee.cancelAllNotifications();
          } catch (err) {
            console.log('[Profile] Error during logout cleanup:', err);
          }

          // Clear redux state
          dispatch(setLogout());
          setShowModal(false);
        }}
      />

      {/* Foreground test buttons removed — app uses BackgroundFetch only */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  scrollContent: {
    paddingHorizontal: responsiveWidth(6),
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    marginBottom: responsiveHeight(2.5),
    paddingHorizontal: responsiveWidth(2),
    // Standard shadow/elevation
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  iconContainer: {
    width: 35,
    alignItems: 'center',
    marginRight: 10,
  },
});
