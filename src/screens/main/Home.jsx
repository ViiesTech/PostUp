/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import LineBreak from '../../components/LineBreak';
import Feather from 'react-native-vector-icons/Feather';
import AppText from '../../components/AppTextComps/AppText';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppIntroSlider from 'react-native-app-intro-slider';
import AppImages from '../../assets/images/AppImages';
import AppButton from '../../components/AppButton';
import NearByEventsCard from '../../components/NearByEventsCard';
import NearbyBusinessCard from '../../components/NearbyBusinessCard';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {
  useAddOrRemoveToFavMutation,
  useLazyGetAllBannerQuery,
  useLazyGetAllEventQuery,
  useLazyGetNearByBusinessesQuery,
  useLazyGetUserPendingReviewsQuery,
  useLazySearchAdminsQuery,
} from '../../redux/services';
import {useDispatch, useSelector} from 'react-redux';
import {IMAGE_URL} from '../../redux/constant';
import Geolocation from 'react-native-geolocation-service';
import {saveUserLocation} from '../../redux/slices/appSlice';
import {
  getCurrentLocation,
  requestLocationPermission,
} from '../../config/Location';
import PendingReviewCard from '../../components/PendingReviewCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const nearByData = [
//   {
//     id: 1,
//     eventImg: AppImages.event,
//     title: 'Event Name Here',
//     date: '12-15 March, 2025',
//     location: 'Lorem venue, California',
//     likes: '196',
//     comments: '20',
//     shares: '5',
//   },
//   {
//     id: 2,
//     eventImg: AppImages.event,
//     title: 'Event Name Here',
//     date: '12-15 March, 2025',
//     location: 'Lorem venue, California',
//     likes: '196',
//     comments: '20',
//     shares: '5',
//   },
// ];

// const placesData = [
//   {
//     id: 1,
//     eventImg: AppImages.event,
//     title: 'Places Name Here',
//   },
//   {
//     id: 2,
//     eventImg: AppImages.event,
//     title: 'Places Name Here',
//   },
//   {
//     id: 3,
//     eventImg: AppImages.event,
//     title: 'Places Name Here',
//   },
//   {
//     id: 4,
//     eventImg: AppImages.event,
//     title: 'Places Name Here',
//   },
// ];

