/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import {useCustomNavigation} from '../../utils/Hooks';

const Splash = () => {
  const {navigateToRoute} = useCustomNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigateToRoute('OnBoarding');
    }, 1500);
  }, [navigateToRoute]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.WHITE,
      }}>
      <Image
        source={AppImages.splash_logo}
        style={{width: responsiveWidth(100), height: responsiveHeight(35)}}
      />
      <LineBreak space={1} />
      <AppText
        title={'PostUp'}
        textColor={AppColors.BLACK}
        textSize={6}
        textAlignment={'center'}
      />
      <LineBreak space={2} />

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <AppText
          title={'Where to'}
          textColor={AppColors.BLACK}
          textSize={2.5}
        />
        <AppText title={'Go,'} textColor={AppColors.Yellow} textSize={2.5} />
        <AppText title={'What to'} textColor={AppColors.BLACK} textSize={2.5} />
        <AppText title={'Do!'} textColor={'green'} textSize={2.5} />
      </View>
    </View>
  );
};

export default Splash;
