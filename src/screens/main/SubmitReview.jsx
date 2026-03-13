/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {useSubmitReviewMutation} from '../../redux/services';

const SubmitReview = ({route}) => {
  const {goBackRoute, navigateToRoute} = useCustomNavigation();
  const reviewDataFromRoute = route?.params?.reviewData || {};

  const [reviewData, setReviewData] = useState({
    reviewId: reviewDataFromRoute.reviewId || '',
    message: reviewDataFromRoute.message || '',
    stars: reviewDataFromRoute.stars || 0,
    businessName: reviewDataFromRoute.businessName || 'Business',
  });

  const [submitReview, {isLoading}] = useSubmitReviewMutation();

  const handleStarPress = star => {
    setReviewData(prev => ({...prev, stars: star}));
  };

  const handleSubmitReview = async () => {
    if (!reviewData.stars || reviewData.stars === 0) {
      ShowToast('Please select a rating');
      return;
    }
    if (!reviewData.message.trim()) {
      ShowToast('Please enter a review message');
      return;
    }

    try {
      const payload = {
        reviewId: reviewData.reviewId,
        message: reviewData.message,
        stars: reviewData.stars,
      };

      const response = await submitReview(payload).unwrap();
      console.log('Submit Review Response:', response);

      if (response.success) {
        ShowToast(response.message || 'Review submitted successfully!');
        // Navigate back to home
        navigateToRoute('Home');
      }
    } catch (error) {
      console.log('Submit Review Error:', error);
      if (error?.data?.message) {
        ShowToast(error.data.message);
      } else {
        ShowToast('Failed to submit review. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        heading="Submit Review"
        goBack
        isCenteredHead
        textFontWeight
        isCenteredHeadWidth={60}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LineBreak space={3} />

        <View style={styles.card}>
          <View style={styles.businessHeader}>
            <Ionicons
              name="business"
              size={responsiveFontSize(4)}
              color={AppColors.PRIMARY}
            />
            <LineBreak space={1} />
            <AppText
              title={reviewData.businessName}
              textColor={AppColors.BLACK}
              textSize={2.4}
              textFontWeight
              textAlign="center"
            />
          </View>

          <LineBreak space={4} />

          <AppText
            title="How was your experience?"
            textColor={AppColors.BLACK}
            textSize={1.8}
            textAlign="center"
          />

          <LineBreak space={2} />

          {/* Star Rating */}
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}
                style={styles.starButton}
                activeOpacity={0.7}>
                <Ionicons
                  name={star <= reviewData.stars ? 'star' : 'star-outline'}
                  size={responsiveFontSize(5)}
                  color={star <= reviewData.stars ? '#FFD700' : AppColors.GRAY}
                />
              </TouchableOpacity>
            ))}
          </View>

          <LineBreak space={2} />

          {reviewData.stars > 0 && (
            <AppText
              title={getRatingText(reviewData.stars)}
              textColor={AppColors.PRIMARY}
              textSize={1.8}
              textAlign="center"
              textFontWeight
            />
          )}

          <LineBreak space={4} />

          <AppText
            title="Share your thoughts"
            textColor={AppColors.BLACK}
            textSize={1.8}
          />
          <LineBreak space={1.5} />

          <AppTextInput
            inputPlaceHolder="Tell us about your experience..."
            placeholderTextColor={AppColors.GRAY}
            borderRadius={10}
            inputWidth={70}
            value={reviewData.message}
            onChangeText={text =>
              setReviewData(prev => ({...prev, message: text}))
            }
            multiline
            numberOfLines={3}
            inputHeight={responsiveHeight(2)}
            textAlignVertical="top"
          />

          <LineBreak space={4} />

          <AppButton
            title="Submit Review"
            borderRadius={10}
            buttoWidth={80}
            handlePress={handleSubmitReview}
            loading={isLoading}
          />

          <LineBreak space={2} />
        </View>
      </ScrollView>
    </View>
  );
};

const getRatingText = stars => {
  switch (stars) {
    case 1:
      return 'Poor';
    case 2:
      return 'Fair';
    case 3:
      return 'Good';
    case 4:
      return 'Very Good';
    case 5:
      return 'Excellent';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  scrollContent: {
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(3),
  },
  card: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 15,
    padding: responsiveWidth(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  businessHeader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveWidth(3),
  },
  starButton: {
    padding: responsiveWidth(1),
  },
});

export default SubmitReview;
