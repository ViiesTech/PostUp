import React, {useState, useRef} from 'react';
import {
  ActivityIndicator,
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
import {
  useRegisterMutation,
  useGoogleSignInMutation,
} from '../../redux/services';
import {isValidDate, ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {getFcmToken} from '../../GlobalFunctions/Firebase';
import {
  GoogleSignin,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const {navigateToRoute} = useCustomNavigation();
  const [register, {isLoading}] = useRegisterMutation();
  const [googleSignInApi, {isLoading: isGoogleLoading}] =
    useGoogleSignInMutation();
  const [isGoogleSignLoading, setIsGoogleSignLoading] = useState(false);
  const isSigningIn = useRef(false);

  const onChangeText = (value, text) => {
    setState(prevState => ({
      ...prevState,
      [value]: text,
    }));
  };

  const onSignupPress = async () => {
    if (!state.email) {
      return ShowToast('Please enter your email');
    } else if (!state.password) {
      return ShowToast('Please enter your password');
    } else if (state.password.length < 8) {
      return ShowToast('Your password is too weak');
    } else if (!state.confirmPassword) {
      return ShowToast('Please confirm your password');
    } else if (state.password !== state.confirmPassword) {
      return ShowToast('Passwords do not match');
    } else if (!state.termsAccepted) {
      return ShowToast('Please accept the Terms and Conditions');
    }

    try {
      // Get FCM token (may be null if Firebase not properly initialized)
      const fcmToken = await getFcmToken();
      console.log('FCM Token:', fcmToken);

      const data = {
        email: state.email?.toLowerCase(),
        password: state.password,
      };

      // Only add FCMToken if it exists
      if (fcmToken) {
        data.FCMToken = fcmToken;
      }

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
      ShowToast(err.data.message || 'Some problem occurred');
    }
  };

  const onGoogleSignIn = async () => {
    if (isSigningIn.current) {
      return;
    }
    isSigningIn.current = true;
    setIsGoogleSignLoading(true);
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const {user} = response.data;
        const fcmToken = await getFcmToken();

        const body = {email: user.email ? user.email.trim().toLowerCase() : user.email};
        if (fcmToken) {
          body.FCMToken = fcmToken;
        }

        const res = await googleSignInApi(body).unwrap();
        console.log('[Google Sign-In] API response:', res);

        if (res.success) {
          if (res.token) {
            await AsyncStorage.setItem('authToken', res.token);
          }
          ShowToast(res.message || 'Signed in successfully');
          // Navigation is handled automatically by Redux token state in Routes.jsx
        } else {
          ShowToast(res.message || 'Sign-in failed');
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled — no toast needed
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ShowToast('Sign-in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ShowToast('Google Play Services not available');
      } else {
        console.log('[Google Sign-In] error:', error);
        ShowToast('Google sign-in failed');
      }
    } finally {
      isSigningIn.current = false;
      setIsGoogleSignLoading(false);
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
              title={'Email Address'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Email'}
              value={state.email}
              onChangeText={text => onChangeText('email', text)}
              keyboardType="email-address"
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

          <LineBreak space={2} />

          <View>
            <AppText
              title={'Confirm Password'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Confirm Password'}
              value={state.confirmPassword}
              onChangeText={text => onChangeText('confirmPassword', text)}
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
            title={
              (isGoogleSignLoading || isGoogleLoading) ? (
                <ActivityIndicator size={26} color={AppColors.BLACK} />
              ) : (
                'Continue with Google'
              )
            }
            borderRadius={5}
            borderWidth={1}
            borderColor={AppColors.BTNCOLOURS}
            bgColor={AppColors.WHITE}
            textColor={AppColors.BLACK}
            borderRightWidth={3}
            borderBottomWidth={3}
            handlePress={onGoogleSignIn}
            leftIcon={
              (isGoogleSignLoading || isGoogleLoading) ? null : (
                <AntDesign
                  name="google"
                  size={responsiveFontSize(3)}
                  color={AppColors.BLACK}
                />
              )
            }
          />
        </View>
        <LineBreak space={4} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SignUp;
