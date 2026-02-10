/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import {useCustomNavigation} from '../../utils/Hooks';

const SETTINGS_DATA = [
  {
    key: 'account',
    label: 'Account Settings',
    icon: 'home-outline',
    navTo: 'AccountSettings',
  },
  {
    key: 'privacy_settings',
    label: 'Privacy Settings',
    icon: 'lock-outline',
    navTo: '',
  },
  {
    key: 'notification',
    label: 'Notification',
    icon: 'bell-outline',
    isSwitch: true,
  },
  {
    key: 'push',
    label: 'Push Notification',
    icon: 'bell-outline',
    navTo: 'Notifications',
  },
  {
    key: 'terms',
    label: 'Terms of Service',
    icon: 'file-document-outline',
    navTo: 'PrivacyPolicy',
    heading: 'Terms of Service',
  },
  {
    key: 'policy',
    label: 'Privacy Policy',
    icon: 'lock-outline',
    navTo: 'PrivacyPolicy',
    heading: 'Privacy Policy',
  },
  {
    key: 'faq',
    label: 'Frequently Ask Questions',
    icon: 'file-document-outline',
    navTo: 'FAQ',
  },
  {
    key: 'report',
    label: 'Report an Issue',
    icon: 'bell-outline',
  },
  {
    key: 'about',
    label: 'About PostUp',
    icon: 'information-outline',
    navTo: 'PrivacyPolicy',
    heading: 'About PostUp',
  },
  {
    key: 'location',
    label: 'Show My Location',
    icon: 'map-marker',
    navTo: 'ShowMyLocation',
  },
];

const Settings = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const {navigateToRoute} = useCustomNavigation();

  const handlePress = item => {
    if (item.heading) {
      navigateToRoute(item?.navTo, {heading: item.heading});
    } else if (item?.navTo) {
      navigateToRoute(item?.navTo);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        heading="Settings"
        goBack
        isCenteredHead
        textFontWeight
        isCenteredHeadWidth={55}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <LineBreak space={2} />

        {SETTINGS_DATA.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.card}
            activeOpacity={item?.isSwitch ? 1 : 0.7}
            onPress={() => handlePress(item)}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon name={item.icon} size={24} color={AppColors.BLACK} />
              </View>
              <AppText
                title={item.label}
                textColor={AppColors.BLACK}
                textSize={1.8}
                textFontWeight
              />
            </View>

            {item.isSwitch && (
              <Switch
                value={isNotificationEnabled}
                onValueChange={setIsNotificationEnabled}
                trackColor={{false: '#D1D1D1', true: AppColors.BTNCOLOURS}}
                thumbColor={AppColors.WHITE}
                ios_backgroundColor="#D1D1D1"
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  scrollContent: {
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: 10,
    marginBottom: responsiveHeight(1.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
});
