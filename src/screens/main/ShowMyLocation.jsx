/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppColors from '../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppTextComps/AppText';
import AppButton from '../../components/AppButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useCustomNavigation} from '../../utils/Hooks';

const ShowMyLocation = () => {
  const {navigateToRoute} = useCustomNavigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="Show My Location"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={68}
      />
      <LineBreak space={3} />

      <View style={{paddingHorizontal: responsiveWidth(5)}}>
        <ImageBackground
          source={AppImages.full_map}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(85),
            paddingVertical: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(8),
            alignSelf: 'center',
            alignItems: 'flex-end',
          }}
          resizeMode="contain">
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: AppColors.appBgColor,
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1),
                borderRadius: 20,
                borderWidth: 1,
                borderColor: AppColors.DARKGRAY,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <AppText
                title={'1 mile'}
                textColor={AppColors.BLACK}
                textSize={1.5}
              />
              <Entypo
                name="chevron-small-down"
                size={responsiveFontSize(2)}
                color={AppColors.BLACK}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateToRoute('AllowAccess')}
              style={{
                backgroundColor: AppColors.darkYellow,
                width: 40,
                height: 40,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={responsiveFontSize(2.7)}
                color={AppColors.WHITE}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <LineBreak space={3} />
        <AppButton
          title={'Save Location'}
          borderRadius={5}
          handlePress={() => {}}
        />
        <LineBreak space={2} />
      </View>
    </ScrollView>
  );
};

export default ShowMyLocation;
