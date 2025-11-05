import React, {useState} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppButton from '../../components/AppButton';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import AppHeader from '../../components/AppHeader';
import {usePasswordOptionsMutation} from '../../redux/services';

const NewPassword = ({route}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {navigateToRoute} = useCustomNavigation();
  const [passwordOptions, {isLoading}] = usePasswordOptionsMutation();
  const {id, type} = route?.params;

  const onConfirm = async () => {
    if (type === 'change' && !oldPassword) {
      return ShowToast('Please enter your current password');
    }

    if (!newPassword) {
      return ShowToast('Please enter your new password');
    }

    if (newPassword.length < 8) {
      return ShowToast('Your new password is too weak');
    }

    if (!confirmPassword) {
      return ShowToast('Please re type your password to confirm');
    }

    if (confirmPassword !== newPassword) {
      return ShowToast(`Password doesn't match`);
    }

    const data = {
      id,
      type: type,
      ...(type === 'change' ? {oldPassword} : {}),
      newPassword,
    };

    await passwordOptions(data)
      .unwrap()
      .then(res => {
        console.log('password response ===>', res);
        ShowToast(res.message);
        if (res.success) {
          navigateToRoute('Login');
        }
      })
      .catch(error => {
        console.log('failed to change or reset password ====>', error);
        ShowToast('Some problem occured');
      });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: AppColors.WHITE}}
      behavior="height">
      <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
        <AppHeader goBack />
        <LineBreak space={5} />
        <AppText
          title={'Enter a New Password!'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
          textAlignment={'center'}
        />
        <LineBreak space={1} />
        <AppText
          title={'We Recovered Your Account'}
          textColor={AppColors.LIGHTGRAY}
          textSize={2}
          textAlignment={'center'}
        />
        <LineBreak space={20} />
        <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
          <View>
            <AppText
              title={'New Password'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Input password'}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
            />
            <LineBreak space={1} />
          </View>
          <LineBreak space={1} />

          <View>
            <AppText
              title={'Confirm New Password'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Input password'}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
            />
            <LineBreak space={1} />
          </View>

          <View
            style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
            <View>
              <AppButton
                title={'Confirm Password'}
                textColor={AppColors.WHITE}
                loading={isLoading}
                borderRadius={5}
                handlePress={onConfirm}
              />
            </View>
          </View>
          <LineBreak space={2} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;
