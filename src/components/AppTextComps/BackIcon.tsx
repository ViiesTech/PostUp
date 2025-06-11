import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveFontSize} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
import { useNavigation } from '@react-navigation/native';
const BackIcon = ({arrowWhite}: any) => {

  const nav = useNavigation()

  return (
    <TouchableOpacity onPress={()=> nav.goBack()}>
      <Ionicons
        name={'arrow-back'}
        size={responsiveFontSize(3)}
        color={arrowWhite ? AppColors.WHITE : AppColors.BLACK}
      />
    </TouchableOpacity>
  );
};

export default BackIcon;
