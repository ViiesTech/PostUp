/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveWidth,
  responsiveHeight,
} from '../../utils/Responsive_Dimensions';
import AppHeader from '../../components/AppHeader';
import AppImages from '../../assets/images/AppImages';
import ReviewCard from '../../components/ReviewCard';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useLazyGetReviewsQuery} from '../../redux/services';
import {ShowToast} from '../../utils/Hooks';
import {IMAGE_URL} from '../../redux/constant';

const AllReview = () => {
  const {user} = useSelector(state => state?.persistedData);
  const [activeTab, setActiveTab] = useState('Completed');
  const [getReviews, {data: reviewsData, isLoading, isFetching}] =
    useLazyGetReviewsQuery();
console.log('isFetching',isFetching)
  const fetchReviews = useCallback(
    status => {
      if (user?._id) {
        getReviews({userId: user._id, status: status})
          .unwrap()
          .catch(err => {
            console.error('Error fetching reviews:', err);
            ShowToast(err?.data?.message || 'Failed to fetch reviews');
          });
      }
    },
    [user?._id, getReviews],
  );

  useEffect(() => {
    if (user?._id) {
      fetchReviews(activeTab);
    }
  }, [activeTab, user?._id, fetchReviews]);

  // Refetch reviews when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (user?._id) {
        fetchReviews(activeTab);
      }
    }, [activeTab, user?._id, fetchReviews])
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <AppText
        title={`No ${activeTab.toLowerCase()} reviews yet`}
        textColor={AppColors.GRAY}
        textSize={1.8}
        textAlign="center"
      />
      <LineBreak space={1} />
      <AppText
        title={
          activeTab === 'Completed'
            ? 'Your completed reviews will appear here'
            : 'Your expired reviews will appear here'
        }
        textColor={AppColors.LIGHTGRAY}
        textSize={1.4}
        textAlign="center"
      />
    </View>
  );

  const renderSkeletonLoader = () => (
    <View style={{paddingHorizontal: responsiveWidth(4)}}>
      {[1, 2, 3].map((_, index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonHeader}>
            <View style={styles.skeletonAvatar} />
            <View style={{flex: 1}}>
              <View style={styles.skeletonName} />
              <View style={styles.skeletonTime} />
            </View>
          </View>
          <View style={styles.skeletonStars} />
          <View style={styles.skeletonText} />
          <View style={styles.skeletonTextShort} />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader goBack heading="All Reviews" isCenteredHead={true} />

      <LineBreak space={2} />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Completed' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Completed')}>
          <AppText
            title="Completed"
            textColor={
              activeTab === 'Completed' ? AppColors.WHITE : AppColors.GRAY
            }
            textSize={1.6}
            textFontWeight={activeTab === 'Completed' ? '600' : '400'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Expired' && styles.activeTab]}
          onPress={() => setActiveTab('Expired')}>
          <AppText
            title="Expired"
            textColor={
              activeTab === 'Expired' ? AppColors.WHITE : AppColors.GRAY
            }
            textSize={1.6}
            textFontWeight={activeTab === 'Expired' ? '600' : '400'}
          />
        </TouchableOpacity>
      </View>

      <LineBreak space={2} />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {(isLoading || isFetching) && !reviewsData ? (
          renderSkeletonLoader()
        ) : reviewsData?.data?.length > 0 ? (
          <FlatList
            data={reviewsData.data}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
            renderItem={({item}) => {
              // Extract user image
              const userImage = item?.userId?.image
                ? `${IMAGE_URL}${item.userId.image}`
                : null;

              // Get user name - use userName or email fallback
              const userName = item?.userId?.userName ||
                              item?.userId?.email?.split('@')[0] ||
                              'User';

              // Use `updatedAt` for Completed reviews (fallback to `createdAt`)
              const timeKey = activeTab === 'Completed' ? item?.updatedAt || item?.createdAt : item?.createdAt;
              return (
                <ReviewCard
                  image={userImage || AppImages.event}
                  day={moment(timeKey).fromNow()}
                  desc={item?.message || 'No review message'}
                  name={userName}
                  rating={item?.stars || 0}
                  style={styles.reviewCard}
                />
              );
            }}
            keyExtractor={(item, index) => item?._id || index.toString()}
          />
        ) : (
          renderEmptyState()
        )}
        <LineBreak space={4} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  scrollView: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(4),
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: AppColors.PRIMARY,
  },
  listContent: {
    gap: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
  },
  reviewCard: {
    width: responsiveWidth(92),
  },
  emptyContainer: {
    paddingVertical: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonCard: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 15,
    padding: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skeletonAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  skeletonName: {
    width: '50%',
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 6,
  },
  skeletonTime: {
    width: '30%',
    height: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  skeletonStars: {
    width: '40%',
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonText: {
    width: '100%',
    height: 14,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonTextShort: {
    width: '70%',
    height: 14,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
});

export default AllReview;
