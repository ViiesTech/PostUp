/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import AppColors from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import LineBreak from './LineBreak';
import AppText from './AppTextComps/AppText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AppButton from './AppButton';

const NearByEventsCard = ({item}: any) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: AppColors.GRAY,
        paddingHorizontal: responsiveWidth(2.5),
        paddingVertical: responsiveHeight(1.5),
        borderRadius: 10,
      }}>
      <Image
        source={item.eventImg}
        style={{width: responsiveWidth(80), borderRadius: 10}}
      />
      <LineBreak space={1.5} />
      <AppText
        title={item.title}
        textColor={AppColors.BLACK}
        textSize={2}
        textFontWeight
      />
      <LineBreak space={1} />

      <View style={{flexDirection: 'row', gap: 25, alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <FontAwesome
            name="calendar"
            size={responsiveFontSize(2)}
            color={AppColors.darkYellow}
          />
          <AppText
            title={item.date}
            textColor={AppColors.LIGHTGRAY}
            textSize={1.4}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <Octicons
            name="location"
            size={responsiveFontSize(2.2)}
            color={AppColors.darkYellow}
          />
          <AppText
            title={item.location}
            textColor={AppColors.LIGHTGRAY}
            textSize={1.4}
          />
        </View>
      </View>
      <LineBreak space={2} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <AntDesign
              name="like2"
              size={responsiveFontSize(2)}
              color={AppColors.LIGHTGRAY}
            />
            <AppText
              title={item.likes}
              textColor={AppColors.LIGHTGRAY}
              textSize={1.4}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="comment-processing-outline"
              size={responsiveFontSize(2.2)}
              color={AppColors.LIGHTGRAY}
            />
            <AppText
              title={item.comments}
              textColor={AppColors.LIGHTGRAY}
              textSize={1.4}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <Fontisto
              name="share-a"
              size={responsiveFontSize(2.2)}
              color={AppColors.LIGHTGRAY}
            />
            <AppText
              title={item.shares}
              textColor={AppColors.LIGHTGRAY}
              textSize={1.4}
            />
          </View>
        </View>

        <View>
          <AppButton
            title={'View Details'}
            borderRadius={5}
            handlePress={() => {}}
            textSize={1.5}
            padding={10}
            buttoWidth={25}
          />
        </View>
      </View>
      <LineBreak space={1} />
    </View>
  );
};

export default NearByEventsCard;
