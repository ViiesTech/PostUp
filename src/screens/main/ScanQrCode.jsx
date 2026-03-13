import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ScrollView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Vibration} from 'react-native';
import Modal from 'react-native-modal';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ShowToast} from '../../utils/Hooks';
import {
  useScanQRCodeMutation,
  useSubmitReviewMutation,
} from '../../redux/services';
import {useSelector} from 'react-redux';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScanQrCode = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [torch, setTorch] = useState('off');
  const [isScanning, setIsScanning] = useState(true);
  const [scannedData] = useState(null);
  const [showDataModal, setShowDataModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    reviewId: '',
    message: '',
    stars: 0,
    businessName: '',
  });
  const [scanQRCode, {isLoading}] = useScanQRCodeMutation();
  const [submitReview, {isLoading: isSubmittingReview}] =
    useSubmitReviewMutation();
  const {userLocation} = useSelector(state => state?.persistedData);
  console.log('userLocation', userLocation);

  useEffect(() => {
    // Request camera permission on mount
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  

  const onCodeScanned = async codes => {
    if (!isScanning || codes.length === 0) {
      return;
    }

    setIsScanning(false);
    // quick haptic/vibration feedback to confirm detection
    try {
      Vibration.vibrate(60);
    } catch (e) {}
    const code = codes[0];

    console.log('QR Code Type:', code.type);
    console.log('QR Code Value:', code.value);

    let businessName = 'Business'; // Define outside try block

    try {
      // Parse QR code value as JSON
      // Support scanner returning an object (some platforms) or a string
      const rawValue =
        code && typeof code.value === 'string' ? code.value.trim() : code.value;

      // Helper: tolerant JSON parse to fix common QR formatting issues
      const tolerantParse = raw => {
        if (!raw && raw !== 0) return null;
        let s = typeof raw === 'string' ? raw.trim() : raw;

        // If scanner already returned an object, return it
        if (typeof s === 'object') return s;

        // If payload starts with '"data":' (missing outer braces) wrap it
        if (s.startsWith('"data":') || s.startsWith('"data":')) {
          s = '{' + s + '}';
        }

        // Remove trailing commas before } or ] which are invalid in JSON
        s = s.replace(/,\s*(?=[}\]])/g, '');

        // Attempt parse
        return JSON.parse(s);
      };

      console.log('QR Code Value to parse:', rawValue);
      const qrData = tolerantParse(rawValue);
      console.log('Parsed QR Data======', qrData);

      // Extract adminId from data._id
      const adminId = qrData?.data?._id;
      console.log('adminid=====>>><<<<<<', adminId);
      businessName = qrData?.data?.businessName || 'Business';

      if (!adminId) {
        ShowToast('Invalid QR code. This QR code is not from PostUp.');
        setTimeout(() => setIsScanning(true), 2500);
        return;
      }

      console.log('userLocation', userLocation);
      console.log('Business Name:', businessName);

      // Call scanQRCode API
      const payload = {
        adminId: adminId,
        latitude: userLocation?.lat || userLocation?.latitude,
        longitude: userLocation?.long || userLocation?.longitude,
      };

      console.log('API Payload:', payload);
      const response = await scanQRCode(payload).unwrap();
      console.log('API Response:', response);

      if (response.success && response.data) {
        // Extract reviewId from response.data._id
        const reviewId = response.data._id;
        console.log('Review ID:', reviewId);

        // Show review modal
        setReviewData({
          reviewId: reviewId,
          message: '',
          stars: 0,
          businessName: businessName,
        });
        setShowReviewModal(true);
        ShowToast(response.message || 'QR scanned successfully!');
      } else {
        ShowToast(response.message || 'Scan failed');
        setTimeout(() => setIsScanning(true), 2000);
      }
    } catch (error) {
      console.error('QR Scan Error:', error);

      let errorMessage = 'Unable to scan QR code. Please try again.';

      // Check if it's a JSON parsing error (invalid QR format)
      if (error instanceof SyntaxError) {
        ShowToast('Invalid QR code format.');
        setTimeout(() => setIsScanning(true), 2500);
        return;
      }

      // Check if error is "Pending review exists"
      if (
        error?.data?.message === 'Pending review exists' &&
        error?.data?.data?._id
      ) {
        // Extract reviewId from error response
        const reviewId = error.data.data._id;
        console.log('Pending Review ID:', reviewId);

        // Show review modal for pending review (no toast needed)
        setReviewData({
          reviewId: reviewId,
          message: '',
          stars: 0,
          businessName: businessName,
        });
        setShowReviewModal(true);
        return;
      }

      // Handle specific API error messages
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      ShowToast(errorMessage);
      setTimeout(() => setIsScanning(true), 2500);
    }
  };

  const codeScanner = useCodeScanner({
    // restrict to QR only for better performance
    codeTypes: ['qr'],
    onCodeScanned: onCodeScanned,
  });

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('ScanQrCode component mounted');
    console.log('Camera device:', device ? 'Found' : 'Not found');
    console.log('Has permission:', hasPermission);
    console.log('Is scanning:', isScanning);
  }, [device, hasPermission, isScanning]);

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

      console.log('Submit Review Payload:', payload);
      const response = await submitReview(payload).unwrap();
      console.log('Submit Review Response:', response);

      ShowToast(response.message || 'Review submitted successfully!');
      setShowReviewModal(false);

      // Reset review data and re-enable scanning
      setReviewData({
        reviewId: '',
        message: '',
        stars: 0,
        businessName: '',
      });
      setTimeout(() => setIsScanning(true), 500);
    } catch (error) {
      console.error('Submit Review Error:', error);

      let errorMessage = 'Failed to submit review. Please try again.';
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      ShowToast(errorMessage);
    }
  };

  const handleSkipReview = () => {
    setShowReviewModal(false);
    setTimeout(() => setIsScanning(true), 500); // Re-enable scanning after closing modal
  };

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <AppHeader
          heading="Scan QR Code"
          goBack
          isCenteredHead
          textFontWeight
        />
        <View style={styles.errorContainer}>
          <MaterialIcons
            name="camera-alt"
            size={responsiveFontSize(8)}
            color={AppColors.GRAY}
          />
          <LineBreak space={2} />
          <AppText
            title="Camera permission is required"
            textColor={AppColors.BLACK}
            textSize={2}
            textAlign="center"
          />
          <LineBreak space={2} />
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}>
            <AppText
              title="Grant Permission"
              textColor={AppColors.WHITE}
              textSize={1.8}
            />
          </TouchableOpacity>
          <LineBreak space={1} />
          <TouchableOpacity onPress={handleOpenSettings}>
            <AppText
              title="Open Settings"
              textColor={AppColors.PRIMARY}
              textSize={1.6}
              textAlign="center"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <AppHeader
          heading="Scan QR Code"
          goBack
          isCenteredHead
          textFontWeight
        />
        <View style={styles.errorContainer}>
          <ActivityIndicator size="large" color={AppColors.PRIMARY} />
          <LineBreak space={2} />
          <AppText
            title="Loading camera..."
            textColor={AppColors.BLACK}
            textSize={1.8}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        heading="Scan QR Code"
        goBack
        isCenteredHead
        textFontWeight
        isCenteredHeadWidth={60}
      />

      <View style={styles.scannerContainer}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          // lower/higher fps for frameProcessor; tune if needed
          frameProcessorFps={15}
          torch={torch}
        />

        {/* Overlay with instructions */}
        <View style={styles.overlay}>
          <View style={styles.topOverlay}>
            <AppText
              title="Position QR code within the frame"
              textColor={AppColors.WHITE}
              textSize={1.8}
              textAlign="center"
            />
          </View>

          {/* Scanner frame */}
          <View style={styles.scannerFrame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>

          {/* Torch toggle */}
          <TouchableOpacity
            onPress={() => setTorch(prev => (prev === 'on' ? 'off' : 'on'))}
            style={styles.torchButton}
            activeOpacity={0.8}>
            <Ionicons
              name={torch === 'on' ? 'flashlight' : 'flashlight-outline'}
              size={responsiveFontSize(3)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>

          <View style={styles.bottomOverlay}>
            <AppText
              title="Scan to check in and leave a review"
              textColor={AppColors.WHITE}
              textSize={1.6}
              textAlign="center"
            />
          </View>
        </View>
      </View>

      {(isLoading || isSubmittingReview) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={AppColors.PRIMARY} />
          <LineBreak space={2} />
          <AppText
            title={
              isSubmittingReview ? 'Submitting review...' : 'Processing...'
            }
            textColor={AppColors.WHITE}
          />
        </View>
      )}

      {/* Scanned Data Modal */}
      <Modal
        isVisible={showDataModal}
        onBackdropPress={() => {
          setShowDataModal(false);
          setTimeout(() => setIsScanning(true), 500);
        }}
        style={styles.modalStyle}>
        <View style={styles.modalContent}>
          <AppText
            title="Scanned QR Code Data"
            textColor={AppColors.BLACK}
            textSize={2.2}
            textFontWeight
            textAlign="center"
          />
          <LineBreak space={3} />

          <View style={styles.dataContainer}>
            <AppText
              title="Type:"
              textColor={AppColors.BLACK}
              textSize={1.6}
              textFontWeight
            />
            <AppText
              title={scannedData?.type || 'N/A'}
              textColor={AppColors.GRAY}
              textSize={1.6}
            />
            <LineBreak space={2} />

            <AppText
              title="Value:"
              textColor={AppColors.BLACK}
              textSize={1.6}
              textFontWeight
            />
            <AppText
              title={scannedData?.value || 'N/A'}
              textColor={AppColors.GRAY}
              textSize={1.4}
            />
            <LineBreak space={2} />

            <AppText
              title="Full Code Object:"
              textColor={AppColors.BLACK}
              textSize={1.6}
              textFontWeight
            />
            <AppText
              title={scannedData?.rawCode || 'N/A'}
              textColor={AppColors.GRAY}
              textSize={1.2}
            />
          </View>

          <LineBreak space={3} />

          <AppButton
            title="Close"
            borderRadius={10}
            handlePress={() => {
              setShowDataModal(false);
              setTimeout(() => setIsScanning(true), 500);
            }}
          />
        </View>
      </Modal>

      {/* Review Modal */}
      <Modal
        isVisible={showReviewModal}
        onBackdropPress={() => !isSubmittingReview && setShowReviewModal(false)}
        style={styles.modalStyle}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={600}
        animationOutTiming={400}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={400}
        useNativeDriver={true}>
        <View style={styles.modalContent}>
          <ScrollView
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}>
            <AppText
              title={`Review ${reviewData.businessName}`}
              textColor={AppColors.BLACK}
              textSize={2.2}
              textFontWeight
              textAlign="center"
            />
            <LineBreak space={3} />

            {/* Star Rating */}
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                  style={styles.starButton}
                  disabled={isSubmittingReview}>
                  <Ionicons
                    name={star <= reviewData.stars ? 'star' : 'star-outline'}
                    size={responsiveFontSize(4)}
                    color={
                      star <= reviewData.stars ? '#FFD700' : AppColors.GRAY
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>

            <LineBreak space={3} />

            <AppTextInput
              inputPlaceHolder="Share your experience..."
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
              editable={!isSubmittingReview}
            />

            <LineBreak space={3} />

            <AppButton
              title="Submit Review"
              borderRadius={10}
              buttoWidth={80}
              handlePress={handleSubmitReview}
              loading={isSubmittingReview}
            />
            <LineBreak space={1.5} />
            <TouchableOpacity
              onPress={handleSkipReview}
              disabled={isSubmittingReview}>
              <AppText
                title="Skip for now"
                textColor={
                  isSubmittingReview ? AppColors.LIGHTGRAY : AppColors.GRAY
                }
                textSize={1.6}
                textAlign="center"
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.WHITE,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topOverlay: {
    paddingVertical: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  bottomOverlay: {
    paddingVertical: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  scannerFrame: {
    alignSelf: 'center',
    width: responsiveWidth(86),
    height: responsiveWidth(86),
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: AppColors.PRIMARY,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: AppColors.PRIMARY,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: AppColors.PRIMARY,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: AppColors.PRIMARY,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(10),
  },
  permissionButton: {
    backgroundColor: AppColors.PRIMARY,
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(8),
    borderRadius: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  torchButton: {
    position: 'absolute',
    top: responsiveHeight(6),
    right: responsiveWidth(8),
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 20,
    padding: responsiveWidth(5),
    maxHeight: responsiveHeight(70),
    width: responsiveWidth(90),
  },
  modalScrollContent: {
    paddingBottom: responsiveHeight(2),
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
  starButton: {
    padding: responsiveWidth(1),
  },
  dataContainer: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 10,
    padding: responsiveWidth(3),
    borderWidth: 1,
    borderColor: AppColors.GRAY,
  },
});

export default ScanQrCode;
