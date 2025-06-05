/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import BackIcon from './AppTextComps/BackIcon';
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';

type props = {
  // title?: string,
  onBackPress?: any;
  heading?: any;
  rightIcon?: any;
  middleIcon?: any;
  backIconColor?: any;
};

const NormalHeader = ({onBackPress, heading, rightIcon, middleIcon, backIconColor}: props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
        borderBottomWidth: 1,
        borderBottomColor: AppColors.DARKGRAY,
        backgroundColor: AppColors.WHITE,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
        {onBackPress && <BackIcon onBackPress={onBackPress} iconColor={backIconColor} />}
        {middleIcon ? (
          middleIcon
        ) : (
          <AppText
            title={heading}
            textColor={backIconColor ? backIconColor : AppColors.BLACK}
            textSize={2.2}
            textFontWeight
            textTransform={'uppercase'}
          />
        )}
      </View>
      {rightIcon}
    </View>
  );
};

export default NormalHeader;
