import React, {useState} from 'react';
import {View} from 'react-native';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppButton from '../../components/AppButton';
import {OtpInput} from 'react-native-otp-entry';
import {useVerifyOTPMutation} from '../../redux/services';

const OTPVerifications = ({route}) => {
  const {code, email,id} = route?.params;
  const {navigateToRoute} = useCustomNavigation();
  const [verifyOTP, {isLoading}] = useVerifyOTPMutation();
  const [OTPCode, setOTPCode] = useState('');

  // console.log('data', code, email);

  const onOTPVerify = async () => {
    if (OTPCode) {
      let data = {
        email: email,
        Otp: code,
      };
      await verifyOTP(data)
        .unwrap()
        .then(res => {
          console.log('otp response ===>', res);
          ShowToast(res.message);
          if (res.success) {
            navigateToRoute('NewPassword', {type: 'reset',id: id});
          }
        });
    } else {
      ShowToast('Please enter your verification code');
    }
  };

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
            numberOfDigits={6}
            // textInputProps={{value: OTPCode,onChangeText: (text) => setOTPCode(text)}}
            type="numeric"
            focusColor={AppColors.darkBlue}
            onFilled={text => setOTPCode(text)}
            onTextChange={text => setOTPCode(text)}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: AppColors.WHITE,
                borderWidth: 0,
                borderBottomWidth: 3,
                borderRadius: 0,
                borderBottomColor: AppColors.darkBlue,
                width: responsiveWidth(10),
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
              loading={isLoading}
              textColor={AppColors.WHITE}
              borderRadius={5}
              handlePress={onOTPVerify}
            />
          </View>
        </View>
        <LineBreak space={2} />
      </View>
    </View>
  );
};

export default OTPVerifications;
