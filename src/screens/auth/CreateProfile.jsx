/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppImages from '../../assets/images/AppImages';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppTextInput from '../../components/AppTextInput';
import {useCustomNavigation} from '../../utils/Hooks';
import AppButton from '../../components/AppButton';

const CreateProfile = () => {
  const {navigateToRoute} = useCustomNavigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader goBack />
      <LineBreak space={3} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <View style={{alignItems: 'center'}}>
          <AppText
            title={'Create Profile'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
            textAlignment={'center'}
          />
          <LineBreak space={1} />
          <AppText
            title={'Enter your info'}
            textColor={AppColors.LIGHTGRAY}
            textSize={2}
            textAlignment={'center'}
          />
          <LineBreak space={3} />
          <ImageBackground
            source={AppImages.user}
            style={{width: 120, height: 120, position: 'relative'}}
            imageStyle={{borderRadius: 100}}>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColors.WHITE,
                borderRadius: 100,
                position: 'absolute',
                bottom: responsiveHeight(-1),
                right: responsiveWidth(-1),
                elevation: 10,
              }}>
              <AntDesign
                name="plus"
                size={responsiveFontSize(3)}
                color={AppColors.BLACK}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <LineBreak space={5} />

        <View>
          <View>
            <AppText
              title={'Full Name or Username'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Input full name'}
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
              inputPlaceHolder={'Input email address'}
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
            <View style={{flexDirection: 'row', gap: 18}}>
              <AppTextInput
                inputPlaceHolder={'MM'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={22}
                textAlignVertical={'center'}
                textAlign={'center'}
              />
              <AppTextInput
                inputPlaceHolder={'DD'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={22}
                textAlignVertical={'center'}
                textAlign={'center'}
              />
              <AppTextInput
                inputPlaceHolder={'YYYY'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={22}
                textAlignVertical={'center'}
                textAlign={'center'}
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
            <AppText title={'Phone'} textColor={AppColors.BLACK} textSize={2} />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'123-456-7890'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Location'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Select Your Location'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              inputWidth={72}
              rightIcon={
                <TouchableOpacity
                  onPress={() => navigateToRoute('AllowAccess')}
                  style={{
                    backgroundColor: AppColors.darkYellow,
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="crosshairs-gps"
                    size={responsiveFontSize(2.2)}
                    color={AppColors.WHITE}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <LineBreak space={4} />
          <AppButton
            title={'Continue'}
            borderRadius={5}
            handlePress={() => navigateToRoute('TermsOfService')}
          />
          <LineBreak space={2} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateProfile;
