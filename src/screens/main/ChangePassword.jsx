/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import AppColors from '../../utils/AppColors';
import {useCustomNavigation} from '../../utils/Hooks';
import LineBreak from '../../components/LineBreak';
import AppHeader from '../../components/AppHeader';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';

const ChangePassword = () => {
  const {navigateToRoute} = useCustomNavigation();
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
            value={'newpassword'}
            secureTextEntry={true}
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
            title={'Enter your old password'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'password'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
            value={'newpassword'}
            secureTextEntry={true}
          />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Enter your old password'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'password'}
            value={'newpassword'}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
            secureTextEntry={true}
          />
        </View>

        <LineBreak space={38} />

        <View>
          <AppButton
            title={'Change Password'}
            borderRadius={5}
            handlePress={() => {}}
          />
        </View>
        <LineBreak space={2} />
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
