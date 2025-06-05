import { View, Text, Image } from 'react-native'
import React from 'react'
import { responsiveHeight } from '../../utils/Responsive_Dimensions'

type imageProps = {
    imageurl?: any
    imageHeight?: Number,
    imageAlignment?: any,
    resizeMode?: any 
}


const ShowImage = ({imageurl, imageAlignment,imageHeight,resizeMode}:imageProps) => {
  return (
          <Image
            source={imageurl}
            style={{
              alignSelf: imageAlignment ? imageAlignment : 'center',
              height: responsiveHeight(imageHeight),
              width: responsiveHeight(imageHeight),
              resizeMode:resizeMode ? resizeMode : 'contain',
            }}
          />
  )
}

export default ShowImage