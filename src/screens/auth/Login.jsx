import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import {responsiveWidth} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {useLoginMutation} from '../../redux/services';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {navigateToRoute} = useCustomNavigation();

  const [login, {isLoading}] = useLoginMutation();

  const onLoginPress = async () => {
    if(!username) {
      return ShowToast('Please enter your username')
    }  else if (!password) {
      return ShowToast('Please enter your password')
    } else {
      let data = {
        userName: username,
        password: password
      }
      await login(data).unwrap().then((res) => {
          console.log('login response ====>',res)
          ShowToast(res.message)
          // if(res.success) {

          // }
      }).catch((error) => {
         console.log('failed to login ====>',error)
         ShowToast('Some problem occured')
      })
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <LineBreak space={10} />
      <AppText
        title={'Login to PostUp'}
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
            title={'Username'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'username'}
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
          <LineBreak space={1} />
          {/* <TouchableOpacity onPress={() => navigateToRoute('ForgotPassword')}>
            <View style={{alignItems: 'flex-end'}}>
              <AppText
                title={'Forgot Username?'}
                textColor={AppColors.BLACK}
                textSize={1.7}
                borderBottomWidth={1}
              />
            </View>
          </TouchableOpacity> */}
        </View>
        <View>
          <AppText
            title={'Password'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <LineBreak space={1} />
          <AppTextInput
            inputPlaceHolder={'password'}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={AppColors.GRAY}
            borderRadius={5}
          />
          <LineBreak space={1} />
          <TouchableOpacity onPress={() => navigateToRoute('ForgotPassword')}>
            <View style={{alignItems: 'flex-end'}}>
              <AppText
                title={'Forgot Password?'}
                textColor={AppColors.BLACK}
                textSize={1.7}
                borderBottomWidth={1}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <LineBreak space={27} />

      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <AppButton
          title={'Login'}
          borderRadius={5}
          loading={isLoading}
          handlePress={() => onLoginPress()}
        />
        <LineBreak space={2} />
        <AppButton
          title={'Sign up'}
          borderRadius={5}
          borderWidth={1}
          borderColor={AppColors.BTNCOLOURS}
          bgColor={AppColors.WHITE}
          textColor={AppColors.BLACK}
          borderRightWidth={3}
          borderBottomWidth={3}
          handlePress={() => navigateToRoute('SignUp')}
        />
      </View>
    </ScrollView>
  );
};

export default Login;
