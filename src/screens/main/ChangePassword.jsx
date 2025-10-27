/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import AppHeader from '../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import Icon from 'react-native-vector-icons/Feather';
import {ShowToast} from '../../utils/Hooks';
import { useSelector } from 'react-redux';
import { useChangePasswordMutation } from '../../redux/services';

const ChangePassword = () => {
  const [state, setState] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const {user} = useSelector(state => state?.persistedData);
  const [changePassword, {isLoading}] = useChangePasswordMutation();

  const toggleEye = key => {
    setShowPassword(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const onChangeText = (value, text) => {
    setState(prevState => ({
      ...prevState,
      [value]: text,
    }));
  };

  const changePasswordHandler = async () => {
    if (!state.old_password) {
      return ShowToast('Please enter your old password');
    } else if (!state.new_password) {
      return ShowToast('Please enter your new password');
    } else if (!state.confirm_password) {
      return ShowToast('Please enter your confirm password');
    } else if (state.new_password !== state.confirm_password) {
      return ShowToast('Your new password and confirm password do not match.');
    }

    const data = {
      id: user?._id,
      password: state.old_password,
      newPassword: state.new_password,
      type:"Change"
    }

    try {
      const res = await changePassword(data).unwrap();
      if (res.success) {
        ShowToast(res.message);
        setState({});
      } else {
        ShowToast(res.message);
      }
    } catch (error) {
      console.log('failed to update profile ====>', error);
      ShowToast('Some problem occurred');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="Change Password"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={68}
      />
      <LineBreak space={4} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <View>
          <AppText
            title={'Enter your old password'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'password'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
            inputWidth={74}
            value={state.old_password}
            onChangeText={text => onChangeText('old_password', text)}
            secureTextEntry={showPassword.old}
            rightIcon={
              <TouchableOpacity onPress={() => toggleEye('old')}>
                <Icon
                  name={showPassword.old ? 'eye-off' : 'eye'}
                  size={responsiveFontSize(2.5)}
                  color={AppColors.GRAY}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <LineBreak space={3} />

        <AppText
          title={'Enter your new password information'}
          textColor={AppColors.BLACK}
          textSize={2.2}
          textFontWeight
        />

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Enter your new password'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'password'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
            value={state.new_password}
            onChangeText={text => onChangeText('new_password', text)}
            inputWidth={74}
            secureTextEntry={showPassword.new}
            rightIcon={
              <TouchableOpacity onPress={() => toggleEye('new')}>
                <Icon
                  name={showPassword.new ? 'eye-off' : 'eye'}
                  size={responsiveFontSize(2.5)}
                  color={AppColors.GRAY}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Enter your confirm password'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'password'}
            value={state.confirm_password}
            onChangeText={text => onChangeText('confirm_password', text)}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
            secureTextEntry={showPassword.confirm}
            inputWidth={74}
            rightIcon={
              <TouchableOpacity onPress={() => toggleEye('confirm')}>
                <Icon
                  name={showPassword.confirm ? 'eye-off' : 'eye'}
                  size={responsiveFontSize(2.5)}
                  color={AppColors.GRAY}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <LineBreak space={38} />

        <View>
          <AppButton
            title={'Change Password'}
            borderRadius={5}
            handlePress={() => changePasswordHandler()}
            loading={isLoading}
          />
        </View>
        <LineBreak space={2} />
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
