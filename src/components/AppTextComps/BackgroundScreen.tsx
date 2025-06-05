import { View, Text, ImageBackground } from 'react-native'
import React, {ReactNode} from 'react'
import AppColors from '../../utils/AppColors'
import AppImages from '../../assets/images/AppImages'

type BgProps = {
    children: ReactNode,
    stylesPorp?: any
}

const BackgroundScreen = ({children,stylesPorp}: BgProps) => {
  return (
    <View style={[stylesPorp,{flex:1, padding:20, backgroundColor:AppColors.PRIMARY}]}>
        {children}
    </View>
  )
}

export default BackgroundScreen