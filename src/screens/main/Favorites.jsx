/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
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

const Favorites = () => {
  const {navigateToRoute} = useCustomNavigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="Favorites Events"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={67}
      />
      <LineBreak space={4} />

      <View style={{paddingHorizontal: responsiveWidth(5)}}>
        <FlatList
          data={nearByData}
          ListFooterComponent={<LineBreak space={10} />}
          contentContainerStyle={{gap: 15}}
          renderItem={({item}) => {
            return (
              <NearByEventsCard
                item={item}
                search={'search'}
                favorites={'favorites'}
                viewDetailsHandleOnPress={() => navigateToRoute('EventDetails')}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Favorites;
