/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import AppColors from '../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../components/AppTextComps/AppText';
import AppImages from '../../assets/images/AppImages';
import NearByEventsCard from '../../components/NearByEventsCard';
import {useCustomNavigation} from '../../utils/Hooks';

const nearByData = [
  {
    id: 1,
    eventImg: AppImages.event,
    title: 'Event Name Here',
    date: '12-15 March, 2025',
    location: 'Lorem venue, California',
    likes: '196',
    comments: '20',
    shares: '5',
  },
  {
    id: 2,
    eventImg: AppImages.event,
    title: 'Event Name Here',
    date: '12-15 March, 2025',
    location: 'Lorem venue, California',
    likes: '196',
    comments: '20',
    shares: '5',
  },
];

const Search = () => {
  const {navigateToRoute} = useCustomNavigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <LineBreak space={2} />
      <View style={{paddingHorizontal: responsiveWidth(5)}}>
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
        <AppText
          title={'Results'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
        <LineBreak space={2} />

        <FlatList
          data={nearByData}
          ListFooterComponent={<LineBreak space={10} />}
          contentContainerStyle={{gap: 15}}
          renderItem={({item}) => {
            return (
              <NearByEventsCard
                item={item}
                search={'search'}
                viewDetailsHandleOnPress={() => navigateToRoute('EventDetails')}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Search;
