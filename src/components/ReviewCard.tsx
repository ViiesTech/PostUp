/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import AppImages from '../assets/images/AppImages';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface reviewProps {
  image: ImageSourcePropType;
  name: string;
  day: string;
  desc: string;
  rating: string;
  local: string;
  style: ViewStyle;
}

const ReviewCard = (props: reviewProps) => {
  return (
    <TouchableOpacity style={[styles.reviewStyle, props?.style]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Image
            style={styles.imageStyle}
            source={props?.image}
          />
          <View>
            <Text style={styles.name}>{props?.name}</Text>
            <Text style={styles.day}>{props?.day}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: responsiveWidth(2), alignItems: 'center' }}>
          <FontAwesome
            name="star"
            size={responsiveFontSize(2)}
            color={AppColors.Yellow}
          />
          <Text style={styles.ratingText}>{props?.rating || '5.0'}</Text>
        </View>
      </View>
      <Text style={styles.desc}>{props?.desc}</Text>
    </TouchableOpacity>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  reviewStyle: {
    borderWidth: 0.2,
    borderColor: AppColors.BLACK,
    borderRadius: 10,
    width: responsiveWidth(70),
    padding: responsiveHeight(1.5),
  },
  imageStyle: {
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: 100,
  },
  name: {
    color: AppColors.BLACK,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  day: {
    color: AppColors.LIGHTGRAY,
    fontSize: responsiveFontSize(1.8),
  },
  ratingText: {
    color: AppColors.BLACK,
    fontSize: responsiveFontSize(1.8),
  },
  desc: {
    width: responsiveWidth(65),
    marginTop: responsiveHeight(1),
    color: AppColors.LIGHTGRAY,
  },
});
