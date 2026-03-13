/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import {useLazyGetNotificationsQuery} from '../../redux/services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

// ─── Single notification card ─────────────────────────────────────────────────
const NotificationCard = ({item}) => {
  const isUnread = !item.read;

  return (
    <View style={[styles.card, isUnread && styles.cardUnread]}>
      {/* Icon */}
      <View style={[styles.iconWrap, isUnread && styles.iconWrapUnread]}>
        <Ionicons
          name="location-outline"
          size={responsiveFontSize(2.4)}
          color={isUnread ? AppColors.WHITE : AppColors.BTNCOLOURS}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.row}>
          <AppText
            title={item.title}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
            textwidth={65}
          />
          {isUnread && <View style={styles.dot} />}
        </View>
        <LineBreak space={0.5} />
        <AppText
          title={item.message}
          textColor={AppColors.DARKGRAY}
          textSize={1.6}
          textwidth={70}
          numberOfLines={3}
        />
        <LineBreak space={0.8} />
        <AppText
          title={moment(item.createdAt).fromNow()}
          textColor={AppColors.LIGHTGRAY}
          textSize={1.4}
        />
      </View>
    </View>
  );
};

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons
      name="notifications-off-outline"
      size={responsiveFontSize(8)}
      color={AppColors.LIGHTGRAY}
    />
    <LineBreak space={2} />
    <AppText
      title="No notifications yet"
      textColor={AppColors.DARKGRAY}
      textSize={2}
      textFontWeight
      textAlignment="center"
    />
    <LineBreak space={1} />
    <AppText
      title="You'll see nearby place alerts here when you're on the move."
      textColor={AppColors.LIGHTGRAY}
      textSize={1.6}
      textAlignment="center"
      textwidth={70}
    />
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const Notifications = () => {
  const [getNotifications, {data, isLoading, isFetching}] =
    useLazyGetNotificationsQuery();

  const notifications = data?.data ?? [];
  const unreadCount = notifications.filter(n => !n.read).length;

  // Fetch on every screen focus
  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, [getNotifications]),
  );

  return (
    <View style={styles.container}>
      <AppHeader
        heading={
          unreadCount > 0 ? `Notifications (${unreadCount})` : 'Notifications'
        }
        goBack
        isCenteredHead
        textFontWeight
        isCenteredHeadWidth={60}
      />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={AppColors.BTNCOLOURS} />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item._id}
          renderItem={({item}) => <NotificationCard item={item} />}
          contentContainerStyle={[
            styles.list,
            notifications.length === 0 && {flex: 1},
          ]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={<EmptyState />}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={getNotifications}
              colors={[AppColors.BTNCOLOURS]}
              tintColor={AppColors.BTNCOLOURS}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(4),
  },
  separator: {
    height: responsiveHeight(1.5),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: AppColors.WHITE,
    borderRadius: 14,
    padding: responsiveWidth(4),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  cardUnread: {
    borderLeftWidth: 3,
    borderLeftColor: AppColors.BTNCOLOURS,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3),
  },
  iconWrapUnread: {
    backgroundColor: AppColors.BTNCOLOURS,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.BTNCOLOURS,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: responsiveHeight(10),
  },
});
