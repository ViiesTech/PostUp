/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import Octicons from 'react-native-vector-icons/Octicons';
import {responsiveFontSize} from '../../utils/Responsive_Dimensions';
import {useCustomNavigation} from '../../utils/Hooks';
import AppButton from '../../components/AppButton';

const AllowAccess = () => {
  const {navigateToRoute} = useCustomNavigation();

  return (
    <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader goBack />
      <LineBreak space={7} />
      <View style={{flex: 1, alignItems: 'center'}}>
        <Octicons
          name="location"
          size={responsiveFontSize(6)}
          color={AppColors.darkYellow}
        />
        <LineBreak space={1} />
        <AppText
          title={'Allow PostUp app to access this device’s location'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
          textAlignment={'center'}
          textwidth={70}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <View>
          <AppButton
            title={'While using this app'}
            textColor={AppColors.WHITE}
            borderRadius={5}
            handlePress={() => navigateToRoute('SelectLocation')}
          />
        </View>
        <LineBreak space={2} />
        <AppButton
          title={'Only this time'}
          borderRadius={5}
          borderWidth={1}
          borderColor={AppColors.BTNCOLOURS}
          bgColor={AppColors.WHITE}
          textColor={AppColors.BLACK}
          borderRightWidth={3}
          borderBottomWidth={3}
          handlePress={() => {}}
        />
        <LineBreak space={2} />
        <AppButton
          title={'Denny'}
          borderRadius={5}
          borderWidth={1}
          borderColor={AppColors.BTNCOLOURS}
          bgColor={AppColors.WHITE}
          textColor={AppColors.BLACK}
          borderRightWidth={3}
          borderBottomWidth={3}
          handlePress={() => {}}
        />
      </View>
      <LineBreak space={2} />
    </View>
  );
};

export default AllowAccess;
