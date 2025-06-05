import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import AppText from './AppTextComps/AppText';

type props = {
  title?: string
  selected?: string
  setSelected?: () => void
};

const SelectionButton = ({title, selected, setSelected}: props) => {
  return (
    <TouchableOpacity
    onPress={setSelected}
      style={{
        height: responsiveHeight(6),
        width: responsiveWidth(28),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected == title ? AppColors.BLUE : AppColors.WHITE,
        borderWidth: 1,
        marginTop: 20,
      }}>
      <AppText title={title} textColor={selected == title ? AppColors.WHITE : AppColors.BLACK} textSize={2} />
    </TouchableOpacity>
  );
};

export default SelectionButton;
