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
          marginHorizontal: responsiveWidth(7),
          borderRadius: 10,
          position: 'relative',
        }}>
        <LineBreak space={3} />
        <AppText
          title={'Logout'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textwidth={60}
          textAlignment={'center'}
          textFontWeight
        />
        <LineBreak space={2} />
        <AppText
          title={'Are you sure you want to logout'}
          textColor={AppColors.GRAY}
          textSize={2}
          textAlignment={'center'}
          lineHeight={2.5}
          textwidth={40}
        />
        <LineBreak space={3.5} />
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <AppButton
            title="Cancel"
            textColor={AppColors.BLACK}
            bgColor={AppColors.WHITE}
            buttoWidth={40}
            padding={15}
            borderColor={AppColors.BTNCOLOURS}
            handlePress={exploreOnPress}
          />
          <AppButton
            title="Logout"
            textColor={AppColors.WHITE}
            bgColor={'#E55B13'}
            buttoWidth={40}
            padding={15}
            handlePress={submitOnPress}
          />
        </View>
        <LineBreak space={3} />
      </View>
    </Modal>
  );
};

export default WelcomeModal;
