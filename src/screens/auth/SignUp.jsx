import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/AppHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useRegisterMutation} from '../../redux/services';
import {isValidDate, ShowToast, useCustomNavigation} from '../../utils/Hooks';

const SignUp = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const {navigateToRoute} = useCustomNavigation();
  const [register, {isLoading}] = useRegisterMutation();

  const onChangeText = (value, text) => {
    setState(prevState => ({
      ...prevState,
      [value]: text,
    }));
  };

  const onSignupPress = async () => {
    if (!state.username) {
      return ShowToast('Please enter your username');
    } else if (!state.email) {
      return ShowToast('Please enter your email');
    } else if (!state.password) {
      return ShowToast('Please enter your password');
    } else if (state.password.length < 8) {
      return ShowToast('Your password is too weak');
    } else if (!state.termsAccepted) {
      return ShowToast('Please accept the Terms and Conditions');
    }

    const data = {
      userName: state.username,
      email: state.email?.toLowerCase(),
      password: state.password,
    };

    try {
      const res = await register(data).unwrap();
      console.log('res in signup:-', res);
      if (res.success) {
        navigateToRoute('OTPVerifications', {
          email: data.email,
          code: res?.otp,
          type: 'signup',
          token: res?.token,
        });
        ShowToast(res.message);
      } else {
        ShowToast(res.message);
      }
    } catch (err) {
      console.log('err in signup:-', err);
      ShowToast('Some problem occurred');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: AppColors.WHITE}}
      behavior="height">
      <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
        <AppHeader goBack />
        <LineBreak space={10} />
        <AppText
          title={'Create a PostUp Account!'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
          textAlignment={'center'}
        />
        <LineBreak space={1} />
        <AppText
          title={'Where to GO, What to DO'}
          textColor={AppColors.LIGHTGRAY}
          textSize={2}
          textAlignment={'center'}
        />
        <LineBreak space={10} />

        <View style={{paddingHorizontal: responsiveWidth(5)}}>
          <View>
            <AppText
              title={'Username'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Enter username'}
              onChangeText={text => onChangeText('username', text)}
              value={state.username}
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
              inputPlaceHolder={'Email'}
              value={state.email}
              onChangeText={text => onChangeText('email', text)}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
            />
          </View>

          <LineBreak space={2} />

          <View>
            <AppText
              title={'Password'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Password'}
              value={state.password}
              onChangeText={text => onChangeText('password', text)}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              secureTextEntry={true}
            />
          </View>
        </View>

        <LineBreak space={2} />

        <TouchableOpacity
          onPress={() => onChangeText('termsAccepted', !state.termsAccepted)}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(5),
          }}>
          <FontAwesome
            name={state.termsAccepted ? 'check-square' : 'square-o'}
            size={responsiveFontSize(2.5)}
            color={state.termsAccepted ? AppColors.BTNCOLOURS : AppColors.GRAY}
          />
          <Text
            style={{
              color: AppColors.BLACK,
              fontSize: responsiveFontSize(1.8),
              paddingLeft: responsiveWidth(2),
            }}>
            I agree to the{' '}
            <Text
              onPress={() => navigateToRoute('TermsOfService')}
              style={{
                color: AppColors.BTNCOLOURS,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Terms and Conditions
            </Text>
          </Text>
        </TouchableOpacity>

        <LineBreak space={4} />

        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <AppButton
            handlePress={onSignupPress}
            loading={isLoading}
            title={'Sign up'}
            borderRadius={5}
          />
          <LineBreak space={2} />
          <AppButton
            title={'Continue with Google'}
            borderRadius={5}
            borderWidth={1}
            borderColor={AppColors.BTNCOLOURS}
            bgColor={AppColors.WHITE}
            textColor={AppColors.BLACK}
            borderRightWidth={3}
            borderBottomWidth={3}
            handlePress={() => {}}
            leftIcon={
              <AntDesign
                name="google"
                size={responsiveFontSize(3)}
                color={AppColors.BLACK}
              />
            }
          />
          <LineBreak space={2} />
          <AppButton
            title={'Continue with Facebook'}
            borderRadius={5}
            borderWidth={1}
            borderColor={AppColors.BTNCOLOURS}
            bgColor={AppColors.WHITE}
            textColor={AppColors.BLACK}
            borderRightWidth={3}
            borderBottomWidth={3}
            handlePress={() => {}}
            leftIcon={
              <FontAwesome
                name="facebook-f"
                size={responsiveFontSize(3)}
                color={AppColors.BLACK}
              />
            }
          />
        </View>
        <LineBreak space={4} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SignUp;
