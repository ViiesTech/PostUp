import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight } from '../../utils/Responsive_Dimensions'
import AppColors from '../../utils/AppColors'


const AuthSmallButtons = () => {
  return (
    <TouchableOpacity  style={{height:responsiveHeight(10), width:responsiveHeight(10), backgroundColor:AppColors.WHITE, borderRadius:10}}>

    </TouchableOpacity>
  )
}

export default AuthSmallButtons