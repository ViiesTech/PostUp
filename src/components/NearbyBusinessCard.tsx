import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import AppColors from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IMAGE_URL} from '../redux/constant';
import AppImages from '../assets/images/AppImages';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

interface NearbyBusinessCardProps {
  item: {
    _id: string;
    businessName: string;
    bio?: string;
    images: string[];
    distance: number;
    locationName: string;
    latitude?: number;
    longitude?: number;
    phoneNumber?: number;
    websiteUrl?: string;
    tier: string;
    workingDays: Array<{
      day: string;
      startTime: string;
      endTime: string;
      isActive: boolean;
    }>;
  };
  onPress?: () => void;
  cardWidth?: number;
  showDistance?: boolean;
}

const NearbyBusinessCard: React.FC<NearbyBusinessCardProps> = ({
  item,
  onPress,
  cardWidth,
  showDistance = true,
}) => {
  const navigation = useNavigation();
  const [showAllDays, setShowAllDays] = useState(false);
  const {userLocation} = useSelector(state => state?.persistedData || {});

  // Debug: Log the item data
  console.log('Business Card Item:', {
    businessName: item.businessName,
    phoneNumber: item.phoneNumber,
    websiteUrl: item.websiteUrl,
    latitude: item.latitude,
    longitude: item.longitude,
  });

  // Get today's working hours
  const today = new Date()
    .toLocaleDateString('en-US', {weekday: 'long'})
    .split(',')[0];
  const todayHours = item.workingDays?.find(
    day => day.day === today && day.isActive,
  );

  // Check if currently open
  const isCurrentlyOpen = () => {
    if (!todayHours) return false;

    try {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinute;

      const parseTime = (timeStr: string) => {
        const [time, period] = timeStr.split(' ');
        const [hourStr, minuteStr] = time.split(':');
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);

        if (period === 'PM' && hour !== 12) {
          hour += 12;
        } else if (period === 'AM' && hour === 12) {
          hour = 0;
        }

        return hour * 60 + minute;
      };

      const startTime = parseTime(todayHours.startTime);
      const endTime = parseTime(todayHours.endTime);

      return currentTime >= startTime && currentTime <= endTime;
    } catch (error) {
      console.log('Error checking if open:', error);
      return false;
    }
  };

  const handleCall = () => {
    if (!item.phoneNumber) {
      Alert.alert('Info', 'Phone number not available for this business');
      return;
    }
    Linking.openURL(`tel:${item.phoneNumber}`).catch(() =>
      Alert.alert('Error', 'Unable to open the dialer'),
    );
  };

  const handleWebsite = () => {
    if (!item.websiteUrl) {
      Alert.alert('Info', 'Website not available for this business');
      return;
    }
    let url = item.websiteUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Unable to open the website'),
    );
  };

  const handleDirections = () => {
    if (item.latitude && item.longitude) {
      navigation.navigate('Main', {
        screen: 'Map',
        params: {
          latitude: item.latitude,
          longitude: item.longitude,
          businessName: item.businessName,
        },
      });
    } else {
      Alert.alert('Error', 'Location coordinates not available');
    }
  };

  const businessImage =
    item.images && item.images.length > 0
      ? {uri: `${IMAGE_URL}${item.images[0]}`}
      : AppImages.event;

  // Compute distance safely: prefer numeric `item.distance`, else compute from coords when possible
  const toRad = (v: number) => (v * Math.PI) / 180;
  const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000; // meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const parseNumber = (v: any) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  };

  let distanceMeters: number | null = null;
  const parsed = parseNumber(item?.distance);
  if (!Number.isNaN(parsed)) {
    distanceMeters = parsed;
  } else if (
    item?.latitude != null &&
    item?.longitude != null &&
    userLocation?.latitude != null &&
    userLocation?.longitude != null
  ) {
    distanceMeters = haversine(
      userLocation.latitude,
      userLocation.longitude,
      item.latitude,
      item.longitude,
    );
  }

  // Fallback: if we still don't have a numeric distance but the API returned
  // a displayable value (e.g. "1.2 km"), use it as-is instead of showing empty.
  let distanceDisplay: string | null = null;
  if (distanceMeters == null && item?.distance != null) {
    const raw = String(item.distance).trim();
    if (raw && raw.toLowerCase() !== 'nan') {
      distanceDisplay = raw;
    }
  }

  // Sort working days
  const daysOrder = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const sortedWorkingDays = [...(item.workingDays || [])].sort(
    (a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day),
  );

  const handleCardPress = () => {
    navigation.navigate('BusinessDetail', {item, fromSearch: !showDistance});
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        cardWidth ? {width: cardWidth, marginHorizontal: 0} : undefined,
      ]}
      onPress={handleCardPress}
      activeOpacity={0.92}>
      {/* Business Image */}
      <View style={styles.imageContainer}>
        <Image source={businessImage} style={styles.image} />

        {/* Tier Badge */}
        {item.tier && (
          <View style={styles.tierBadge}>
            <MaterialCommunityIcons
              name="crown"
              size={12}
              color={item.tier === 'Premium' ? '#FFD700' : AppColors.WHITE}
            />
            <Text style={styles.tierText}>{item.tier}</Text>
          </View>
        )}

        {/* Distance Badge */}
        {showDistance && (
          <View style={styles.distanceBadge}>
            <Ionicons name="location" size={12} color={AppColors.WHITE} />
            <Text style={styles.distanceText}>
              {distanceDisplay
                ? distanceDisplay
                : distanceMeters == null
                ? ''
                : distanceMeters < 1000
                ? `${Math.round(distanceMeters)}m`
                : `${(distanceMeters / 1000).toFixed(1)}km`}
            </Text>
          </View>
        )}
      </View>

      {/* Business Info */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.businessName} numberOfLines={1}>
            {item.businessName}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isCurrentlyOpen() ? '#E8F5E9' : '#FFEBEE',
              },
            ]}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: isCurrentlyOpen() ? '#4CAF50' : '#F44336',
                },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                {
                  color: isCurrentlyOpen() ? '#4CAF50' : '#F44336',
                },
              ]}>
              {isCurrentlyOpen() ? 'Open' : 'Closed'}
            </Text>
          </View>
        </View>

        {/* Location */}
        {item.locationName && (
          <View style={styles.row}>
            <Ionicons
              name="location-outline"
              size={14}
              color={AppColors.GRAY}
            />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.locationName}
            </Text>
          </View>
        )}

        {/* Bio */}
        {item.bio && (
          <Text style={styles.bioText} numberOfLines={2}>
            {item.bio}
          </Text>
        )}

        {/* Working Hours */}
        {sortedWorkingDays.length > 0 && (
          <View style={styles.hoursContainer}>
            <TouchableOpacity
              style={styles.hoursHeader}
              onPress={() => setShowAllDays(!showAllDays)}
              activeOpacity={0.7}>
              <View style={styles.row}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={AppColors.GRAY}
                />
                <Text style={styles.hoursHeaderText}>Working Hours</Text>
              </View>
              <Ionicons
                name={showAllDays ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={AppColors.GRAY}
              />
            </TouchableOpacity>

            {showAllDays ? (
              <View style={styles.allDaysContainer}>
                {sortedWorkingDays.map((day, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dayRow,
                      day.day === today && styles.todayRow,
                    ]}>
                    <Text
                      style={[
                        styles.dayName,
                        day.day === today && styles.todayText,
                      ]}>
                      {day.day}
                    </Text>
                    {day.isActive ? (
                      <Text
                        style={[
                          styles.dayTime,
                          day.day === today && styles.todayText,
                        ]}>
                        {day.startTime} - {day.endTime}
                      </Text>
                    ) : (
                      <Text style={styles.closedText}>Closed</Text>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              todayHours && (
                <View style={styles.todayHoursRow}>
                  <Text style={styles.todayLabel}>Today:</Text>
                  <Text style={styles.todayTime}>
                    {todayHours.startTime} - {todayHours.endTime}
                  </Text>
                </View>
              )
            )}
            {!todayHours && !showAllDays && (
              <View style={styles.todayHoursRow}>
                <Text style={styles.closedText}>Closed Today</Text>
              </View>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          {item.phoneNumber && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleCall}
              activeOpacity={0.7}>
              <Ionicons name="call" size={18} color={AppColors.BTNCOLOURS} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
          )}
          {item.websiteUrl && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleWebsite}
              activeOpacity={0.7}>
              <Ionicons name="globe" size={18} color={AppColors.BTNCOLOURS} />
              <Text style={styles.actionText}>Website</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleDirections}
            activeOpacity={0.7}>
            <Ionicons name="navigate" size={18} color={AppColors.BTNCOLOURS} />
            <Text style={styles.actionText}>Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 16,
    marginHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: responsiveHeight(20),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tierBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  tierText: {
    color: AppColors.WHITE,
    fontSize: responsiveFontSize(1.2),
    fontWeight: '600',
  },
  distanceBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  distanceText: {
    color: AppColors.WHITE,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
  },
  infoContainer: {
    padding: responsiveWidth(4),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.8),
  },
  businessName: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.BLACK,
    flex: 1,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: responsiveHeight(0.8),
  },
  locationText: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.GRAY,
    flex: 1,
  },
  bioText: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.DARKGRAY,
    lineHeight: 20,
    marginBottom: responsiveHeight(1),
  },
  hoursContainer: {
    marginBottom: responsiveHeight(1),
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    padding: responsiveWidth(3),
  },
  hoursHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursHeaderText: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.BLACK,
    fontWeight: '600',
  },
  allDaysContainer: {
    marginTop: responsiveHeight(1),
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(0.8),
    paddingHorizontal: responsiveWidth(1),
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  todayRow: {
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    borderBottomWidth: 0,
    marginBottom: responsiveHeight(0.5),
    marginHorizontal: -responsiveWidth(1),
    paddingHorizontal: responsiveWidth(2),
  },
  dayName: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.DARKGRAY,
    fontWeight: '500',
  },
  dayTime: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.GRAY,
  },
  todayText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  closedText: {
    fontSize: responsiveFontSize(1.4),
    color: '#F44336',
    fontWeight: '500',
  },
  todayHoursRow: {
    flexDirection: 'row',
    marginTop: responsiveHeight(0.8),
    paddingTop: responsiveHeight(0.8),
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  todayLabel: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.BLACK,
    fontWeight: '600',
    marginRight: 8,
  },
  todayTime: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.GRAY,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: responsiveHeight(1.2),
    marginTop: responsiveHeight(0.5),
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.BTNCOLOURS,
    fontWeight: '600',
  },
});

export default NearbyBusinessCard;
