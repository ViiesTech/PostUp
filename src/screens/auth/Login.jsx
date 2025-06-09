/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {useCustomNavigation} from '../../utils/Hooks';

const Login = () => {
  const {navigateToRoute} = useCustomNavigation();
  return (
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
            title={'Username'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'username'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
          <LineBreak space={1} />
          <TouchableOpacity onPress={() => navigateToRoute('ForgotPassword')}>
            <View style={{alignItems: 'flex-end'}}>
              <AppText
                title={'Forgot Username?'}
                textColor={AppColors.BLACK}
                textSize={1.7}
                borderBottomWidth={1}
              />
            </View>
          </TouchableOpacity>
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
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
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

      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <AppButton
          title={'Login'}
          borderRadius={5}
          handlePress={() => navigateToRoute('CreateProfile')}
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
  );
};

export default Login;
