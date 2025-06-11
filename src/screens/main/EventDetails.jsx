/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppHeader from '../../components/AppHeader';

const EventDetails = () => {
  return (
    <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <ImageBackground
        source={AppImages.event}
        style={{
          height: responsiveHeight(50),
        }}
        imageStyle={{
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
        }}>
        <AppHeader goBack arrowWhite />
      </ImageBackground>
    </View>
  );
};

export default EventDetails;
