/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppImages from '../../assets/images/AppImages';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import PhoneInputScreen from '../../components/PhoneInput';

const AccountSettings = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="Account Setting"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={65}
      />
      <LineBreak space={4} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={AppImages.user}
            style={{width: 120, height: 120, position: 'relative'}}
            imageStyle={{borderRadius: 100}}>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColors.WHITE,
                borderRadius: 100,
                position: 'absolute',
                bottom: responsiveHeight(-1),
                right: responsiveWidth(-1),
                elevation: 10,
              }}>
              <AntDesign
                name="plus"
                size={responsiveFontSize(3)}
                color={AppColors.BLACK}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <LineBreak space={8} />

        <View>
          <View>
            <AppText
              title={'Full Name or Username'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Ronald Sustroharjo'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Email Address'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'sustroharjo.ronald@email.com'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Phone Number'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <PhoneInputScreen />
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Location'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />

            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <AppTextInput
                inputPlaceHolder={'Street'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={23}
              />
              <AppTextInput
                inputPlaceHolder={'City'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={23}
              />
              <AppTextInput
                inputPlaceHolder={'State'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={23}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountSettings;
