/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppImages from '../../assets/images/AppImages';
import NearByEventsCard from '../../components/NearByEventsCard';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {
  useAddOrRemoveToFavMutation,
  useLazyGetFavoriesByTokenQuery,
} from '../../redux/services';
import {useSelector} from 'react-redux';
import AppText from '../../components/AppTextComps/AppText';

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
  const [getFavoriesByToken, {data, isLoading}] =
    useLazyGetFavoriesByTokenQuery();
  const {token, user} = useSelector(state => state?.persistedData);
  const [addOrRemoveToFav, {data: favRes, isLoading: favIsLoading}] =
    useAddOrRemoveToFavMutation();
  const [isId, setIsId] = useState(0);

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

  const handleAddToFav = async id => {
    const bodyData = {
      userId: user?._id,
      eventId: id,
    };

    setIsId(id);

    await addOrRemoveToFav(bodyData)
      .unwrap()
      .then(res => {
        console.log(res);
        if (res.success) {
          ShowToast(res.message);
          handleFetch();
        } else {
          ShowToast(res.message);
        }
      })
      .catch(err => {
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to Remove To favorite',
        );
      });
  };

  useEffect(() => {
    handleFetch(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
        {data?.data?.length === 0 ? (
          <AppText
            title={'Events Not Found'}
            textFontWeight
            textSize={2}
            textAlignment={'center'}
            textColor={AppColors.BLACK}
          />
        ) : isLoading ? (
          <ActivityIndicator color={AppColors.lowGreen} size={'large'} />
        ) : (
          <FlatList
            data={data?.data}
            ListFooterComponent={<LineBreak space={10} />}
            contentContainerStyle={{gap: 15}}
            renderItem={({item}) => {
              return (
                <NearByEventsCard
                  item={item?.eventId}
                  search={'search'}
                  favorites={'favorites'}
                  removeToFavLoading={
                    favIsLoading && isId === item?.eventId?._id
                  }
                  handleRemoveToFav={() => handleAddToFav(item?.eventId?._id)}
                  viewDetailsHandleOnPress={() =>
                    navigateToRoute('EventDetails', {
                      eventId: item?.eventId?._id,
                    })
                  }
                />
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Favorites;
