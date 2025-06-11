/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
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
import {useCustomNavigation} from '../../utils/Hooks';

const nearByData = [
  {
    id: 1,
    eventImg: AppImages.event,
    title: 'Event Name Here',
    date: '12-15 March, 2025',
    location: 'Lorem venue, California',
    likes: '196',
    comments: '20',
    shares: '5',
  },
  {
    id: 2,
    eventImg: AppImages.event,
    title: 'Event Name Here',
    date: '12-15 March, 2025',
    location: 'Lorem venue, California',
    likes: '196',
    comments: '20',
    shares: '5',
  },
];

const placesData = [
  {
    id: 1,
    eventImg: AppImages.event,
    title: 'Places Name Here',
  },
  {
    id: 2,
    eventImg: AppImages.event,
    title: 'Places Name Here',
  },
  {
    id: 3,
    eventImg: AppImages.event,
    title: 'Places Name Here',
  },
  {
    id: 4,
    eventImg: AppImages.event,
    title: 'Places Name Here',
  },
];

const Home = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {navigateToRoute} = useCustomNavigation();

  const slides = [
    {
      key: 1,
      title: 'One Quality The Highest',
      subTitle:
        'The gold standard in music licensing. for all content creators',
      image: AppImages.banner,
    },
    {
      key: 2,
      title: 'One Quality The Highest',
      subTitle:
        'The gold standard in music licensing. for all content creators',
      image: AppImages.banner,
    },
    {
      key: 3,
      title: 'One Quality The Highest',
      subTitle:
        'The gold standard in music licensing. for all content creators',
      image: AppImages.banner,
    },
    {
      key: 4,
      title: 'One Quality The Highest',
      subTitle:
        'The gold standard in music licensing. for all content creators',
      image: AppImages.banner,
    },
  ];

  const renderDots = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      {slides.map((_, index) => (
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
        source={item.image}
        style={{
          height: responsiveHeight(25),
          width: responsiveWidth(100),
          paddingHorizontal: responsiveWidth(5),
          justifyContent: 'center',
        }}>
        <AppText
          title={item.title}
          textColor={AppColors.WHITE}
          textSize={3}
          textFontWeight
          lineHeight={4}
          textwidth={40}
        />
        <LineBreak space={1.5} />
        <AppText
          title={item.subTitle}
          textColor={AppColors.WHITE}
          textSize={1.5}
          lineHeight={2.5}
          textwidth={60}
        />
      </ImageBackground>
      <LineBreak space={2} />
    </View>
  );

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
            onPress={() => {}}
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
            <MaterialCommunityIcons
              name="bell-badge-outline"
              size={responsiveFontSize(3)}
              color={AppColors.BLACK}
            />
          </View>
        </View>
      </View>

      <View>
        <AppIntroSlider
          ref={sliderRef}
          data={slides}
          renderItem={renderItem}
          onSlideChange={index => setCurrentIndex(index)}
          showNextButton={false}
          showSkipButton={false}
          showDoneButton={false}
          dotStyle={{display: 'none'}}
          activeDotStyle={{display: 'none'}}
        />
        {renderDots()}
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

      <View>
        <FlatList
          data={nearByData}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<LineBreak space={10} />}
          contentContainerStyle={{gap: 15, paddingLeft: responsiveWidth(5)}}
          renderItem={({item}) => {
            return (
              <NearByEventsCard
                item={item}
                viewDetailsHandleOnPress={() => navigateToRoute('EventDetails')}
              />
            );
          }}
        />

        <LineBreak space={4} />

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
        />

        <LineBreak space={7} />

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
