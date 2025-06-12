/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppColors from '../../utils/AppColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import {useCustomNavigation} from '../../utils/Hooks';

const settings = [
  {
    key: 'account',
    label: 'Account Settings',
    icon: 'account-cog-outline',
    navTo: 'AccountSettings',
  },
  {key: 'privacy', label: 'Privacy Settings', icon: 'lock-outline', navTo: ''},
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
    icon: 'file-document-outline',
    navTo: 'PrivacyPolicy',
    heading: 'Privacy Policy',
  },
  {
    key: 'faq',
    label: 'Frequently Ask Questions',
    icon: 'file-question-outline',
    navTo: 'FAQ',
  },
  {
    key: 'report',
    label: 'Report an Issue',
    icon: 'alert-circle-outline',
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

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (item.heading) {
          navigateToRoute(item?.navTo, {heading: item.heading});
        } else if (item?.navTo) {
          navigateToRoute(item?.navTo);
        } else if (!item.isSwitch) {
          Alert.alert('will soon...');
        }
      }}>
      <View style={styles.iconLabel}>
        <Icon name={item.icon} size={20} color="#000" />
        <Text style={styles.label}>{item.label}</Text>
      </View>
      {item.isSwitch && (
        <Switch
          value={isNotificationEnabled}
          onValueChange={setIsNotificationEnabled}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="Settings"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={55}
      />
      <LineBreak space={4} />
      <FlatList
        data={settings}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: responsiveHeight(1),
  },
  item: {
    backgroundColor: '#F5F7F9',
    padding: responsiveWidth(4),
    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(5),
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: '#000',
  },
});
