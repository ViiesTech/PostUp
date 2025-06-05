import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import AppText from './AppText';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';

type props = {
  title?: any;
    lineWidth?: any
};
const Separator = ({title,lineWidth = 40}: props) => {
  return (
    <View style={{flexDirection: 'row', alignItems:'center', alignSelf:'center', justifyContent:'space-between', width:responsiveWidth(90)}}>
      <View style={[styles.line, {width: responsiveWidth(lineWidth)}]} />
      <AppText title={title} textColor={AppColors.WHITE} textSize={2} />
      <View style={[styles.line, {width: responsiveWidth(lineWidth)}]} />
    </View>
  );
};

export default Separator;

const styles = StyleSheet.create({
  line: {
    height: 2,
    width: responsiveWidth(40),
    backgroundColor: AppColors.WHITE,
  },
});
