/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import AppColors from '../utils/AppColors';
import AppText from './AppTextComps/AppText';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

type Props = {
  item?: any,
  tabContainerOnPress?: any,
  selectedTab?: any,
  unitDetails?: any,
};

const TabBarTab = ({
  item,
  tabContainerOnPress,
  selectedTab,
  unitDetails,
}: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: unitDetails
          ? selectedTab?.id == item?.id
            ? AppColors.BTNCOLOURS
            : AppColors.WHITE
          : AppColors.WHITE,
        width: responsiveWidth(28),
        height: responsiveHeight(8),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={tabContainerOnPress}>
      <AppText
        title={item.title}
        textColor={
          selectedTab?.id == item?.id
            ? unitDetails
              ? AppColors.WHITE
              : AppColors.BTNCOLOURS
            : AppColors.DARKGRAY
        }
        textSize={1.7}
        textTransform={unitDetails ? null : 'uppercase'}
        textAlignment={'center'}
      />
    </TouchableOpacity>
  );
};

export default TabBarTab;
