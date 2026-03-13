/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AppColors from '../utils/AppColors';
import AppText from './AppTextComps/AppText';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../utils/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IMAGE_URL} from '../redux/constant';
import moment from 'moment';

const PendingReviewCard = ({item, onPress}) => {
  const businessName = item?.adminId?.businessName || 'Business';
  const businessImage = item?.adminId?.images?.[0] || '';
  const expiresAt = item?.expiresAt;
  const status = item?.status;

  const getTimeRemaining = () => {
    if (!expiresAt) return '';
    const now = moment();
    const expiry = moment(expiresAt);
    const duration = moment.duration(expiry.diff(now));

    if (duration.asSeconds() <= 0) {
      return 'Expired';
    }

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const isExpired = () => {
    if (!expiresAt) return false;
    return moment().isAfter(moment(expiresAt));
  };

  const timeRemaining = getTimeRemaining();
  const expired = isExpired();

  return (
    <TouchableOpacity
      style={[styles.card, expired && styles.expiredCard]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={expired}>
      <View style={styles.imageContainer}>
        {businessImage ? (
          <Image
            source={{uri: `${IMAGE_URL}${businessImage}`}}
            style={styles.businessImage}
          />
        ) : (
          <View style={[styles.businessImage, styles.placeholderImage]}>
            <Ionicons
              name="business"
              size={responsiveFontSize(3)}
              color={AppColors.GRAY}
            />
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <AppText
          title={businessName}
          textColor={AppColors.BLACK}
          textSize={1.9}
          textFontWeight
          numberOfLines={1}
        />
        <View style={{height: responsiveHeight(0.5)}} />
        <View style={styles.statusRow}>
          <MaterialIcons
            name="access-time"
            size={responsiveFontSize(1.8)}
            color={expired ? AppColors.RED : AppColors.ORANGE}
          />
          <AppText
            title={timeRemaining}
            textColor={expired ? AppColors.RED : AppColors.ORANGE}
            textSize={1.4}
            style={{marginLeft: responsiveWidth(1)}}
          />
        </View>
        <View style={{height: responsiveHeight(0.5)}} />
        <View style={styles.statusBadge}>
          <AppText
            title={expired ? 'Expired' : status}
            textColor={expired ? AppColors.RED : AppColors.PRIMARY}
            textSize={1.3}
            textFontWeight
          />
        </View>
      </View>

      <View style={styles.iconContainer}>
        <Ionicons
          name="chevron-forward"
          size={responsiveFontSize(2.5)}
          color={AppColors.GRAY}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    padding: responsiveWidth(3),
    marginBottom: responsiveHeight(1.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: AppColors.LIGHTGRAY,
  },
  expiredCard: {
    opacity: 0.6,
    borderColor: AppColors.RED,
  },
  imageContainer: {
    marginRight: responsiveWidth(3),
  },
  businessImage: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: 10,
  },
  placeholderImage: {
    backgroundColor: AppColors.LIGHTGRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: AppColors.LIGHTPRIMARY || '#E8F5FF',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(0.4),
    borderRadius: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: responsiveWidth(2),
  },
});

export default PendingReviewCard;
