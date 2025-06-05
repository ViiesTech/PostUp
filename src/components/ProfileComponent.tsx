/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import {useCustomNavigation} from '../utils/Hooks';

const balanceData = [
  {id: '1', date: 'June 21,2020', amount: '-$650', ref: 'ID#3567728'},
  {id: '2', date: 'May 01,2020', amount: '-$450', ref: 'ID#3567728'},
  {id: '3', date: 'April 09,2020', amount: '-$500', ref: 'ID#3567728'},
];

const menuItems = [
  {
    id: 1,
    icon: 'wallet-outline',
    label: 'My Balance',
    isBalance: true,
  },
  {id: 2, icon: 'trophy-outline', label: 'Leaderboard'},
  {id: 3, icon: 'settings-outline', label: 'Settings', navTo: 'Settings'},
  {id: 4, icon: 'moon', label: 'Dark Mode', toggle: true},
  {
    id: 5,
    icon: 'shield-outline',
    label: 'Security & Privacy',
    navTo: 'SecurityPrivacy',
  },
  {
    id: 6,
    icon: 'information-circle-outline',
    label: 'About',
    navTo: 'About',
  },
  {id: 7, icon: 'logout', label: 'LOGOUT', navTo: 'Auth'},
];

const MyBalanceScreen = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const {navigateToRoute} = useCustomNavigation();

  const handleMenuPress = (item: any) => {
    if (item.isBalance) {
      setShowBalance(prev => !prev);
    }
    if (item.navTo) {
      navigateToRoute(item.navTo);
    }
  };

  const renderMenuItem = ({item}: any) => (
    <>
      <TouchableOpacity
        style={[styles.menuItem, item.id == 1 && {borderTopWidth: 0}]}
        onPress={() => handleMenuPress(item)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(5),
          }}>
          {item.id == 7 ? (
            <MaterialIcons
              name="logout"
              size={responsiveFontSize(3)}
              color="red"
            />
          ) : (
            <Ionicons
              name={item.icon}
              size={responsiveFontSize(3)}
              color={
                item.isBalance && showBalance ? AppColors.BTNCOLOURS : '#000'
              }
            />
          )}
          <Text
            style={[
              styles.menuLabel,
              item.isBalance && showBalance && {color: AppColors.BTNCOLOURS},
              item.id == 7 && {color: 'red'},
            ]}>
            {item.label}
          </Text>
          {item.toggle ? (
            <Switch value={darkMode} onValueChange={setDarkMode} />
          ) : (
            item.id !== 7 && (
              <Ionicons
                name={
                  showBalance && item.isBalance
                    ? 'chevron-down'
                    : 'chevron-forward'
                }
                size={18}
                color={
                  item.isBalance && showBalance ? AppColors.BTNCOLOURS : '#999'
                }
              />
            )
          )}
        </View>
      </TouchableOpacity>

      {item.isBalance && showBalance && (
        <FlatList
          data={balanceData}
          keyExtractor={b => b.id}
          renderItem={({item}: any) => (
            <View style={styles.balanceItem}>
              <Text style={styles.dollar}>$</Text>
              <View style={styles.balanceInfo}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.ref}>{item.ref}</Text>
              </View>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
          )}
          scrollEnabled={false}
          ListFooterComponent={
            <TouchableOpacity>
              <Text style={styles.viewMore}>View more..</Text>
            </TouchableOpacity>
          }
        />
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.5),
    borderTopWidth: 1,
    borderTopColor: AppColors.DARKGRAY,
  },
  menuLabel: {
    marginLeft: responsiveWidth(3),
    fontSize: responsiveFontSize(2),
    flex: 1,
    fontWeight: 'bold',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(5),
  },
  logoutText: {
    color: 'red',
    marginLeft: responsiveWidth(2),
    fontWeight: 'bold',
  },

  // Balance styles
  balanceItem: {
    flexDirection: 'row',
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: AppColors.WHITE,
  },
  dollar: {color: '#2ecc71', fontSize: 20},
  balanceInfo: {marginLeft: 10, flex: 1},
  date: {fontSize: 15, fontWeight: '500'},
  ref: {color: '#888', fontSize: 12},
  amount: {fontWeight: 'bold', fontSize: 16, color: 'black'},
  viewMore: {
    color: AppColors.BTNCOLOURS,
    backgroundColor: AppColors.WHITE,
    paddingVertical: responsiveHeight(1),
    textAlign: 'center',
  },
});

export default MyBalanceScreen;
