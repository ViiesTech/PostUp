/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import AppColors from '../utils/AppColors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const PhoneInputScreen = () => {
  const phoneRef = useRef(null);
  const countryPickerRef = useRef(null);
  const [pickerData, setPickerData] = useState([]);

  useEffect(() => {
    if (phoneRef.current) {
      setPickerData(phoneRef.current.getPickerData());
    }
  }, []);

  const onPressFlag = () => {
    countryPickerRef.current?.open();
  };

  const selectCountry = country => {
    phoneRef.current?.selectCountry(country.iso2);
  };

  return (
    <View>
      <PhoneInput
        ref={phoneRef}
        onPressFlag={onPressFlag}
        initialCountry="uk"
        initialValue="1114672399"
        style={{
          paddingHorizontal: responsiveWidth(7),
          height: responsiveHeight(7),
          borderRadius: 5,
          borderWidth: 1,
          borderColor: AppColors.GRAY,
        }}
        textStyle={{color: AppColors.GRAY, marginLeft: 10}}
        autoFormat
        textProps={{
          placeholder: '000 000 000',
        }}
      />

      {/* <CountryPicker
        ref={countryPickerRef}
        data={pickerData}
        onChange={(country) => selectCountry(country)}
        cancelText="Cancel"
      /> */}
    </View>
  );
};

export default PhoneInputScreen;
