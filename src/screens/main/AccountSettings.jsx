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
import AppImages from '../../assets/images/AppImages';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import PhoneInputScreen from '../../components/PhoneInput';
import AppButton from '../../components/AppButton';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {useSelector} from 'react-redux';
import {IMAGE_URL} from '../../redux/constant';
import {useCreateProfileMutation} from '../../redux/services';
import ImagePicker from 'react-native-image-crop-picker';

const AccountSettings = () => {
  const {navigateToRoute} = useCustomNavigation();
  const {user} = useSelector(state => state?.persistedData);
  const [state, setState] = useState({
    full_name: user?.fullName,
    username: user?.userName,
    email: user?.email,
    dob: user?.dob,
    gender: user?.gender,
    locationName: user?.locationName,
    phone: JSON.stringify(user?.phoneNumber),
  });
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
    } else if (!state.phone) {
      return ShowToast('Please enter your phone number');
    } 

    const formData = new FormData();
    formData.append('id', user?._id);
    formData.append('fullName', state.full_name);
    formData.append('userName', state.username);
    formData.append('phoneNumber', state.phone);
    formData.append('longitude', '17.4067');
    formData.append('latitude', '78.477');

    if (image) {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
    }

    try {
      const res = await createProfile(formData).unwrap();
      if (res.success) {
        ShowToast(res.message);
      } else {
        ShowToast(res.message);
      }
    } catch (error) {
      console.log('failed to update profile ====>', error);
      ShowToast('Some problem occurred');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="Edit Profile"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={60}
      />
      <LineBreak space={4} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={image ? {uri: image} : {uri: `${IMAGE_URL}${user?.image}`}}
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
              onPress={() => handleProfileImage()}
              >
              <AntDesign
                name="plus"
                size={responsiveFontSize(3)}
                color={AppColors.BLACK}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <LineBreak space={8} />

        <View>
          <View>
            <AppText
              title={'Full Name'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Ronald'}
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
              inputPlaceHolder={'Sustroharjo'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              value={state.username}
              onChangeText={text => onChangeText('username', text)}
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
              inputPlaceHolder={'sustroharjo.ronald@email.com'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              value={state.email}
              editable={false}
              onChangeText={text => onChangeText('email', text)}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Phone Number'}
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
          <View>
            {/* <AppText
              title={'Location'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />

            <AppTextInput
              inputPlaceHolder={'location Name'}
              placeholderTextColor={AppColors.GRAY}
              value={state.locationName}
              onChangeText={text => onChangeText('locationName', text)}
              borderRadius={5}
            /> */}

            {/* <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <AppTextInput
                inputPlaceHolder={'Street'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={23}
              />
              <AppTextInput
                inputPlaceHolder={'City'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={23}
              />
              <AppTextInput
                inputPlaceHolder={'State'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={23}
              />
            </View> */}
          </View>
          {/* <LineBreak space={2} /> */}
          <View>
            <AppText
              title={'Password'}
              textColor={AppColors.BLACK}
              textSize={2}
            />
            <LineBreak space={1} />

            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <AppTextInput
                inputPlaceHolder={'password'}
                placeholderTextColor={AppColors.GRAY}
                borderRadius={5}
                inputWidth={45}
                value={'newpassword'}
                secureTextEntry={true}
                editable={false}
              />
              <AppButton
                title={'Change Password'}
                borderRadius={5}
                handlePress={() => navigateToRoute('ChangePassword')}
                textSize={1.5}
                padding={17}
                textFontWeight={false}
                buttoWidth={36}
              />
            </View>

            <LineBreak space={8} />

            <View>
              <AppButton
                title={'Save Changes'}
                borderRadius={5}
                handlePress={() => onCreateProfilePress()}
                loading={isLoading}
              />
            </View>
            <LineBreak space={2} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountSettings;
