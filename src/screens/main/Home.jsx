/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppIntroSlider from 'react-native-app-intro-slider';
import AppImages from '../../assets/images/AppImages';
import AppButton from '../../components/AppButton';
import NearByEventsCard from '../../components/NearByEventsCard';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {
  useAddOrRemoveToFavMutation,
  useLazyGetAllBannerQuery,
  useLazyGetAllEventQuery,
} from '../../redux/services';
import {useDispatch, useSelector} from 'react-redux';
import {IMAGE_URL} from '../../redux/constant';
import Geolocation from 'react-native-geolocation-service';
import {saveUserLocation} from '../../redux/slices/appSlice';
import {
  getCurrentLocation,
  requestLocationPermission,
} from '../../config/Location';

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
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const {navigateToRoute} = useCustomNavigation();
  const {user} = useSelector(state => state?.persistedData);
  let isProfileCompleted = user?.isupdated;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isId, setIsId] = useState(0);

  const [getAllEvent, {data, isLoading}] = useLazyGetAllEventQuery();
  const [getAllBanner, {data: bannerData, isLoading: bannerLoading}] =
    useLazyGetAllBannerQuery();
  const [addOrRemoveToFav, {isLoading: favIsLoading}] =
    useAddOrRemoveToFavMutation();

  useEffect(() => {
    handleFetchEvents(user?._id);
    handleFetchBanners();
    handleGetLocation();
  }, [user?._id]);

  const renderDots = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      {bannerData?.data?.map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              index === currentIndex
                ? AppColors.BTNCOLOURS
                : AppColors.DARKGRAY,
            marginHorizontal: responsiveWidth(1),
          }}
        />
      ))}
    </View>
  );

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

  const handleFetchEvents = async () => {
    await getAllEvent()
      .unwrap()
      .then(res => {
        if (!res.success) {
          ShowToast(res.message);
        }
      })
      .catch(err => {
        console.log(err);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to fetch events',
        );
      });
  };

  const handleFetchBanners = async () => {
    await getAllBanner()
      .unwrap()
      .then(res => {
        console.log('res in getAllBanner:-', res);
      })
      .catch(err => {
        console.log('err in getAllBanner:-', err);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to fetch banners',
        );
      });
  };

  const handleAddToFav = async id => {
    const bodyData = {
      userId: user?._id,
      eventId: id,
    };

    setIsId(id);

    await addOrRemoveToFav(bodyData)
      .unwrap()
      .then(res => {
        console.log(res);
        if (res.success) {
          ShowToast(res.message);
        } else {
          ShowToast(res.message);
        }
      })
      .catch(err => {
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to Add To favorite',
        );
      });
  };

  const handleGetLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      try {
        let location = await getCurrentLocation();
        console.log('location:-----', location);
        dispatch(saveUserLocation(location));
      } catch (error) {
        console.log('Error getting location in Home:', error);
      }
    } else {
      console.log('Permission denied');
      ShowToast('Permission denied');
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
            inputPlaceHolder={'Search...'}
            placeholderTextColor={AppColors.GRAY}
            containerBg={AppColors.WHITE}
            borderRadius={5}
            inputWidth={70}
          />
          <TouchableOpacity
            onPress={() => navigateToRoute('Settings')}
            style={{
              borderColor: AppColors.GRAY,
              borderWidth: 1,
              width: 55,
              height: 52,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              name="settings"
              size={responsiveFontSize(3.5)}
              color={AppColors.GRAY}
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
              <View>
                <AppText
                  title={'My Current Location'}
                  textColor={AppColors.GRAY}
                  textSize={1.6}
                />
                <AppText
                  title={'6543 Chestnut Court, Boston, MA 02101'}
                  textColor={AppColors.BLACK}
                  textSize={1.6}
                />
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

      <View>
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
      </View>

      <LineBreak space={4} />

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: responsiveWidth(5),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <AppText
          title={'Nearby Events'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
        {/* <TouchableOpacity>
          <AppText
            title={'See All'}
            textColor={AppColors.LIGHTGRAY}
            textSize={1.5}
            borderBottomWidth={1}
            borderBottomColor={AppColors.LIGHTGRAY}
          />
        </TouchableOpacity> */}
      </View>
      <LineBreak space={2} />

      <View>
        {data?.data?.length === 0 ? (
          <AppText
            title={'Events Not Found'}
            textFontWeight
            textSize={2}
            textAlignment={'center'}
            textColor={AppColors.BLACK}
          />
        ) : isLoading ? (
          <ActivityIndicator color={AppColors.lowGreen} size={'large'} />
        ) : (
          <FlatList
            data={data?.data}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<LineBreak space={10} />}
            contentContainerStyle={{gap: 15, paddingLeft: responsiveWidth(5)}}
            renderItem={({item}) => {
              return (
                <NearByEventsCard
                  item={item}
                  home={'home'}
                  addToFavLoading={favIsLoading && isId === item?._id}
                  handleAddToFav={() => handleAddToFav(item?._id)}
                  viewDetailsHandleOnPress={() =>
                    navigateToRoute('EventDetails', {eventId: item?._id})
                  }
                />
              );
            }}
          />
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

        <View style={{alignItems: 'center'}}>
          <AppButton
            title={'PostUp'}
            borderRadius={5}
            handlePress={() => navigateToRoute('LocationSelection')}
          />
        </View>

        <LineBreak space={4} />
      </View>
    </ScrollView>
  );
};

export default Home;
