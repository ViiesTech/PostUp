/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import AppColors from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import LineBreak from './LineBreak';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCustomNavigation} from '../utils/Hooks';
import AppImages from '../assets/images/AppImages';

type Props = {
  item?: any;
  taskDetails?: any;
  customerDetails?: any;
  statusOnPress?: any;
  removeSpace?: any;
};

const ActiveTaskCard = ({
  item,
  taskDetails,
  customerDetails,
  statusOnPress,
  removeSpace,
}: Props) => {
  const {navigateToRoute} = useCustomNavigation();

  return (
    <TouchableOpacity
      style={{gap: 5}}
      onPress={() => {
        if (!taskDetails && !customerDetails) {
          navigateToRoute('TaskDetails');
        }
      }}>
      <View
        style={{
          backgroundColor: AppColors.WHITE,
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <AppText
          title={item.taskId}
          textColor={AppColors.GRAY}
          textSize={1.7}
        />

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingHorizontal: responsiveWidth(4),
              paddingVertical: responsiveHeight(0.6),
              backgroundColor: '#D9D9D9',
            }}>
            <AppText
              title={item.taskTime}
              textColor={'#676565'}
              textSize={1.7}
              textFontWeight
            />
          </View>
          <TouchableOpacity
            onPress={statusOnPress}
            style={{
              paddingHorizontal: responsiveWidth(4),
              width: responsiveWidth(25),
              alignItems: 'center',
              paddingVertical: responsiveHeight(0.6),
              backgroundColor:
                item.status === 'In Progress'
                  ? AppColors.Yellow
                  : item.status === 'Assigned'
                  ? AppColors.lightRed
                  : item.status === 'Completed'
                  ? AppColors.BTNCOLOURS
                  : '#D1F4FF',
            }}>
            <AppText
              title={item.status}
              textColor={
                item.status === 'In Progress'
                  ? AppColors.WHITE
                  : item.status === 'Assigned'
                  ? 'red'
                  : item.status === 'Completed'
                  ? AppColors.WHITE
                  : AppColors.PRIMARY
              }
              textSize={1.5}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: AppColors.WHITE,
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
          paddingTop: removeSpace ? null : responsiveHeight(3),
        }}>
        <AppText
          title={item.desc}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />
        <LineBreak space={0.5} />
        <AppText
          title={item.timeLeft}
          textColor={'red'}
          textSize={1.7}
          textFontWeight
        />
        {removeSpace ? null : <LineBreak space={taskDetails ? 3 : 2} />}
        {item.location && item.km ? (
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
            }}>
            {item.location && (
              <Ionicons
                name={'location-sharp'}
                size={responsiveFontSize(3.5)}
                color={AppColors.BTNCOLOURS}
              />
            )}
            <View>
              <AppText
                title={item.location}
                textColor={AppColors.LIGHTGRAY}
                textSize={1.8}
              />
              <LineBreak space={0.5} />
              <AppText
                title={item.km}
                textColor={AppColors.DARKGRAY}
                textSize={1.6}
              />
            </View>
          </View>
        ) : null}

        {customerDetails ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Image
              source={AppImages.service_img}
              style={{width: 30, height: 30, borderRadius: 100}}
            />
            <View>
              <AppText
                title={'you'}
                textColor={AppColors.BLACK}
                textSize={2}
                textFontWeight
              />
            </View>
          </View>
        ) : null}

        {customerDetails ? <LineBreak space={2} /> : null}

        {taskDetails || customerDetails ? (
          <View style={{gap: 7}}>
            <AppText
              title={item.unitInfo}
              textColor={AppColors.DARKGRAY}
              textSize={1.7}
              textFontWeight
            />
            <AppText
              title={item.samsung}
              textColor={AppColors.BLACK}
              textSize={1.7}
              textFontWeight
            />
            <TouchableOpacity>
              <AppText
                title={item.viewDetails}
                textColor={AppColors.BTNCOLOURS}
                textSize={1.7}
                textFontWeight
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ActiveTaskCard;
