/* eslint-disable eqeqeq */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ImageBackground, TouchableOpacity, FlatList} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import LineBreak from '../../components/LineBreak';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../../components/AppTextComps/AppText';
import AppButton from '../../components/AppButton';
import {useCustomNavigation} from '../../utils/Hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

const data = [
  {id: 1, title: '6543 Chestnut Court, Boston, MA 02101', subTitle: 'John Doe'},
  {
    id: 2,
    title: '3456 Cedar Boulevard, Los Angeles, CA 90001',
    subTitle: 'John Doe',
  },
];

const SelectLocation = () => {
  const {navigateToRoute} = useCustomNavigation();
  return (
    <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <ImageBackground
        source={AppImages.location}
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(60),
          paddingHorizontal: responsiveWidth(6),
        }}>
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Search...'}
          placeholderTextColor={AppColors.GRAY}
          containerBg={AppColors.WHITE}
          borderRadius={5}
        />

        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: AppColors.darkYellow,
              width: 60,
              height: 60,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={responsiveFontSize(4)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>
          <LineBreak space={2} />
        </View>
      </ImageBackground>

      <LineBreak space={7} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <FlatList
          data={data}
          ItemSeparatorComponent={<LineBreak space={4} />}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <AppText
                    title={item.title}
                    textColor={AppColors.BLACK}
                    textSize={2}
                    textwidth={66}
                  />
                  <LineBreak space={1} />
                  <AppText
                    title={item.subTitle}
                    textColor={AppColors.GRAY}
                    textSize={1.8}
                  />
                </View>
                {item.id == 1 && (
                  <TouchableOpacity>
                    <Ionicons
                      name="checkmark-circle"
                      size={responsiveFontSize(3.5)}
                      color={AppColors.BGCOLOURS}
                    />
                  </TouchableOpacity>
                )}
                {item.id == 2 && (
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle-outline"
                      size={responsiveFontSize(4)}
                      color={AppColors.BTNCOLOURS}
                    />
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        />
      </View>

      <LineBreak space={3} />

      <View style={{alignItems: 'center'}}>
        <AppButton
          title={'Submit'}
          borderRadius={5}
          handlePress={() => navigateToRoute('CreateProfile')}
        />
      </View>
    </View>
  );
};

export default SelectLocation;
