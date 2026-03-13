/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppImages from '../../assets/images/AppImages';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppTextInput from '../../components/AppTextInput';
import {isValidDate, ShowToast, useCustomNavigation} from '../../utils/Hooks';
import AppButton from '../../components/AppButton';
import {useCreateProfileMutation} from '../../redux/services';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

const CreateProfile = ({route}) => {
  const {navigateToRoute} = useCustomNavigation();
  const {token, user} = useSelector(state => state?.persistedData);
  console.log('user', user._id);
  console.log('token', token);

  const params = route?.params?.data;
  const routeToken = route?.params?.token;
  const activeToken = routeToken || token;
  const [state, setState] = useState({
    username: params?.userName,
    dob: '',
    gender: '',
    phone: '',
  });

  const [d, m, y] = params?.dob?.split('-') || [];

  const [day, setDay] = useState(d?.padStart(2, '0'));
  const [month, setMonth] = useState(m?.padStart(2, '0'));
  const [year, setYear] = useState(y);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);
  const [createProfile, {isLoading}] = useCreateProfileMutation();
  const [image, setImage] = useState('');

  const onChangeText = (value, text) => {
    setState(prevState => ({
      ...prevState,
      [value]: text,
    }));
  };

  const handleProfileImage = async () => {
    console.log('Requesting permissions...');

    const requestAndroidReadPermission = async () => {
      try {
        // Android 13+ uses READ_MEDIA_IMAGES, older versions use READ_EXTERNAL_STORAGE
        const perm =
          Platform.OS === 'android' && Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        // If permission is already granted, continue
        const has = await PermissionsAndroid.check(perm);
        if (has) return true;

        const granted = await PermissionsAndroid.request(perm, {
          title: 'Photo Library Permission',
          message:
            'PostUp needs access to your photos to set your profile picture',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Android permission request error', err);
        return false;
      }
    };

    try {
      if (Platform.OS === 'android') {
        const ok = await requestAndroidReadPermission();
        if (!ok) {
          Alert.alert(
            'Permission Required',
            'Photo library permission is required to select images',
          );
          return;
        }
      }

      console.log('Opening image picker...');
      const picked = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
      });

      if (!picked) return;

      // image-crop-picker may return different uri fields across platforms/versions
      let pickedPath = picked.path || picked.sourceURL || picked.uri;

      // Normalize android file paths for older RN versions when needed
      if (Platform.OS === 'android' && pickedPath && !pickedPath.startsWith('file://') && !pickedPath.startsWith('content://')) {
        pickedPath = 'file://' + pickedPath;
      }

      console.log('Image selected:', pickedPath, picked);
      setImage(pickedPath);
    } catch (error) {
      console.log('ImagePicker Error:', error);
      // If user cancelled, image-crop-picker throws E_PICKER_CANCELLED — ignore
      if (error && error.code && error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  const onCreateProfilePress = async () => {
    if (!state.username) {
      return ShowToast('Please enter your username');
    } else if (!day || !month || !year) {
      return ShowToast('Please enter your complete date of birth');
    } else if (!isValidDate(day, month, year)) {
      return ShowToast('Please enter a valid date of birth');
    } else if (!state.gender) {
      return ShowToast('Please select your gender');
    } else if (!state.phone) {
      return ShowToast('Please enter your phone number');
    } else if (!image) {
      return ShowToast('Please enter your Profile Image');
    }

    const formattedDOB = `${month.padStart(2, '0')}-${day.padStart(
      2,
      '0',
    )}-${year}`;

    const formData = new FormData();
    // formData.append('id', user?._id);
    formData.append('userName', state.username);
    formData.append('phoneNumber', state.phone);
    formData.append('gender', state.gender);
    formData.append('dob', formattedDOB);
    // formData.append('longitude', '17.4067');
    // formData.append('latitude', '78.477');

    if (image) {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
    }

    console.log('formData:-', formData);

    try {
      const res = await createProfile({
        payload: formData,
        token: activeToken,
      }).unwrap();
      console.log('res in createProfile:-', res);
      ShowToast(res.message);
      // Navigation is handled automatically by Routes.jsx based on token + user.isupdated
    } catch (err) {
      console.log('err in createProfile:-', JSON.stringify(err, null, 2));
      ShowToast(err?.data?.message || 'Failed to update profile');
    }
  };

  console.log('params:-', JSON.stringify(params, null, 2));

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: AppColors.WHITE}}
      behavior="height">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: AppColors.WHITE}}>
        {/* <AppHeader goBack={false} /> */}
        <LineBreak space={3} />

        <View style={{paddingHorizontal: responsiveWidth(6)}}>
          <View style={{alignItems: 'center'}}>
            <AppText
              title={'Create Profile'}
              textColor={AppColors.BLACK}
              textSize={2.5}
              textFontWeight
              textAlignment={'center'}
            />
            <LineBreak space={1} />
            <AppText
              title={'Enter your info'}
              textColor={AppColors.LIGHTGRAY}
              textSize={2}
              textAlignment={'center'}
            />
            <LineBreak space={3} />
            <ImageBackground
              source={image ? {uri: image} : AppImages.user}
              style={{width: 120, height: 120, position: 'relative'}}
              imageStyle={{borderRadius: 100}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: AppColors.WHITE,
                  borderRadius: 100,
                  position: 'absolute',
                  bottom: responsiveHeight(-1),
                  right: responsiveWidth(-1),
                  elevation: 10,
                }}
                onPress={() => handleProfileImage()}>
                <AntDesign
                  name="plus"
                  size={responsiveFontSize(3)}
                  color={AppColors.BLACK}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <LineBreak space={5} />

          <View>
            <View>
              <AppText
                title={'Username'}
                textColor={AppColors.BLACK}
                textSize={2}
              />
              <LineBreak space={1} />
              <AppTextInput
                inputPlaceHolder={'Enter username'}
                placeholderTextColor={AppColors.GRAY}
                value={state.username}
                onChangeText={text => onChangeText('username', text)}
                borderRadius={5}
              />
            </View>
            <LineBreak space={2} />
            <View>
              <AppText
                title={'Date of Birth'}
                textColor={AppColors.BLACK}
                textSize={2}
              />
              <LineBreak space={1} />
              <View style={{flexDirection: 'row', gap: 18}}>
                <AppTextInput
                  inputPlaceHolder={'MM'}
                  placeholderTextColor={AppColors.GRAY}
                  borderRadius={5}
                  inputWidth={22}
                  textAlignVertical={'center'}
                  textAlign={'center'}
                  keyboardType={'number-pad'}
                  value={month}
                  maxLength={2}
                  ref={monthRef}
                  onChangeText={text => {
                    const digits = (text || '').replace(/[^0-9]/g, '').slice(0, 2);
                    setMonth(digits);
                    if (digits.length === 2) {
                      dayRef.current && dayRef.current.focus();
                    }
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && !month) {
                      // no previous field here
                    }
                  }}
                />

                <AppTextInput
                  inputPlaceHolder={'DD'}
                  placeholderTextColor={AppColors.GRAY}
                  borderRadius={5}
                  inputWidth={22}
                  textAlignVertical={'center'}
                  textAlign={'center'}
                  keyboardType={'number-pad'}
                  value={day}
                  maxLength={2}
                  ref={dayRef}
                  onChangeText={text => {
                    const digits = (text || '').replace(/[^0-9]/g, '').slice(0, 2);
                    setDay(digits);
                    if (digits.length === 2) {
                      yearRef.current && yearRef.current.focus();
                    }
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && !day) {
                      monthRef.current && monthRef.current.focus();
                    }
                  }}
                />

                <AppTextInput
                  inputPlaceHolder={'YYYY'}
                  placeholderTextColor={AppColors.GRAY}
                  borderRadius={5}
                  inputWidth={22}
                  textAlignVertical={'center'}
                  textAlign={'center'}
                  keyboardType={'number-pad'}
                  value={year}
                  maxLength={4}
                  ref={yearRef}
                  onChangeText={text => {
                    const digits = (text || '').replace(/[^0-9]/g, '').slice(0, 4);
                    setYear(digits);
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && !year) {
                      dayRef.current && dayRef.current.focus();
                    }
                  }}
                />
              </View>
            </View>
            <LineBreak space={2} />
            <View>
              <AppText
                title={'Gender'}
                textColor={AppColors.BLACK}
                textSize={2}
              />
              <LineBreak space={1} />
              <AppTextInput
                inputPlaceHolder={'Male'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                value={state.gender}
                onChangeText={text => onChangeText('gender', text)}
              />
            </View>
            <LineBreak space={2} />
            <View>
              <AppText
                title={'Phone'}
                textColor={AppColors.BLACK}
                textSize={2}
              />
              <LineBreak space={1} />
              <AppTextInput
                inputPlaceHolder={'123-456-7890'}
                placeholderTextColor={AppColors.GRAY}
                value={state.phone}
                onChangeText={text => onChangeText('phone', text)}
                borderRadius={5}
              />
            </View>
            <LineBreak space={2} />
            {/* <View>
              <AppText
                title={'Location'}
                textColor={AppColors.BLACK}
                textSize={2}
              />
              <LineBreak space={1} />
              <AppTextInput
                inputPlaceHolder={'Select Your Location'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={72}
                rightIcon={
                  <TouchableOpacity
                    // onPress={() => navigateToRoute('AllowAccess')}
                    style={{
                      backgroundColor: AppColors.darkYellow,
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="crosshairs-gps"
                      size={responsiveFontSize(2.2)}
                      color={AppColors.WHITE}
                    />
                  </TouchableOpacity>
                }
              />
            </View> */}
            <LineBreak space={2} />
            <AppButton
              title={'Continue'}
              borderRadius={5}
              handlePress={() => onCreateProfilePress()}
              loading={isLoading}
            />
            <LineBreak space={2} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProfile;
