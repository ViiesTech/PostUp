/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppImages from '../../assets/images/AppImages';
import NearByEventsCard from '../../components/NearByEventsCard';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {useLazyGetFavoriesByTokenQuery} from '../../redux/services';
import {useSelector} from 'react-redux';

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
  const [getFavoriesByToken, {data, error, isLoading}] =
    useLazyGetFavoriesByTokenQuery();
  const {token} = useSelector(state => state?.persistedData);

  const handleFetch = async () => {
    await getFavoriesByToken(token)
      .unwrap()
      .then(res => {
        if (!res.success) {
          ShowToast(res.message);
        }
      })
      .catch(err => {
        console.log(err);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to fetch events',
        );
      });
  };

  useEffect(() => {
    handleFetch(token);
  }, [token]);

  console.log('dddd',token)

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
          data={data?.data}
          ListFooterComponent={<LineBreak space={10} />}
          contentContainerStyle={{gap: 15}}
          renderItem={({item}) => {
            console.log(item?.eventId?.eventName)
            return (
              <NearByEventsCard
                item={item?.eventId}
                search={'search'}
                favorites={'favorites'}
                viewDetailsHandleOnPress={() => navigateToRoute('EventDetails', {eventId: item?.eventId?._id})}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Favorites;
