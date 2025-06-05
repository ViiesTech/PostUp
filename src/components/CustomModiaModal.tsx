import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import LineBreak from './LineBreak';
import AppColors from '../utils/AppColors';

type Props = {
  isVisible?: any;
  onClose?: any;
};

const CustomMediaModal = ({isVisible, onClose}: Props) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <LineBreak space={7} />
        {/* Preview Thumbnails Placeholder */}
        <View style={styles.thumbnailRow}>
          {[...Array(3)].map((_, index) => (
            <View key={index} style={styles.thumbnail} />
          ))}
        </View>

        {/* Option Buttons */}
        <TouchableOpacity style={[styles.button, {borderTopWidth: 0}]}>
          <Text style={styles.buttonText}>PHOTOS OR VIDEOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>FILE UPLOAD</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: responsiveHeight(4),
    width: responsiveWidth(90),
    alignItems: 'center',
  },
  thumbnailRow: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(3),
  },
  thumbnail: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    marginHorizontal: responsiveWidth(1.5),
  },
  button: {
    paddingVertical: responsiveHeight(2),
    borderTopWidth: 2,
    borderColor: '#eee',
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.BTNCOLOURS, // Teal-ish blue
    fontWeight: '600',
  },
  cancelText: {
    color: 'red',
    fontWeight: '600',
  },
});

export default CustomMediaModal;
