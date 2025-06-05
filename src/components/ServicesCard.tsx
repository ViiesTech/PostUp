/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import AppColors from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import LineBreak from './LineBreak';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

type Props = {
  item?: any;
  featured?: any;
};

const ServicesCard = ({item, featured}: Props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: featured ? '#f6f7f9' : AppColors.WHITE,
        position: 'relative',
        borderRadius: 15,
        width: featured ? responsiveWidth(50) : responsiveWidth(70),
      }}>
      <ImageBackground
        source={item.img}
        style={{
          width: featured ? responsiveWidth(50) : responsiveWidth(70),
          height: featured ? responsiveHeight(15) : responsiveHeight(20),
        }}
        imageStyle={{
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}>
        <View
          style={{
            backgroundColor: AppColors.WHITE,
            padding: featured ? 5 : 7,
            width: featured ? responsiveWidth(20) : responsiveWidth(25),
            marginHorizontal: responsiveWidth(4),
            marginVertical: responsiveHeight(2),
            alignItems: 'center',
            borderRadius: 100,
          }}>
          <AppText
            title={item.tagName}
            textColor={AppColors.BTNCOLOURS}
            textSize={featured ? 1.3 : 1.6}
            textFontWeight
          />
        </View>

        <View
          style={{
            backgroundColor: AppColors.BTNCOLOURS,
            padding: featured ? 4 : 7,
            width: featured ? responsiveWidth(15) : responsiveWidth(18),
            alignItems: 'center',
            borderRadius: 100,
            position: 'absolute',
            bottom: responsiveHeight(-2),
            right: responsiveWidth(5),
            borderWidth: featured ? 3 : 4,
            borderColor: AppColors.WHITE,
          }}>
          <AppText
            title={`₹${item.priceTag}`}
            textColor={AppColors.WHITE}
            textSize={1.6}
            textFontWeight
          />
        </View>
      </ImageBackground>

      <LineBreak space={2} />

      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          paddingHorizontal: responsiveWidth(4),
        }}>
        <View style={{flexDirection: 'row', gap: 2}}>
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name="star"
              size={responsiveFontSize(1.6)}
              color={AppColors.Yellow}
            />
          ))}
        </View>
        <AppText
          title={item.rating}
          textColor={featured ? AppColors.DARKGRAY : '#A2845E'}
          textSize={1.5}
          textFontWeight
        />
      </View>

      <LineBreak space={0.5} />

      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
        }}>
        <AppText
          title={item.title}
          textColor={featured ? AppColors.BLACK : AppColors.BTNCOLOURS}
          textSize={2}
          textFontWeight={featured ? false : true}
          numberOfLines={1}
        />
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
              gap: 10,
              alignItems: 'center',
            }}>
            <Image
              source={item.userImg}
              style={{width: 30, height: 30, borderRadius: 100}}
            />
            <AppText
              title={item.userName}
              textColor={featured ? AppColors.DARKGRAY : AppColors.BTNCOLOURS}
              textSize={1.7}
              textFontWeight
              numberOfLines={1}
            />
          </View>
          {!featured && (
            <TouchableOpacity
              style={{
                backgroundColor: AppColors.BTNCOLOURS,
                padding: 7,
                width: responsiveWidth(22),
                marginHorizontal: responsiveWidth(4),
                marginVertical: responsiveHeight(2),
                alignItems: 'center',
                borderRadius: 100,
              }}
              onPress={() => navigation.navigate('ViewProfile', {heading: item.userName})}
              >
              <AppText
                title={'View Profile'}
                textColor={AppColors.WHITE}
                textSize={1.3}
                textFontWeight
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <LineBreak space={featured ? 2 : 1} />
    </View>
  );
};

export default ServicesCard;
