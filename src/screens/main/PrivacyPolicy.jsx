/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';

const PrivacyPolicy = ({route}) => {
  const heading = route?.params?.heading;
  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading={heading || 'Privacy Policy'}
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={63}
      />
      <LineBreak space={4} />

      <View
        style={{
          borderWidth: 0.5,
          borderColor: AppColors.DARKGRAY,
          paddingHorizontal: responsiveWidth(6),
          marginHorizontal: responsiveWidth(5),
          borderRadius: 5,
        }}>
        <LineBreak space={3} />
        <AppText
          title={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. '
          }
          textColor={AppColors.LIGHTGRAY}
          textSize={1.8}
          lineHeight={3}
        />
        <LineBreak space={3} />
      </View>
      <LineBreak space={2} />
    </ScrollView>
  );
};

export default PrivacyPolicy;
