/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useLazyGetBusinessReviewsQuery} from '../../redux/services';
import {IMAGE_URL} from '../../redux/constant';
import AppColors from '../../utils/AppColors';
import AppImages from '../../assets/images/AppImages';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import {useFocusEffect} from '@react-navigation/native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HEADER_HEIGHT = responsiveHeight(32);

// ─── Star Rating ──────────────────────────────────────────────────────────────
const StarRating = ({rating = 0, size = 14}) => (
  <View style={{flexDirection: 'row', gap: 2}}>
    {[1, 2, 3, 4, 5].map(star => (
      <FontAwesome
        key={star}
        name={star <= Math.round(rating) ? 'star' : 'star-o'}
        size={size}
        color={AppColors.Yellow}
      />
    ))}
  </View>
);

// ─── Review Card ──────────────────────────────────────────────────────────────
const ReviewItem = ({item}) => {
  const userImage = item?.userId?.image
    ? `${IMAGE_URL}${item.userId.image}`
    : null;
  const userName =
    item?.userId?.userName ||
    item?.userId?.email?.split('@')[0] ||
    'Anonymous';

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image
          source={userImage ? {uri: userImage} : AppImages.user}
          style={styles.reviewAvatar}
        />
        <View style={styles.reviewMeta}>
          <Text style={styles.reviewName}>{userName}</Text>
          <Text style={styles.reviewDate}>
            {moment(item?.updatedAt || item?.createdAt).fromNow()}
          </Text>
        </View>
        <StarRating rating={item?.stars || 0} />
      </View>
      {item?.message ? (
        <Text style={styles.reviewText}>{item.message}</Text>
      ) : null}
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const BusinessDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item, fromSearch} = route.params || {};

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllDays, setShowAllDays] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [getReviews, {data: reviewsData, isLoading: reviewsLoading}] =
    useLazyGetBusinessReviewsQuery();

  useFocusEffect(
    useCallback(() => {
      if (item?._id) {
        getReviews(item._id);
      }
    }, [item?._id, getReviews]),
  );

  const reviews = reviewsData?.data ?? [];

  // Images
  const images =
    item.images && item.images.length > 0
      ? item.images.map(img => `${IMAGE_URL}${img}`)
      : [null];

  // Open / Closed
  const today = new Date()
    .toLocaleDateString('en-US', {weekday: 'long'})
    .split(',')[0];
  const todayHours = item.workingDays?.find(
    d => d.day === today && d.isActive,
  );
  const isOpen = (() => {
    if (!todayHours) return false;
    try {
      const now = new Date();
      const cur = now.getHours() * 60 + now.getMinutes();
      const parse = str => {
        const [time, period] = str.split(' ');
        const [h, m] = time.split(':').map(Number);
        if (period === 'PM' && h !== 12) return (h + 12) * 60 + m;
        if (period === 'AM' && h === 12) return m;
        return h * 60 + m;
      };
      return cur >= parse(todayHours.startTime) && cur <= parse(todayHours.endTime);
    } catch {
      return false;
    }
  })();

  const daysOrder = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const sortedDays = [...(item.workingDays || [])].sort(
    (a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day),
  );

  // Average rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.stars || 0), 0) / reviews.length).toFixed(1)
      : null;

  // Action handlers
  const handleCall = () => {
    if (!item.phoneNumber) return Alert.alert('Info', 'No phone number available');
    Linking.openURL(`tel:${item.phoneNumber}`).catch(() =>
      Alert.alert('Error', 'Unable to open the dialer'),
    );
  };

  const handleWebsite = () => {
    if (!item.websiteUrl) return Alert.alert('Info', 'No website available');
    let url = item.websiteUrl;
    if (!url.startsWith('http')) url = `https://${url}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Unable to open the website'),
    );
  };

  const handleDirections = () => {
    if (item.latitude && item.longitude) {
      navigation.navigate('Main', {
        screen: 'Map',
        params: {latitude: item.latitude, longitude: item.longitude, businessName: item.businessName},
      });
    } else {
      Alert.alert('Error', 'Location coordinates not available');
    }
  };

  // Header background opacity on scroll
  const headerBg = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - 80],
    outputRange: ['transparent', 'rgba(0,0,0,0.6)'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* ── Image Slider ── */}
      <View style={styles.heroContainer}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => String(i)}
          onMomentumScrollEnd={e => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            setActiveImageIndex(idx);
          }}
          renderItem={({item: img}) => (
            <Image
              source={img ? {uri: img} : AppImages.event}
              style={styles.heroImage}
            />
          )}
        />

        {/* Dot Indicators */}
        {images.length > 1 && (
          <View style={styles.dotRow}>
            {images.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === activeImageIndex && styles.dotActive]}
              />
            ))}
          </View>
        )}

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={22} color={AppColors.WHITE} />
        </TouchableOpacity>

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

        {/* Distance (hidden when navigated from search) */}
        {!fromSearch && (
          <View style={styles.distanceBadge}>
            <Ionicons name="location" size={12} color={AppColors.WHITE} />
            <Text style={styles.distanceText}>
              {item.distance < 1000
                ? `${Math.round(item.distance)}m`
                : `${(item.distance / 1000).toFixed(1)}km`}
            </Text>
          </View>
        )}
      </View>

      {/* ── Scrollable Content ── */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: responsiveHeight(5)}}>

        {/* Name + Status */}
        <View style={styles.section}>
          <View style={styles.nameRow}>
            <Text style={styles.businessName} numberOfLines={2}>
              {item.businessName}
            </Text>
            <View style={[styles.statusBadge, {backgroundColor: isOpen ? '#E8F5E9' : '#FFEBEE'}]}>
              <View style={[styles.statusDot, {backgroundColor: isOpen ? '#4CAF50' : '#F44336'}]} />
              <Text style={[styles.statusText, {color: isOpen ? '#4CAF50' : '#F44336'}]}>
                {isOpen ? 'Open' : 'Closed'}
              </Text>
            </View>
          </View>

          {/* Rating summary */}
          {avgRating && (
            <View style={styles.ratingRow}>
              <StarRating rating={parseFloat(avgRating)} size={16} />
              <Text style={styles.ratingValue}>{avgRating}</Text>
              <Text style={styles.ratingCount}>({reviews.length} reviews)</Text>
            </View>
          )}

          {/* Location */}
          {item.locationName ? (
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color={AppColors.GRAY} />
              <Text style={styles.infoText}>{item.locationName}</Text>
            </View>
          ) : null}

          {/* Bio */}
          {item.bio ? (
            <Text style={styles.bio}>{item.bio}</Text>
          ) : null}
        </View>

        {/* ── Action Buttons ── */}
        <View style={styles.actionRow}>
          {item.phoneNumber ? (
            <TouchableOpacity style={styles.actionBtn} onPress={handleCall} activeOpacity={0.7}>
              <View style={styles.actionIcon}>
                <Ionicons name="call" size={20} color={AppColors.BTNCOLOURS} />
              </View>
              <Text style={styles.actionLabel}>Call</Text>
            </TouchableOpacity>
          ) : null}
          {item.websiteUrl ? (
            <TouchableOpacity style={styles.actionBtn} onPress={handleWebsite} activeOpacity={0.7}>
              <View style={styles.actionIcon}>
                <Ionicons name="globe-outline" size={20} color={AppColors.BTNCOLOURS} />
              </View>
              <Text style={styles.actionLabel}>Website</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={styles.actionBtn} onPress={handleDirections} activeOpacity={0.7}>
            <View style={styles.actionIcon}>
              <Ionicons name="navigate" size={20} color={AppColors.BTNCOLOURS} />
            </View>
            <Text style={styles.actionLabel}>Directions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* ── Working Hours ── */}
        {sortedDays.length > 0 && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => setShowAllDays(v => !v)}
              activeOpacity={0.7}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Ionicons name="time-outline" size={20} color={AppColors.BTNCOLOURS} />
                <Text style={styles.sectionTitle}>Working Hours</Text>
              </View>
              <Ionicons
                name={showAllDays ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={AppColors.GRAY}
              />
            </TouchableOpacity>

            {!showAllDays && todayHours ? (
              <View style={styles.todayRow}>
                <Text style={styles.todayLabel}>Today</Text>
                <Text style={styles.todayTime}>
                  {todayHours.startTime} – {todayHours.endTime}
                </Text>
              </View>
            ) : !showAllDays ? (
              <Text style={styles.closedText}>Closed Today</Text>
            ) : null}

            {showAllDays && (
              <View style={styles.allDays}>
                {sortedDays.map((d, i) => (
                  <View
                    key={i}
                    style={[styles.dayRow, d.day === today && styles.todayHighlight]}>
                    <Text style={[styles.dayName, d.day === today && styles.todayDayText]}>
                      {d.day}
                    </Text>
                    {d.isActive ? (
                      <Text style={[styles.dayTime, d.day === today && styles.todayDayText]}>
                        {d.startTime} – {d.endTime}
                      </Text>
                    ) : (
                      <Text style={styles.closedText}>Closed</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.divider} />

        {/* ── Reviews ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={AppColors.BTNCOLOURS} />
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
            </View>
            {reviews.length > 0 && (
              <View style={styles.reviewCountBadge}>
                <Text style={styles.reviewCountText}>{reviews.length}</Text>
              </View>
            )}
          </View>

          <LineBreak space={1.5} />

          {reviewsLoading ? (
            <View style={styles.reviewsLoader}>
              <ActivityIndicator color={AppColors.BTNCOLOURS} />
              <Text style={styles.loadingText}>Loading reviews...</Text>
            </View>
          ) : reviews.length > 0 ? (
            reviews.map((rev, i) => <ReviewItem key={rev._id || i} item={rev} />)
          ) : (
            <View style={styles.emptyReviews}>
              <Ionicons
                name="chatbubble-outline"
                size={responsiveFontSize(6)}
                color={AppColors.LIGHTGRAY}
              />
              <LineBreak space={1} />
              <AppText
                title="No reviews yet"
                textColor={AppColors.LIGHTGRAY}
                textSize={1.6}
                textAlignment="center"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BusinessDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },

  // ─── Hero ───────────────────────────────────────────────
  heroContainer: {
    width: SCREEN_WIDTH,
    height: HEADER_HEIGHT,
    position: 'relative',
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: HEADER_HEIGHT,
    resizeMode: 'cover',
  },
  dotRow: {
    position: 'absolute',
    bottom: 14,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    width: 18,
    backgroundColor: AppColors.WHITE,
  },
  backBtn: {
    position: 'absolute',
    top: responsiveHeight(2),
    left: responsiveWidth(4),
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tierBadge: {
    position: 'absolute',
    top: responsiveHeight(2),
    right: responsiveWidth(4),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  tierText: {
    color: AppColors.WHITE,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
  },
  distanceBadge: {
    position: 'absolute',
    bottom: 14,
    right: responsiveWidth(4),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  distanceText: {
    color: AppColors.WHITE,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
  },

  // ─── Scroll Content ──────────────────────────────────────
  scroll: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  section: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  divider: {
    height: 8,
    backgroundColor: '#F5F5F5',
  },

  // ─── Name / Status ───────────────────────────────────────
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(0.8),
  },
  businessName: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '800',
    color: AppColors.BLACK,
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginTop: 4,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: responsiveHeight(1),
  },
  ratingValue: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.BLACK,
  },
  ratingCount: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.GRAY,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: responsiveHeight(0.8),
  },
  infoText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.GRAY,
    flex: 1,
  },
  bio: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.DARKGRAY,
    lineHeight: 22,
    marginTop: responsiveHeight(0.5),
  },

  // ─── Action Buttons ──────────────────────────────────────
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  actionBtn: {
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F7F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.BTNCOLOURS,
    fontWeight: '600',
  },

  // ─── Working Hours ───────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: AppColors.BLACK,
  },
  todayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(1.2),
    paddingTop: responsiveHeight(1.2),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  todayLabel: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.BLACK,
    fontWeight: '600',
  },
  todayTime: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.BTNCOLOURS,
    fontWeight: '600',
  },
  allDays: {
    marginTop: responsiveHeight(1.2),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: responsiveHeight(1),
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(0.9),
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  todayHighlight: {
    backgroundColor: '#F0F7F0',
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(2),
    borderBottomWidth: 0,
    marginHorizontal: -responsiveWidth(2),
  },
  dayName: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.DARKGRAY,
    fontWeight: '500',
  },
  dayTime: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.GRAY,
  },
  todayDayText: {
    color: AppColors.BTNCOLOURS,
    fontWeight: '700',
  },
  closedText: {
    fontSize: responsiveFontSize(1.4),
    color: '#F44336',
    fontWeight: '500',
    marginTop: responsiveHeight(1),
  },

  // ─── Reviews ─────────────────────────────────────────────
  reviewCountBadge: {
    backgroundColor: AppColors.BTNCOLOURS,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  reviewCountText: {
    color: AppColors.WHITE,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
  },
  reviewCard: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 14,
    padding: responsiveWidth(4),
    marginBottom: responsiveHeight(1.5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  reviewAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F0F0F0',
  },
  reviewMeta: {
    flex: 1,
    marginLeft: 12,
  },
  reviewName: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
    color: AppColors.BLACK,
  },
  reviewDate: {
    fontSize: responsiveFontSize(1.3),
    color: AppColors.LIGHTGRAY,
    marginTop: 2,
  },
  reviewText: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.DARKGRAY,
    lineHeight: 21,
  },
  reviewsLoader: {
    alignItems: 'center',
    paddingVertical: responsiveHeight(3),
    gap: 10,
  },
  loadingText: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.GRAY,
  },
  emptyReviews: {
    alignItems: 'center',
    paddingVertical: responsiveHeight(4),
  },
});
