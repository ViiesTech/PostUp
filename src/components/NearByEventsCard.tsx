/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
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

const NearByEventsCard = ({
  item,
  search,
  viewDetailsHandleOnPress,
  favorites,
}: any) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: AppColors.GRAY,
        paddingHorizontal: responsiveWidth(2.5),
        paddingVertical: responsiveHeight(1.5),
        borderRadius: 10,
      }}>
      <View style={search ? {flexDirection: 'row', gap: 10} : {}}>
        <Image
          source={item.eventImg}
          style={
            search
              ? {width: 90, height: 80, borderRadius: 5}
              : {width: responsiveWidth(80), borderRadius: 10}
          }
        />
        <View>
          {!search && <LineBreak space={1.5} />}
          <View
            style={
              favorites
                ? {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }
                : null
            }>
            <AppText
              title={item.title}
              textColor={AppColors.BLACK}
              textSize={2}
              textFontWeight
            />

            {favorites && (
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.darkYellow,
                  borderRadius: 100,
                  width: 23,
                  height: 23,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AppText
                  title={'🤗'}
                  textColor={AppColors.BLACK}
                  textSize={1.5}
                  textFontWeight
                />
              </TouchableOpacity>
            )}
          </View>
          <LineBreak space={1} />

          <View
            style={{
              flexDirection: 'row',
              gap: search ? 15 : 25,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: search ? 5 : 10,
                alignItems: 'center',
              }}>
              <FontAwesome
                name="calendar"
                size={responsiveFontSize(search ? 1.5 : 2)}
                color={AppColors.darkYellow}
              />
              <AppText
                title={item.date}
                textColor={AppColors.LIGHTGRAY}
                textSize={search ? 1.1 : 1.4}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: search ? 5 : 10,
                alignItems: 'center',
              }}>
              <Octicons
                name="location"
                size={responsiveFontSize(search ? 1.7 : 2.2)}
                color={AppColors.darkYellow}
              />
              <AppText
                title={item.location}
                textColor={AppColors.LIGHTGRAY}
                textSize={search ? 1.1 : 1.4}
              />
            </View>
          </View>
          <LineBreak space={search ? 1.5 : 2} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: search ? responsiveWidth(60) : 'auto',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: search ? 15 : 20,
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
                  size={responsiveFontSize(search ? 1.5 : 2)}
                  color={AppColors.LIGHTGRAY}
                />
                <AppText
                  title={item.likes}
                  textColor={AppColors.LIGHTGRAY}
                  textSize={search ? 1.1 : 1.4}
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
                  size={responsiveFontSize(search ? 1.7 : 2.2)}
                  color={AppColors.LIGHTGRAY}
                />
                <AppText
                  title={item.comments}
                  textColor={AppColors.LIGHTGRAY}
                  textSize={search ? 1.1 : 1.4}
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
                  size={responsiveFontSize(search ? 1.7 : 2.2)}
                  color={AppColors.LIGHTGRAY}
                />
                <AppText
                  title={item.shares}
                  textColor={AppColors.LIGHTGRAY}
                  textSize={search ? 1.1 : 1.4}
                />
              </View>
            </View>

            <View>
              <AppButton
                title={'View Details'}
                borderRadius={5}
                handlePress={() => viewDetailsHandleOnPress()}
                textSize={search ? 1.1 : 1.5}
                padding={search ? 5 : 10}
                buttoWidth={search ? 18 : 25}
              />
            </View>
          </View>
          {!search && <LineBreak space={1} />}
        </View>
      </View>
    </View>
  );
};

export default NearByEventsCard;
