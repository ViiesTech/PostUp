/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
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

const CreateProfile = ({route}) => {
  const {navigateToRoute} = useCustomNavigation();
  const params = route?.params?.data;
  const [state, setState] = useState({
    full_name: params?.fullName,
    username: params?.userName,
    email: params?.email,
    dob: params?.dob,
    gender: params?.gender,
    phone: JSON.stringify(params?.phoneNumber),
  });

  const [d, m, y] = params?.dob.split('-');

  const [day, setDay] = useState(d.padStart(2, '0'));
  const [month, setMonth] = useState(m.padStart(2, '0'));
  const [year, setYear] = useState(y);
  const [createProfile, {isLoading}] = useCreateProfileMutation();
  const [image, setImage] = useState('');

  const onChangeText = (value, text) => {
    setState(prevState => ({
      ...prevState,
      [value]: text,
    }));
  };

  const handleProfileImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const onCreateProfilePress = async () => {
    if (!state.full_name) {
      return ShowToast('Please enter your full name');
    } else if (!state.username) {
      return ShowToast('Please enter your username');
    } else if (!state.email) {
      return ShowToast('Please enter your email');
    } else if (!day || !month || !year) {
      return ShowToast('Please enter your complete date of birth');
    } else if (!isValidDate(day, month, year)) {
      return ShowToast('Please enter a valid date of birth');
    } else if (!state.gender) {
      return ShowToast('Please select your gender');
    } else if (!state.phone) {
      return ShowToast('Please enter your phone number');
    }else if (!image) {
      return ShowToast('Please enter your Profile Image');
    }

    const formattedDOB = `${day.padStart(2, '0')}-${month.padStart(
      2,
      '0',
    )}-${year}`;

     const formData = new FormData();
      formData.append('id', params?._id);
      formData.append('email', state.email);
      formData.append('fullName', state.full_name);
      formData.append('userName', state.username);
      formData.append('phoneNumber', state.phone);
      formData.append('gender', state.gender);
      formData.append('dob', formattedDOB);
      formData.append('longitude', '17.4067');
      formData.append('latitude', '78.477');

      if (image) {
        formData.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }

      console.log(formData)

    try {
      const res = await createProfile(formData).unwrap();
      console.log('create profile response ====>', res);
      if (res.success) {
        navigateToRoute('TermsOfService');
        ShowToast(res.message);
      }else {
        ShowToast(res.message);
      }
    } catch (error) {
      console.log('failed to create profile ====>', error);
      ShowToast('Some problem occurred');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader goBack />
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
              title={'Full Name'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Input full name'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              value={state.full_name}
              onChangeText={text => onChangeText('full_name', text)}
            />
          </View>
          <LineBreak space={2} />
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
              title={'Email Address'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Input email address'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              value={state.email}
              onChangeText={text => onChangeText('email', text)}
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
                onChangeText={setDay}
                keyboardType={'numeric'}
                value={day}
                maxLength={2}
              />
              <AppTextInput
                inputPlaceHolder={'DD'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={22}
                textAlignVertical={'center'}
                textAlign={'center'}
                onChangeText={setMonth}
                value={month}
                keyboardType={'numeric'}
                maxLength={2}
              />
              <AppTextInput
                inputPlaceHolder={'YYYY'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={22}
                textAlignVertical={'center'}
                textAlign={'center'}
                value={year}
                onChangeText={setYear}
                keyboardType={'numeric'}
                maxLength={4}
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
            <AppText title={'Phone'} textColor={AppColors.BLACK} textSize={2} />
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
          <View>
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
                  onPress={() => navigateToRoute('AllowAccess')}
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
          </View>
          <LineBreak space={4} />
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
  );
};

export default CreateProfile;
