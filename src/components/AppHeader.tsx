/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import BackIcon from './AppTextComps/BackIcon';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import LineBreak from './LineBreak';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  heading?: string;
  subheading?: string;
  Rightheading?: string;
  icon?: any;
  goBack?: boolean;
  borderBottomWidth?: any;
  borderBottomColor?: any;
  textFontWeight?: any;
  isCenteredHead?: any;
  taskId?: any;
  isCenteredHeadWidth?: any;
  headerBg?: any;
  privateChat?: any;
  paddingBottom?: any;
  textTransform?: any;
  privateMessages?: any;
  profImg?: any;
  arrowWhite?:any;
};

const AppHeader = ({
  Rightheading,
  heading,
  subheading,
  icon,
  goBack,
  borderBottomWidth,
  borderBottomColor,
  textFontWeight,
  isCenteredHead,
  taskId,
  isCenteredHeadWidth,
  headerBg,
  paddingBottom,
  privateChat,
  textTransform,
  privateMessages,
  profImg,
  arrowWhite,
}: props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingTop: responsiveHeight(3),
        paddingHorizontal: responsiveWidth(4),
        borderBottomWidth: borderBottomWidth,
        borderBottomColor: borderBottomColor,
        backgroundColor: headerBg,
        paddingBottom: responsiveHeight(paddingBottom),
        position: 'relative',
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: isCenteredHeadWidth
              ? responsiveWidth(isCenteredHeadWidth)
              : responsiveWidth(60),
            justifyContent: isCenteredHead ? 'space-between' : 'flex-start',
            alignItems: 'center',
          }}>
          {goBack && (
            <View style={{marginRight: responsiveWidth(3)}}>
              <BackIcon arrowWhite={arrowWhite} />
            </View>
          )}
          <View>
            <View
              style={
                privateMessages
                  ? {flexDirection: 'row', gap: 12, alignItems: 'center'}
                  : null
              }>
              {profImg}
              <AppText
                title={heading}
                textSize={2.5}
                textColor={AppColors.BLACK}
                textFontWeight={textFontWeight}
                textTransform={textTransform}
              />
            </View>
            <LineBreak space={0.3} />
            {taskId && (
              <AppText
                title={taskId}
                textSize={1.3}
                textColor={AppColors.DARKGRAY}
                textFontWeight={textFontWeight}
                textAlignment={'center'}
              />
            )}
          </View>
        </View>
        {privateChat && <LineBreak space={2} />}
        <View style={privateChat ? {flexDirection: 'row', gap: 5} : {}}>
          {privateChat && subheading && (
            <Ionicons
              name="location"
              size={responsiveFontSize(2.2)}
              color={AppColors.BTNCOLOURS}
            />
          )}
          {subheading && (
            <AppText
              title={subheading}
              textColor={'#777777'}
              textSize={privateChat ? 1.6 : 2}
              textwidth={privateChat ? 60 : 100}
              lineHeight={privateChat ? 2.3 : null}
            />
          )}
        </View>
        {privateChat && <LineBreak space={1} />}
      </View>
      {icon}

      {/* <AppText
        title={Rightheading}
        textFontWeight
        textSize={2}
        textColor={AppColors.BLACK}
      /> */}
    </View>
  );
};

export default AppHeader;
