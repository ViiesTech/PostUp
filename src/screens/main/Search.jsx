/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../components/AppTextComps/AppText';
import AppImages from '../../assets/images/AppImages';
import NearByEventsCard from '../../components/NearByEventsCard';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {
  useLazyGetAllEventQuery,
  useLazySearchByEventNameQuery,
} from '../../redux/services';
import {useSelector} from 'react-redux';
import SVGXml from '../../components/SVGXML';
import AppIcons from '../../assets/icons/AppIcons';

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
  const [getAllEvent, {data, error, isLoading}] = useLazyGetAllEventQuery();
  const [
    searchByEventName,
    {data: searchData, error: searchError, isLoading: searchLoading},
  ] = useLazySearchByEventNameQuery();
  const {user} = useSelector(state => state?.persistedData);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [events, setEvents] = useState([]);

  const handleFetch = async () => {
    await getAllEvent()
      .unwrap()
      .then(res => {
        if (!res.success) {
          ShowToast(res.message);
        } else {
          setEvents(res.data);
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

  const handleSearch = async searchText => {
    if (!searchText) {
      return ShowToast('Please enter event name to search');
    }
    setIsSearching(true);
    await searchByEventName(searchText)
      .unwrap()
      .then(res => {
        if (res.success) {
          setEvents([]);
          setEvents(res.data);
          setIsSearching(false);
        } else {
          setEvents([]);
          setIsSearching(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsSearching(false);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to search event',
        );
      });
  };

  useEffect(() => {
    handleFetch(user?._id);
  }, [user?._id, searchText]);

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
            value={searchText}
            onChangeText={text => setSearchText(text)}
            inputWidth={62}
            rightIcon={
              isSearching ? (
                <ActivityIndicator size="small" color={AppColors.GRAY} />
              ) : (
                <TouchableOpacity onPress={() => handleSearch(searchText)}>
                  <SVGXml icon={AppIcons.search} width={20} height={20} />
                </TouchableOpacity>
              )
            }
          />
          <TouchableOpacity
            onPress={() => navigateToRoute('LocationSelection')}
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

       {events?.length === 0 ? (
          <View style={{marginTop: responsiveHeight(4)}}>
            <AppText
              title={'Events Not Found'}
              textFontWeight
              textSize={2}
              textAlignment={'center'}
              textColor={AppColors.BLACK}
            />
          </View>
        ) : isLoading ? (
          <View style={{marginTop: responsiveHeight(4)}}>
            <ActivityIndicator color={AppColors.lowGreen} size={'large'} />
          </View>
        ) : ( <FlatList
          data={events}
          ListFooterComponent={<LineBreak space={10} />}
          contentContainerStyle={{gap: 15}}
          renderItem={({item}) => {
            return (
              <NearByEventsCard
                item={item}
                search={'search'}
                viewDetailsHandleOnPress={() =>
                  navigateToRoute('EventDetails', {eventId: item?._id})
                }
              />
            );
          }}
        />)}
      </View>
    </ScrollView>
  );
};

export default Search;
