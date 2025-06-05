/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import {responsiveFontSize, responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/AppHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignUp = () => {
  return (
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
            title={'Full Name'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Enter full name'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Username'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Enter username'}
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
            inputPlaceHolder={'Input email'}
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
            inputPlaceHolder={'Input password'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Date of Birth'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <AppTextInput
              inputPlaceHolder={'DD'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              inputWidth={22}
              keyboardType={"numeric"}
              textAlign="center"
              maxLength={2}
            />
            <AppTextInput
              inputPlaceHolder={'MM'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              inputWidth={22}
              keyboardType={"numeric"}
              textAlign="center"
              maxLength={2}
            />
            <AppTextInput
              inputPlaceHolder={'YYYY'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              inputWidth={22}
              keyboardType={"numeric"}
              textAlign="center"
              maxLength={4}
            />
          </View>
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Gender'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Male'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Phone'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'123-456-7890'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
        </View>
      </View>

      <LineBreak space={4} />

      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <AppButton title={'Sign up'} borderRadius={5} />
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
  );
};

export default SignUp;
