/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppButton from '../../components/AppButton';
import {useCustomNavigation} from '../../utils/Hooks';

const TermsOfService = () => {
  const {navigateToRoute} = useCustomNavigation();
  return (
    <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        goBack
        heading="Terms Of Service"
        isCenteredHead={true}
        isCenteredHeadWidth={65}
        textFontWeight={true}
      />
      <LineBreak space={3} />
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          paddingVertical: responsiveHeight(3),
          marginHorizontal: responsiveWidth(5),
          borderWidth: 1,
          borderColor: AppColors.GRAY,
          borderRadius: 5,
        }}>
        <AppText
          title={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type typesetting, remaining essentially unchanged. '
          }
          textColor={AppColors.BLACK}
          textSize={1.6}
          lineHeight={2.6}
        />
      </View>
      <LineBreak space={3} />
      <View style={{alignItems: 'center'}}>
        <AppButton
          title={'Accept'}
          borderRadius={5}
          handlePress={() => navigateToRoute('Main')}
        />
      </View>
    </View>
  );
};

export default TermsOfService;
