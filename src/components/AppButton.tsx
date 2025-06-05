/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AppColors from '../utils/AppColors';
import AppText from './AppTextComps/AppText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
type props = {
  title?: any;
  bgColor?: any;
  handlePress?: () => void;
  textColor?: any;
  textFontWeight?: boolean;
  textSize?: any;
  RightColour?: any;
  leftIcon?: any;
  buttoWidth?: number;
  borderWidth?: any;
  borderColor?: any;
  borderRadius?:any;
  textTransform?: any;
  padding?:any;
  elevation?:any;
  borderRightWidth?:any;
  borderBottomWidth?:any;
};
const AppButton = ({
  title,
  handlePress,
  textColor = AppColors.WHITE,
  textFontWeight = true,
  textSize = 2,
  bgColor,
  RightColour = AppColors.BTNCOLOURS,
  buttoWidth = 90,
  leftIcon,
  borderWidth,
  borderColor,
  borderRadius,
  textTransform,
  padding,
  elevation,
  borderRightWidth,
  borderBottomWidth,
}: props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: bgColor ? bgColor : AppColors.BTNCOLOURS,
        alignItems: 'center',
        justifyContent: leftIcon ? 'center' : 'space-between',
        padding: padding ? padding : 12,
        borderRadius: borderRadius ? borderRadius : 8,
        gap: leftIcon ? 7 : 0,
        width: responsiveWidth(buttoWidth),
        borderWidth: borderWidth,
        borderColor: borderColor,
        flexDirection: leftIcon ? 'row' : null,
        elevation: elevation,
        borderBottomWidth: borderBottomWidth,
        borderRightWidth: borderRightWidth,
      }}>
      {leftIcon}
      <View />
      <AppText
        textColor={textColor}
        textSize={textSize}
        title={title}
        textFontWeight={textFontWeight}
        textTransform={textTransform}
      />
    </TouchableOpacity>
  );
};

export default AppButton;