const Home = ({navigation}) => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    console.log('tttooken', token);
  };
  getToken();
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const {navigateToRoute} = useCustomNavigation();
  const {user, token} = useSelector(state => state?.persistedData);
  console.log('token======<<<<<<>>>>>>>>>>', token);
  const [
    getNearByBusinesses,
    {data: nearByBusinessesData, isLoading: nearByBusinessesLoading},
  ] = useLazyGetNearByBusinessesQuery();
  const [latLng, setLatLng] = useState({
    latitude: null,
    longitude: null,
  });
  const [currentAddress, setCurrentAddress] = useState('Fetching location...');
  const [locationLoading, setLocationLoading] = useState(true);
  let isProfileCompleted = user?.isupdated;
  console.log('latLng====', latLng);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isId, setIsId] = useState(0);

  const [addOrRemoveToFav, {isLoading: favIsLoading}] =
    useAddOrRemoveToFavMutation();
  const [
    getUserPendingReviews,
    {data: pendingReviewsData, isLoading: pendingReviewsLoading},
  ] = useLazyGetUserPendingReviewsQuery();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchAdmins, {data: searchData, isFetching: searchLoading}] =
    useLazySearchAdminsQuery();
  const searchDebounceRef = useRef(null);

  const onSearchChange = text => {
    setSearchQuery(text);
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    if (text.trim().length >= 3) {
      searchDebounceRef.current = setTimeout(() => {
        searchAdmins(text.trim());
      }, 400);
    }
  };

  const onSearchClear = () => {
    setSearchQuery('');
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
  };

  useEffect(() => {
    handleGetLocation();
    // Fetch pending reviews on mount
    getUserPendingReviews();
  }, []);

  // Refetch pending reviews when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      getUserPendingReviews();
    }, [getUserPendingReviews]),
  );

  useEffect(() => {
    if (latLng.latitude && latLng.longitude && !locationLoading) {
      getNearByBusinesses({
        latitude: latLng.latitude,
        longitude: latLng.longitude,
      }).unwrap();
    }
  }, [latLng, locationLoading]);

  // const renderDots = () => (
  //   <View
  //     style={{
  //       flexDirection: 'row',
  //       justifyContent: 'center',
  //     }}>
  //     {bannerData?.data?.map((_, index) => (
  //       <View
  //         key={index}
  //         style={{
  //           width: 8,
  //           height: 8,
  //           borderRadius: 4,
  //           backgroundColor:
  //             index === currentIndex
  //               ? AppColors.BTNCOLOURS
  //               : AppColors.DARKGRAY,
  //           marginHorizontal: responsiveWidth(1),
  //         }}
  //       />
  //     ))}
  //   </View>
  // );

  const renderItem = ({item}) => (
    <View>
      <LineBreak space={2} />
      <ImageBackground
        source={{uri: `${IMAGE_URL}${item.banner}`}}
        style={{
          height: responsiveHeight(25),
          width: responsiveWidth(100),
          paddingHorizontal: responsiveWidth(5),
          justifyContent: 'center',
        }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        />
        <AppText
          title={item.businessName}
          textColor={AppColors.WHITE}
          textSize={3}
          textFontWeight
          lineHeight={4}
          textwidth={40}
        />
        <LineBreak space={1.5} />
        <AppText
          title={item.description}
          textColor={AppColors.WHITE}
          textSize={1.5}
          lineHeight={2.5}
          textwidth={60}
        />
      </ImageBackground>
      <LineBreak space={2} />
    </View>
  );

  // const handleFetchEvents = async () => {
  //   await getAllEvent()
  //     .unwrap()
  //     .then(res => {
  //       if (!res.success) {
  //         ShowToast(res.message);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       ShowToast(
  //         err.error ||
  //           err?.error?.response?.data?.message ||
  //           'Failed to fetch events',
  //       );
  //     });
  // };

  // const handleFetchBanners = async () => {
  //   await getAllBanner()
  //     .unwrap()
  //     .then(res => {
  //       console.log('res in getAllBanner:-', res);
  //     })
  //     .catch(err => {
  //       console.log('err in getAllBanner:-', err);
  //       ShowToast(
  //         err.error ||
  //           err?.error?.response?.data?.message ||
  //           'Failed to fetch banners',
  //       );
  //     });
  // };

  // const handleAddToFav = async id => {
  //   const bodyData = {
  //     userId: user?._id,
  //     eventId: id,
  //   };

  //   setIsId(id);

  //   await addOrRemoveToFav(bodyData)
  //     .unwrap()
  //     .then(res => {
  //       console.log(res);
  //       if (res.success) {
  //         ShowToast(res.message);
  //       } else {
  //         ShowToast(res.message);
  //       }
  //     })
  //     .catch(err => {
  //       ShowToast(
  //         err.error ||
  //           err?.error?.response?.data?.message ||
  //           'Failed to Add To favorite',
  //       );
  //     });
  // };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=14`,
        {
          headers: {
            'User-Agent': 'PostUpApp/1.0 (contact@postup.com)',
            Accept: 'application/json',
            'Accept-Language': 'en',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data && data.address) {
        const {road, suburb, city, town, village, state, country} =
          data.address;
        // Build a short readable address: road/area + city
        const area = road || suburb || '';
        const place = city || town || village || state || '';
        if (area && place) return `${area}, ${place}`;
        if (place) return place;
        if (data.display_name) return data.display_name;
      }

      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (error) {
      console.log('Error getting address:', error);
      // Fall back to showing coordinates instead of an error string
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  };

  const handleGetLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      try {
        setLocationLoading(true);
        let location = await getCurrentLocation();
        console.log('location:-----', location);

        if (location && location.lat && location.long) {
          setLatLng({
            latitude: location.lat,
            longitude: location.long,
          });
          dispatch(saveUserLocation(location));

          // Get address from coordinates
          const address = await getAddressFromCoordinates(
            location.lat,
            location.long,
          );
          setCurrentAddress(address);
        }
        setLocationLoading(false);
      } catch (error) {
        console.log('Error getting location in Home:', error);
        setCurrentAddress('Unable to fetch location');
        setLocationLoading(false);
      }
    } else {
      console.log('Permission denied');
      ShowToast('Permission denied');
      setCurrentAddress('Location permission denied');
      setLocationLoading(false);
    }
  };

  console.log('isProfileCompleted:-', isProfileCompleted);
  // console.log('user in Home:-', user?.isupdated);

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <View style={{paddingHorizontal: responsiveWidth(5)}}>
        <LineBreak space={2} />

        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <AppTextInput
            inputPlaceHolder={'Search businesses...'}
            placeholderTextColor={AppColors.GRAY}
            containerBg={AppColors.WHITE}
            borderRadius={5}
            inputWidth={62}
            value={searchQuery}
            onChangeText={onSearchChange}
            rightIcon={
              searchQuery.length > 0 ? (
                <TouchableOpacity
                  onPress={onSearchClear}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                  <Feather
                    name="x"
                    size={responsiveFontSize(2.2)}
                    color={AppColors.GRAY}
                  />
                </TouchableOpacity>
              ) : (
                <Feather
                  name="search"
                  size={responsiveFontSize(2.2)}
                  color={AppColors.GRAY}
                />
              )
            }
          />
          <TouchableOpacity
            onPress={() => navigateToRoute('ScanQrCode')}
            style={{
              borderColor: AppColors.GRAY,
              borderWidth: 1,
              width: 55,
              height: 52,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: '#FFD700',
            }}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={responsiveFontSize(3.5)}
              color={AppColors.BTNCOLOURS}
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={2} />

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <Octicons
                name="location"
                size={responsiveFontSize(3)}
                color={AppColors.BLACK}
              />
              <View style={{}}>
                <AppText
                  title={'My Current Location'}
                  textColor={AppColors.GRAY}
                  textSize={1.6}
                />
                {/* {locationLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={AppColors.BTNCOLOURS}
                  />
                ) : ( */}
                <AppText
                  title={currentAddress}
                  textwidth={70}
                  textColor={AppColors.BLACK}
                  textSize={1.4}
                  numberOfLines={2}
                />
                {/* // )} */}
              </View>
            </View>
            <TouchableOpacity onPress={() => navigateToRoute('Notifications')}>
              <MaterialCommunityIcons
                name="bell-badge-outline"
                size={responsiveFontSize(3)}
                color={AppColors.BLACK}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <View>
        {bannerData?.data?.length === 0 ? (
          <View style={{marginTop: responsiveHeight(4)}}>
            <AppText
              title={'Banner Not Found'}
              textFontWeight
              textSize={2}
              textAlignment={'center'}
              textColor={AppColors.BLACK}
            />
          </View>
        ) : bannerLoading ? (
          <View style={{marginTop: responsiveHeight(4)}}>
            <ActivityIndicator color={AppColors.lowGreen} size={'large'} />
          </View>
        ) : (
          <AppIntroSlider
            ref={sliderRef}
            data={!!bannerData?.data?.length ? bannerData?.data : []}
            renderItem={renderItem}
            onSlideChange={index => setCurrentIndex(index)}
            showNextButton={false}
            showSkipButton={false}
            showDoneButton={false}
            dotStyle={{display: 'none'}}
            activeDotStyle={{display: 'none'}}
          />
        )}
        {!!bannerData?.data?.length ? renderDots() : null}
      </View> */}

      {/* Pending Reviews Section */}
      {pendingReviewsData?.data?.length > 0 && (
        <>
          <LineBreak space={3} />
          <View style={{paddingHorizontal: responsiveWidth(5)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <AppText
                title={'Pending Reviews'}
                textColor={AppColors.BLACK}
                textSize={2.5}
                textFontWeight
              />
              <View
                style={{
                  backgroundColor: AppColors.ORANGE,
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveHeight(0.5),
                  borderRadius: 12,
                }}>
                <AppText
                  title={pendingReviewsData.data.length.toString()}
                  textColor={AppColors.WHITE}
                  textSize={1.4}
                  textFontWeight
                />
              </View>
            </View>

            <LineBreak space={2} />

            {pendingReviewsLoading ? (
              <View>
                {[1, 2, 3].map((_, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: AppColors.WHITE,
                      borderRadius: 15,
                      padding: responsiveWidth(4),
                      marginBottom: responsiveHeight(2),
                      borderWidth: 1,
                      borderColor: '#E8E8E8',
                    }}>
                    {/* Shimmer effect for business name */}
                    <View
                      style={{
                        width: '60%',
                        height: 18,
                        backgroundColor: '#E0E0E0',
                        borderRadius: 4,
                        marginBottom: 10,
                      }}
                    />
                    {/* Shimmer effect for date */}
                    <View
                      style={{
                        width: '40%',
                        height: 14,
                        backgroundColor: '#F0F0F0',
                        borderRadius: 4,
                        marginBottom: 12,
                      }}
                    />
                    {/* Shimmer effect for button */}
                    <View
                      style={{
                        width: '100%',
                        height: 45,
                        backgroundColor: '#E0E0E0',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <View>
                {pendingReviewsData?.data
                  ?.filter(review => review.status !== 'Expired')
                  ?.slice(0, 3)
                  ?.map((review, index) => (
                    <PendingReviewCard
                      key={review._id || index}
                      item={review}
                      onPress={() =>
                        navigateToRoute('SubmitReview', {
                          reviewData: {
                            reviewId: review._id,
                            message: '',
                            stars: 0,
                            businessName:
                              review?.adminId?.businessName || 'Business',
                          },
                        })
                      }
                    />
                  ))}
              </View>
            )}
          </View>
        </>
      )}

      <LineBreak space={4} />

      {searchQuery.trim().length >= 3 ? (
        // ── Search Results ────────────────────────────────────────────
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(5),
            }}>
            <AppText
              title={`Results for "${searchQuery}"`}
              textColor={AppColors.BLACK}
              textSize={2.2}
              textFontWeight
            />
            {!searchLoading && searchData?.data && (
              <AppText
                title={`${searchData.data.length} found`}
                textColor={AppColors.GRAY}
                textSize={1.5}
              />
            )}
          </View>

          {searchLoading ? (
            <View
              style={{
                paddingVertical: responsiveHeight(5),
                paddingHorizontal: responsiveWidth(5),
              }}>
              <ActivityIndicator color={AppColors.BTNCOLOURS} size="large" />
              <LineBreak space={2} />
              <AppText
                title={'Searching...'}
                textSize={1.5}
                textAlignment={'center'}
                textColor={AppColors.GRAY}
              />
            </View>
          ) : searchData?.data?.length === 0 ? (
            <View
              style={{
                paddingVertical: responsiveHeight(5),
                paddingHorizontal: responsiveWidth(5),
              }}>
              <Ionicons
                name="search-outline"
                size={responsiveFontSize(8)}
                color={AppColors.LIGHTGRAY}
                style={{alignSelf: 'center'}}
              />
              <LineBreak space={2} />
              <AppText
                title={`No businesses found for "${searchQuery}"`}
                textFontWeight
                textSize={2}
                textAlignment={'center'}
                textColor={AppColors.GRAY}
              />
              <LineBreak space={1} />
              <AppText
                title={'Try a different name or keyword'}
                textSize={1.5}
                textAlignment={'center'}
                textColor={AppColors.LIGHTGRAY}
              />
            </View>
          ) : (
            <FlatList
              data={searchData?.data}
              scrollEnabled={false}
              keyExtractor={item => item._id}
              contentContainerStyle={{
                paddingBottom: responsiveHeight(2),
                paddingHorizontal: responsiveWidth(5),
                // alignItems: 'center',
              }}
              renderItem={({item}) => (
                <NearbyBusinessCard
                  item={item}
                  onPress={() => {}}
                  cardWidth={responsiveWidth(78)}
                  showDistance={false}
                />
              )}
            />
          )}
        </View>
      ) : (
        // ── Nearby Places ─────────────────────────────────────────────
        <>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: responsiveWidth(5),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AppText
              title={'Nearby Places'}
              textColor={AppColors.BLACK}
              textSize={2.5}
              textFontWeight
            />
          </View>
          <LineBreak space={2} />

          <View>
            {nearByBusinessesData?.data?.length === 0 ? (
              <View style={{marginVertical: responsiveHeight(5)}}>
                <Ionicons
                  name="business-outline"
                  size={responsiveFontSize(8)}
                  color={AppColors.LIGHTGRAY}
                  style={{alignSelf: 'center'}}
                />
                <LineBreak space={2} />
                <AppText
                  title={'No Businesses Found Nearby'}
                  textFontWeight
                  textSize={2}
                  textAlignment={'center'}
                  textColor={AppColors.GRAY}
                />
                <LineBreak space={1} />
                <AppText
                  title={'Try adjusting your location or check back later'}
                  textSize={1.5}
                  textAlignment={'center'}
                  textColor={AppColors.LIGHTGRAY}
                />
              </View>
            ) : nearByBusinessesLoading ? (
              <View style={{marginVertical: responsiveHeight(5)}}>
                <ActivityIndicator
                  color={AppColors.BTNCOLOURS}
                  size={'large'}
                />
                <LineBreak space={2} />
                <AppText
                  title={'Finding businesses near you...'}
                  textSize={1.5}
                  textAlignment={'center'}
                  textColor={AppColors.GRAY}
                />
              </View>
            ) : (
              <FlatList
                data={nearByBusinessesData?.data}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: responsiveWidth(5),
                  paddingBottom: responsiveHeight(2),
                  gap: responsiveWidth(3),
                }}
                renderItem={({item}) => (
                  <NearbyBusinessCard
                    item={item}
                    onPress={() => {}}
                    cardWidth={responsiveWidth(78)}
                  />
                )}
                keyExtractor={item => item._id}
              />
            )}
          </View>
        </>
      )}

      <LineBreak space={4} />

      {/* <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(5),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <AppText
            title={'Nearby Places'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />
          <TouchableOpacity>
            <AppText
              title={'See All'}
              textColor={AppColors.LIGHTGRAY}
              textSize={1.5}
              borderBottomWidth={1}
              borderBottomColor={AppColors.LIGHTGRAY}
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={2} />

        <FlatList
          data={placesData}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<LineBreak space={10} />}
          contentContainerStyle={{gap: 15, paddingLeft: responsiveWidth(5)}}
          renderItem={({item}) => {
            return (
              <View>
                <Image
                  source={item.eventImg}
                  style={{width: 130, height: 130, borderRadius: 10}}
                />
                <LineBreak space={1} />
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={1.4}
                  textFontWeight
                  textAlignment={'center'}
                />
              </View>
            );
          }}
        /> */}

      {/* <LineBreak space={7} /> */}

      {/* <View style={{alignItems: 'center'}}>
          <AppButton
            title={'PostUp'}
            borderRadius={5}
            handlePress={() => navigateToRoute('LocationSelection')}
          />
        </View> */}

      {/* <LineBreak space={4} /> */}
    </ScrollView>
  );
};

export default Home;
