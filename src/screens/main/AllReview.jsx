/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import AppColors from '../../utils/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppHeader from '../../components/AppHeader';
import AppImages from '../../assets/images/AppImages';
import ReviewCard from '../../components/ReviewCard';
import LineBreak from '../../components/LineBreak';
import moment from 'moment';

const comments = [
  {
    id: 1,
    username: 'Alexander',
    time: '7h',
    userProf: AppImages.user,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    id: 2,
    username: 'Alexander',
    time: '7h',
    userProf: AppImages.user,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
];

const AllReview = ({route}) => {
  const reviews = route?.params?.reviews;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
        <AppHeader goBack heading="All Reviews" isCenteredHead={true} />

        <LineBreak space={2} />

        <FlatList
          data={reviews}
          contentContainerStyle={{
            gap: responsiveWidth(4),
            paddingHorizontal: responsiveWidth(4),
          }}
          renderItem={({item}) => (
            <ReviewCard
              image={item?.image ? item?.image : AppImages.event}
              day={moment(item?.createdAt).fromNow()}
              desc={item.message}
              name={`${item?.eventId?.adminId?.fullName}`}
              rating={item?.stars}
              style={{width: responsiveWidth(90)}}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllReview;
