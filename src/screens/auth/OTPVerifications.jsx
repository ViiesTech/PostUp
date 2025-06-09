/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {useCustomNavigation} from '../../utils/Hooks';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {OtpInput} from 'react-native-otp-entry';

const OTPVerifications = () => {
  const {navigateToRoute} = useCustomNavigation();

  return (
    <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader goBack />
      <LineBreak space={5} />
      <AppText
        title={'Enter Verification Code'}
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
      <View style={{paddingHorizontal: responsiveWidth(6), flex: 1}}>
        <View>
          <OtpInput
            numberOfDigits={4}
            type="numeric"
            focusColor={AppColors.darkBlue}
            onFilled={text => console.log(`OTP is ${text}`)}
            onTextChange={text => console.log(text)}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: AppColors.WHITE,
                borderWidth: 0,
                borderBottomWidth: 3,
                borderRadius: 0,
                borderBottomColor: AppColors.darkBlue,
                width: responsiveWidth(20),
              },
              pinCodeTextStyle: {color: AppColors.darkBlue},
            }}
          />
        </View>

        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View>
            <AppButton
              title={'Submit'}
              textColor={AppColors.WHITE}
              borderRadius={5}
              handlePress={() => navigateToRoute('NewPassword')}
            />
          </View>
        </View>
        <LineBreak space={2} />
      </View>
    </View>
  );
};

export default OTPVerifications;
