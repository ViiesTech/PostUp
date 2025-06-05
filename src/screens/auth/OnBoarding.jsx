/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import Feather from 'react-native-vector-icons/Feather';

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const navigation = useNavigation();

  const slides = [
    {
      key: 1,
      text: 'Talk to people “Live” at places and get the scoop when they PostUp',
      image: AppImages.stepOne,
    },
    {
      key: 2,
      text: 'PostUp gives you the lowdown on What’s Hot or What’s Not at places, locations, events, organizations, towns, cities and more',
      image: AppImages.stepTwo,
    },
    {
      key: 3,
      text: 'Discover new places to PostUp at',
      image: AppImages.stepThree,
    },
    {
      key: 4,
      text: 'Linkup with friends, connect with new people, discover potential dates, get intel about places to PostUp',
      image: AppImages.stepFour,
    },
  ];

  const renderDots = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: responsiveHeight(3),
      }}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              index === currentIndex ? AppColors.darkBlue : AppColors.DARKGRAY,
            marginHorizontal: responsiveWidth(1),
          }}
        />
      ))}
    </View>
  );

  const renderItem = ({item}) => (
    <View>
      <LineBreak space={2} />
      <Image
        source={item.image}
        style={{
          height: responsiveHeight(50),
          width: responsiveWidth(90),
          alignSelf: 'center',
          resizeMode: 'cover',
        }}
      />
      <LineBreak space={7} />
      <AppText
        title={item.text}
        textColor={AppColors.BLACK}
        textSize={2.5}
        textwidth={item.key === 1 ? 60 : item.key === 2 ? 72 : item.key === 3 ? 65 : 70}
        textFontWeight
        textAlignment={'center'}
      />
      <LineBreak space={7} />
    </View>
  );

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      sliderRef.current?.goToSlide(currentIndex + 1, true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sliderRef.current?.goToSlide(currentIndex - 1, true);
    }
  };

  const handleDone = () => {
    navigation.replace('Login');
  };

  const renderCustomButtons = () => {
    if (currentIndex === 0) {
      return (
        <View
          style={{
            paddingVertical: responsiveHeight(3),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              width: 50,
              height: 50,
            }}
          />
          {renderDots()}
          <TouchableOpacity
            onPress={() => handleNext()}
            style={{
              backgroundColor: AppColors.BTNCOLOURS,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (currentIndex === 1) {
      return (
        <View
          style={{
            paddingVertical: responsiveHeight(3),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => handlePrev()}
            style={{
              borderWidth: 1,
              borderColor: AppColors.PEACHCOLOUR,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              elevation: 10,
              backgroundColor: AppColors.WHITE,
            }}>
            <Feather
              name="arrow-left"
              size={responsiveFontSize(4)}
              color={AppColors.BLACK}
            />
          </TouchableOpacity>
          {renderDots()}
          <TouchableOpacity
            onPress={() => handleNext()}
            style={{
              backgroundColor: AppColors.BTNCOLOURS,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (currentIndex === 2) {
      return (
        <View
          style={{
            paddingVertical: responsiveHeight(3),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => handlePrev()}
            style={{
              borderWidth: 1,
              borderColor: AppColors.PEACHCOLOUR,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              elevation: 10,
              backgroundColor: AppColors.WHITE,
            }}>
            <Feather
              name="arrow-left"
              size={responsiveFontSize(4)}
              color={AppColors.BLACK}
            />
          </TouchableOpacity>
          {renderDots()}
          <TouchableOpacity
            onPress={() => handleNext()}
            style={{
              backgroundColor: AppColors.BTNCOLOURS,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (currentIndex === 3) {
      return (
        <View
          style={{
            paddingVertical: responsiveHeight(3),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => handlePrev()}
            style={{
              borderWidth: 1,
              borderColor: AppColors.PEACHCOLOUR,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              elevation: 10,
              backgroundColor: AppColors.WHITE,
            }}>
            <Feather
              name="arrow-left"
              size={responsiveFontSize(4)}
              color={AppColors.BLACK}
            />
          </TouchableOpacity>
          {renderDots()}
          <TouchableOpacity
            onPress={() => handleDone()}
            style={{
              backgroundColor: AppColors.BTNCOLOURS,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Feather
              name="arrow-right"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };
  return (
    <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={renderItem}
        onSlideChange={index => setCurrentIndex(index)}
        showNextButton={false}
        showSkipButton={false}
        showDoneButton={false}
        dotStyle={{display: 'none'}}
      />
      {renderCustomButtons()}
    </View>
  );
};

export default OnBoarding;
