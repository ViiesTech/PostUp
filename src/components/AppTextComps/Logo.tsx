import { View, Text, Image } from 'react-native'
import React from 'react'

type props = {
    logoUrl?: any
    logoHeight?: any
    logoWeight?: any
    logoReizeMode?: any
}
const   Logo = ({logoUrl, logoHeight, logoReizeMode, logoWeight}: props) => {
  return (
    <Image source={logoUrl} style={{height: logoHeight, width:logoWeight, alignSelf:'center'}} resizeMode={logoReizeMode} />
  )
}

export default Logo