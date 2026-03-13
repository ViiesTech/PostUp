import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {useLoginMutation} from '../../redux/services';
import {getFcmToken} from '../../GlobalFunctions/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initBackgroundFetch,
  startLocationWatcher,
} from '../../services/LocationService';
import {useSelector} from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {navigateToRoute} = useCustomNavigation();

  const [login, {isLoading}] = useLoginMutation();

  const onLoginPress = async () => {
    if (!email) {
      return ShowToast('Please enter your email');
    } else if (!password) {
      return ShowToast('Please enter your password');
    } else {
      try {
        // Get FCM token (may be null if Firebase not properly initialized)
        const fcmToken = await getFcmToken();
        console.log('FCM Token:', fcmToken);

        let data = {
          email: email ? email.trim().toLowerCase() : email,
          password: password,
        };

        // Only add FCMToken if it exists
        if (fcmToken) {
          data.FCMToken = fcmToken;
        }

        const res = await login(data).unwrap();
        console.log('[Login] login response ====>', res);
        ShowToast(res.message);

        if (res.success) {
          // Store auth token
          if (res.token) {
            await AsyncStorage.setItem('authToken', res.token);
            console.log('[Login] Auth token saved');
          }

          // 1. BackgroundFetch — handles background + killed state
          await initBackgroundFetch();
          // 2. watchPosition — fires on real GPS movement in foreground/background
          startLocationWatcher();
        }
      } catch (error) {
        console.log('failed to login ====>', error);
        ShowToast(error?.data?.message || 'Some problem occured');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: AppColors.WHITE}}
      behavior="height">
      <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
        <LineBreak space={10} />
        <AppText
          title={'Login to PostUp'}
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
              title={'Email'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              keyboardType="email-address"
              inputPlaceHolder={'testuser@gmail.com'}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
            />
            <LineBreak space={1} />
            {/* <TouchableOpacity onPress={() => navigateToRoute('ForgotPassword')}>
            <View style={{alignItems: 'flex-end'}}>
              <AppText
                title={'Forgot Username?'}
                textColor={AppColors.BLACK}
                textSize={1.7}
                borderBottomWidth={1}
              />
            </View>
          </TouchableOpacity> */}
          </View>
          <View>
            <AppText
              title={'Password'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'password'}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              secureTextEntry={true}
            />
            <LineBreak space={1} />
            <TouchableOpacity onPress={() => navigateToRoute('ForgotPassword')}>
              <View style={{alignItems: 'flex-end'}}>
                <AppText
                  title={'Forgot Password?'}
                  textColor={AppColors.BLACK}
                  textSize={1.7}
                  borderBottomWidth={1}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <LineBreak space={27} />

        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <AppButton
            title={'Login'}
            borderRadius={5}
            loading={isLoading}
            handlePress={() => onLoginPress()}
          />
          <LineBreak space={2} />
          <AppButton
            title={'Sign up'}
            borderRadius={5}
            borderWidth={1}
            borderColor={AppColors.BTNCOLOURS}
            bgColor={AppColors.WHITE}
            textColor={AppColors.BLACK}
            borderRightWidth={3}
            borderBottomWidth={3}
            handlePress={() => navigateToRoute('SignUp')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
