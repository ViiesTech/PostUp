import React, {useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppButton from '../../components/AppButton';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import AppHeader from '../../components/AppHeader';
import {useForgetPasswordMutation} from '../../redux/services';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const {navigateToRoute} = useCustomNavigation();

  const [forgetPassword, {isLoading}] = useForgetPasswordMutation();

  const onNextPress = async () => {
    if (!email) {
      return ShowToast('Please enter your email');
    } else {
      let data = {
        email: email,
      };
      await forgetPassword(data)
        .unwrap()
        .then(res => {
          console.log('send otp response =====>', res);
          ShowToast(res.message);
          if (res.success) {
            navigateToRoute('OTPVerifications', {
              code: res.data.Otp,
              email: res.data.email,
              id: res.data._id,
            });
          }
        })
        .catch(error => {
          console.log('failed to send otp on email ====>', error);
          ShowToast('Some problem occured');
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: AppColors.WHITE}}
      behavior="height">
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
              value={email}
              onChangeText={setEmail}
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
                loading={isLoading}
                handlePress={() => onNextPress()}
              />
            </View>
          </View>
          <LineBreak space={2} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
