/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, FlatList, Image} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppImages from '../../assets/images/AppImages';

const gallery = [
  {id: 1, img: AppImages.stepOne},
  {id: 2, img: AppImages.stepOne},
  {id: 3, img: AppImages.stepOne},
  {id: 4, img: AppImages.stepOne},
  {id: 5, img: AppImages.stepOne},
  {id: 6, img: AppImages.stepOne},
  {id: 7, img: AppImages.stepOne},
  {id: 8, img: AppImages.stepOne},
  {id: 9, img: AppImages.stepOne},
  {id: 10, img: AppImages.stepOne},
  {id: 11, img: AppImages.stepOne},
];

const History = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="History"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={55}
      />
      <LineBreak space={4} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <AppText
          title={'Places I Posts'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
      </View>

      <FlatList
        data={gallery}
        ItemSeparatorComponent={<LineBreak space={0.1} />}
        ListHeaderComponent={<LineBreak space={2} />}
        ListFooterComponent={<LineBreak space={2} />}
        numColumns={3}
        renderItem={({item}) => {
          return (
            <View>
              <Image
                source={item.img}
                style={{
                  width: responsiveWidth(34),
                  height: responsiveHeight(15),
                  marginHorizontal: responsiveWidth(0.1),
                }}
              />
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default History;
