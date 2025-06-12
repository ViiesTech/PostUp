/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppTextComps/AppText';
import AppButton from '../../components/AppButton';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCustomNavigation} from '../../utils/Hooks';
import WelcomeModal from '../../components/WelcomeModal';

const settingsSections = [
  {
    id: 'group1',
    items: [
      {
        id: '1',
        title: 'Settings',
        icon: <Ionicons name="settings-outline" size={20} />,
        navTo: 'Settings',
      },
      {
        id: '2',
        title: 'Find PostUp Pals',
        icon: <Ionicons name="people-outline" size={20} />,
        navTo: 'PostUpPals',
      },
    ],
  },
  {
    id: 'group2',
    items: [
      {
        id: '3',
        title: 'Favorites',
        icon: <Text style={{fontSize: 20}}>🤗</Text>,
        navTo: 'Favorites',
      },
      {
        id: '4',
        title: 'Privacy and safety',
        icon: <Ionicons name="shield-checkmark-outline" size={20} />,
        navTo: 'PrivacyPolicy',
        heading: 'Privacy Policy',
      },
      {
        id: '5',
        title: 'Accessibility, display and languages',
        icon: (
          <MaterialCommunityIcons name="hand-back-right-outline" size={20} />
        ),
        navTo: 'Favorites',
      },
      {
        id: '6',
        title: 'Notifications',
        icon: <Ionicons name="notifications-outline" size={20} />,
        navTo: 'Notifications',
      },
    ],
  },
  {
    id: 'group3',
    items: [
      {
        id: '7',
        title: 'History',
        icon: <Ionicons name="time-outline" size={20} />,
        navTo: 'History',
      },
      {
        id: '8',
        title: 'Logout',
        icon: <MaterialIcons name="logout" size={20} />,
      },
    ],
  },
];

const Profile = () => {
  const {navigateToRoute} = useCustomNavigation();
  const [showModal, setShowModal] = useState(false);

  const renderGroup = ({item}) => (
    <View style={styles.card}>
      {item.items.map((setting, index) => (
        <TouchableOpacity
          key={setting.id}
          style={styles.item}
          onPress={() => {
            if (setting.navTo) {
              navigateToRoute(setting.navTo);
            } else if (setting.heading) {
              navigateToRoute(setting.navTo);
            } else {
              setShowModal(true);
            }
          }}>
          <View style={styles.icon}>{setting.icon}</View>
          <AppText
            title={setting.title}
            textColor={AppColors.BLACK}
            textSize={2}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="My Profile"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={57.5}
      />

      <WelcomeModal
        isVisible={showModal}
        exploreOnPress={() => setShowModal(false)}
        submitOnPress={() => {
          setShowModal(false);
          navigateToRoute('Auth');
        }}
      />

      <LineBreak space={3} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={AppImages.user}
            style={{width: 100, height: 100, borderRadius: 100}}
          />
          <LineBreak space={2} />
          <AppText
            title={'Ronald Sustroharjo'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />
          <LineBreak space={2} />
          <AppButton
            title={'Edit Profile'}
            borderRadius={5}
            handlePress={() => navigateToRoute('AccountSettings')}
            textSize={1.4}
            buttoWidth={25}
          />
        </View>
        <LineBreak space={3} />

        <FlatList
          data={settingsSections}
          keyExtractor={item => item.id}
          renderItem={renderGroup}
          ItemSeparatorComponent={() => <LineBreak space={2} />}
          contentContainerStyle={{paddingBottom: 20}}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingVertical: responsiveHeight(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    marginBottom: responsiveHeight(2),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveWidth(4),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 15,
  },
  icon: {
    alignItems: 'center',
  },
});
