/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import AppText from '../../components/AppTextComps/AppText';
import AppImages from '../../assets/images/AppImages';
import {useCustomNavigation} from '../../utils/Hooks';
import AppButton from '../../components/AppButton';

const locationOptions = [
  {id: 1, title: 'Are you a Patron/Guest of this place?'},
  {id: 2, title: 'Are you an Employee/Associate of this place'},
  {id: 3, title: 'What Are You Looking For?'},
  {id: 4, title: 'Do You Want to PostUp Anonymously?'},
];

const LocationSelection = () => {
  const {navigateToRoute} = useCustomNavigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <LineBreak space={2} />
      <View style={{paddingHorizontal: responsiveWidth(5)}}>
        <AppText
          title={'Post Up Location Selection'}
          textColor={AppColors.BLACK}
          textSize={1.8}
          textFontWeight
        />
        <LineBreak space={2} />
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <AppTextInput
            inputPlaceHolder={'Search...'}
            placeholderTextColor={AppColors.GRAY}
            containerBg={AppColors.WHITE}
            borderRadius={5}
            inputWidth={70}
          />
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: AppColors.GRAY,
              borderWidth: 1,
              width: 55,
              height: 52,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              name="options"
              size={responsiveFontSize(3.5)}
              color={AppColors.GRAY}
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={2} />
        <Image
          source={AppImages.mapTwo}
          resizeMode="contain"
          style={{width: responsiveWidth(90), alignSelf: 'center'}}
        />
        <LineBreak space={2} />

        <FlatList
          data={locationOptions}
          ItemSeparatorComponent={<LineBreak space={2} />}
          renderItem={({item}) => {
            return (
              <View>
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                  textFontWeight
                />
                <LineBreak space={1} />
                <AppTextInput
                  inputPlaceHolder={item.id == 3 ? 'Meet-Ups' : 'Yes'}
                  placeholderTextColor={AppColors.BLACK}
                  containerBg={AppColors.WHITE}
                  borderRadius={5}
                  inputWidth={77}
                  rightIcon={
                    <TouchableOpacity>
                      <Entypo
                        name="chevron-down"
                        size={responsiveFontSize(2)}
                        color={AppColors.BLACK}
                      />
                    </TouchableOpacity>
                  }
                />
              </View>
            );
          }}
        />

        <LineBreak space={5} />

        <View style={{alignItems: 'center'}}>
          <AppButton
            title={'PostUp'}
            borderRadius={5}
            handlePress={() => navigateToRoute('Main')}
          />
        </View>
        <LineBreak space={5} />
      </View>
    </ScrollView>
  );
};

export default LocationSelection;
