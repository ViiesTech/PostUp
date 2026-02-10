import {ActivityIndicator} from 'react-native';
import React from 'react';
import AppColors from '../utils/AppColors';

const AppLoader = ({size, color, style}) => {
  return (
    <ActivityIndicator
      size={'small' || size}
      style={[{alignSelf: 'center'}, style]}
      color={AppColors.WHITE || color}
    />
  );
};

export default AppLoader;
