/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import LineBreak from './LineBreak';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import AppButton from './AppButton';

type Props = {
  isVisible?: any;
  onBackdropPress?: any;
  submitOnPress?: any;
  exploreOnPress?: any;
};

const WelcomeModal = ({
  isVisible,
  onBackdropPress,
  submitOnPress,
  exploreOnPress,
}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.9}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={onBackdropPress}
      style={{
        flex: 1,
        margin: 0,
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: responsiveWidth(4),
          marginHorizontal: responsiveHeight(2),
          height: responsiveHeight(37),
          position: 'relative',
        }}>
        <LineBreak space={4} />
        <AppText
          title={'Take this task?'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textwidth={60}
          textAlignment={'center'}
          textFontWeight
        />
        <LineBreak space={2} />
        <AppText
          title={
            'Service kondensor AC dan tiga kipas angin minim mollit non deserut'
          }
          textColor={AppColors.GRAY}
          textSize={2}
          textFontWeight
          textAlignment={'center'}
          lineHeight={2.5}
          textwidth={60}
        />
        <LineBreak space={3.5} />
        <View style={{alignSelf: 'center'}}>
          <AppButton
            title="YES, TAKE THIS TASK"
            textColor={AppColors.WHITE}
            bgColor={AppColors.BTNCOLOURS}
            buttoWidth={85}
            padding={15}
            handlePress={submitOnPress}
          />

          <LineBreak space={1} />

          <AppButton
            title="CANCEL"
            textColor={AppColors.GRAY}
            bgColor={AppColors.WHITE}
            buttoWidth={85}
            padding={15}
            borderColor={AppColors.BTNCOLOURS}
            handlePress={exploreOnPress}
          />
        </View>
      </View>
    </Modal>
  );
};

export default WelcomeModal;
