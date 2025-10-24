import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/AppHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useRegisterMutation} from '../../redux/services';
import {isValidDate, ShowToast, useCustomNavigation} from '../../utils/Hooks';

const SignUp = () => {
  const [state, setState] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    phone: '',
  });

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const {navigateToRoute} = useCustomNavigation();
  const [register, {isLoading}] = useRegisterMutation();

  const onChangeText = (value, text) => {
    setState(prevState => ({
      ...prevState,
      [value]: text,
    }));
  };

  console.log(state.dob);

  const onSignupPress = async () => {
    if (!state.full_name) {
      return ShowToast('Please enter your full name');
    } else if (!state.username) {
      return ShowToast('Please enter your username');
    } else if (!state.email) {
      return ShowToast('Please enter your email');
    } else if (!state.password) {
      return ShowToast('Please enter your password');
    } else if (state.password.length < 8) {
      return ShowToast('Your password is too weak');
    } else if (!day || !month || !year) {
      return ShowToast('Please enter your complete date of birth');
    } else if (!isValidDate(day, month, year)) {
      return ShowToast('Please enter a valid date of birth');
    } else if (!state.gender) {
      return ShowToast('Please select your gender');
    } else if (!state.phone) {
      return ShowToast('Please enter your phone number');
    }

    const formattedDOB = `${day.padStart(2, '0')}-${month.padStart(
      2,
      '0',
    )}-${year}`;

    const data = {
      email: state.email,
      password: state.password,
      fullName: state.full_name,
      userName: state.username,
      phoneNumber: state.phone,
      gender: state.gender,
      dob: formattedDOB,
    };

    try {
      const res = await register(data).unwrap();
      console.log('register response ====>', res);
      if (res.success) {
        navigateToRoute('CreateProfile', {data: res?.data});
        ShowToast(res.message);
      } else {
        ShowToast(res.message);
      }
    } catch (error) {
      console.log('failed to register ====>', error);
      ShowToast('Some problem occurred');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader goBack />
      <LineBreak space={10} />
      <AppText
        title={'Create a PostUp Account!'}
        textColor={AppColors.BLACK}
        textSize={2.5}
        textFontWeight
        textAlignment={'center'}
      />
      <LineBreak space={1} />
      <AppText
        title={'Where to GO, What to DO'}
        textColor={AppColors.LIGHTGRAY}
        textSize={2}
        textAlignment={'center'}
      />
      <LineBreak space={10} />

      <View style={{paddingHorizontal: responsiveWidth(5)}}>
        <View>
          <AppText
            title={'Full Name'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Enter full name'}
            value={state.full_name}
            onChangeText={text => onChangeText('full_name', text)}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
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
            onChangeText={text => onChangeText('username', text)}
            value={state.username}
            placeholderTextColor={AppColors.GRAY}
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
            inputPlaceHolder={'Input email'}
            value={state.email}
            onChangeText={text => onChangeText('email', text)}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Password'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Input password'}
            value={state.password}
            onChangeText={text => onChangeText('password', text)}
            placeholderTextColor={AppColors.GRAY}
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AppTextInput
              inputPlaceHolder={'DD'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              inputWidth={22}
              onChangeText={setDay}
              keyboardType={'numeric'}
              value={day}
              textAlign="center"
              maxLength={2}
            />
            <AppTextInput
              inputPlaceHolder={'MM'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              inputWidth={22}
              onChangeText={setMonth}
              value={month}
              keyboardType={'numeric'}
              textAlign="center"
              maxLength={2}
            />
            <AppTextInput
              inputPlaceHolder={'YYYY'}
              placeholderTextColor={AppColors.GRAY}
              borderRadius={5}
              inputWidth={22}
              value={year}
              onChangeText={setYear}
              keyboardType={'numeric'}
              textAlign="center"
              maxLength={4}
            />
          </View>
        </View>
        <LineBreak space={2} />
        <View>
          <AppText title={'Gender'} textColor={AppColors.BLACK} textSize={2} />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'Male'}
            value={state.gender}
            onChangeText={text => onChangeText('gender', text)}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText title={'Phone'} textColor={AppColors.BLACK} textSize={2} />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'123-456-7890'}
            value={state.phone}
            onChangeText={text => onChangeText('phone', text)}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
        </View>
      </View>

      <LineBreak space={4} />

      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <AppButton
          handlePress={onSignupPress}
          loading={isLoading}
          title={'Sign up'}
          borderRadius={5}
        />
        <LineBreak space={2} />
        <AppButton
          title={'Continue with Google'}
          borderRadius={5}
          borderWidth={1}
          borderColor={AppColors.BTNCOLOURS}
          bgColor={AppColors.WHITE}
          textColor={AppColors.BLACK}
          borderRightWidth={3}
          borderBottomWidth={3}
          handlePress={() => {}}
          leftIcon={
            <AntDesign
              name="google"
              size={responsiveFontSize(3)}
              color={AppColors.BLACK}
            />
          }
        />
        <LineBreak space={2} />
        <AppButton
          title={'Continue with Facebook'}
          borderRadius={5}
          borderWidth={1}
          borderColor={AppColors.BTNCOLOURS}
          bgColor={AppColors.WHITE}
          textColor={AppColors.BLACK}
          borderRightWidth={3}
          borderBottomWidth={3}
          handlePress={() => {}}
          leftIcon={
            <FontAwesome
              name="facebook-f"
              size={responsiveFontSize(3)}
              color={AppColors.BLACK}
            />
          }
        />
      </View>
      <LineBreak space={4} />
    </ScrollView>
  );
};

export default SignUp;
