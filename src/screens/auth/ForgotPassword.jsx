/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppButton from '../../components/AppButton';
import {useCustomNavigation} from '../../utils/Hooks';
import AppHeader from '../../components/AppHeader';

const ForgotPassword = () => {
  const {navigateToRoute} = useCustomNavigation();
  return (
    <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader goBack />
      <LineBreak space={5} />
      <AppText
        title={'Forgot Password'}
        textColor={AppColors.BLACK}
        textSize={2.5}
        textFontWeight
        textAlignment={'center'}
      />
      <LineBreak space={1} />
      <AppText
        title={'We can help to recover your account'}
        textColor={AppColors.LIGHTGRAY}
        textSize={2}
        textAlignment={'center'}
      />
      <LineBreak space={20} />
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View>
          <AppText
            title={'Enter your Email Address'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Input email address'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
          <LineBreak space={1} />
        </View>

        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View>
            <AppButton
              title={'Next'}
              textColor={AppColors.WHITE}
              borderRadius={5}
              handlePress={() => navigateToRoute('OTPVerifications')}
            />
          </View>
        </View>
        <LineBreak space={2} />
      </View>
    </View>
  );
};

export default ForgotPassword;
