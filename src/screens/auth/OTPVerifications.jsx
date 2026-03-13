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
  const {code, email, id, type, token} = route?.params;
  const {navigateToRoute} = useCustomNavigation();
  const [verifyOTP, {isLoading}] = useVerifyOTPMutation();
  const [OTPCode, setOTPCode] = useState('');
  let signupFlow = type === 'signup';

  const onOTPVerify = async () => {
    if (OTPCode) {
      let data = {
        email: email,
        otp: OTPCode,
      };
      let data2 = {
        token: token,
        otp: OTPCode,
      };
      await verifyOTP(signupFlow ? data2 : data)
        .unwrap()
        .then(res => {
          console.log('otp response ===>', res);
          ShowToast(res.message);
          if (res.success) {
            if (!signupFlow) {
              navigateToRoute('NewPassword', {type: 'reset', id: id});
            } else {
              // navigateToRoute('CreateProfile', {
              //   data: res?.data,
              //   token: res?.token || token,
              // });
            }
          }
        })
        .catch(err => {
          return ShowToast(err?.data?.message || 'Failed to verify OTP');
        });
    } else {
      ShowToast('Please enter your verification code');
    }
  };

  console.log('code:-', code);
  console.log('email:-', email);
  console.log('id:-', id);
  console.log('type:-', type);
  console.log('token:-', token);

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
        title={
          signupFlow
            ? `An email has been sent to your email: ${email}.`
            : 'We can help to recover your account'
        }
        textColor={AppColors.LIGHTGRAY}
        textSize={2}
        textwidth={90}
        textAlignment={'center'}
      />
      <LineBreak space={20} />
      <View style={{paddingHorizontal: responsiveWidth(6), flex: 0.9}}>
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
