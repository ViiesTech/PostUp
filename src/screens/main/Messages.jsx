/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppImages from '../../assets/images/AppImages';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '../../components/AppButton';
import {useCustomNavigation} from '../../utils/Hooks';

const tab = [
  {id: 1, title: 'Messages'},
  {id: 2, title: 'Map'},
];

const messages = [
  {
    id: 1,
    userImg: AppImages.user,
    username: 'Taylor Jonhanson',
    time: '10:45',
    message: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    id: 2,
    userImg: AppImages.user,
    username: 'Taylor Jonhanson',
    time: '10:45',
    message: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    id: 3,
    userImg: AppImages.user,
    username: 'Taylor Jonhanson',
    time: '10:45',
    message: 'Lorem ipsum dolor sit amet consectetur.',
  },
];

const Messages = () => {
  const [activeTab, setActiveTab] = useState({id: 1, title: 'Messages'});
  const {navigateToRoute} = useCustomNavigation();
  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        goBack
        heading={activeTab?.title}
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={activeTab.id == 2 ? 52 : null}
        paddingBottom={2}
        borderBottomWidth={0.5}
        borderBottomColor={AppColors.DARKGRAY}
      />

      <LineBreak space={3} />

      <View style={{paddingHorizontal: responsiveWidth(5)}}>
        <FlatList
          data={tab}
          horizontal
          contentContainerStyle={{
            backgroundColor: AppColors.lowGreen,
            borderRadius: 100,
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor:
                    activeTab.id == item.id
                      ? AppColors.BTNCOLOURS
                      : AppColors.lowGreen,
                  width: responsiveWidth(45),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: responsiveHeight(1.5),
                  borderRadius: 100,
                }}
                onPress={() => setActiveTab({id: item.id, title: item.title})}>
                <AppText
                  title={item.title}
                  textColor={AppColors.WHITE}
                  textSize={2}
                  textFontWeight
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <LineBreak space={3} />

      {activeTab.id == 1 && (
        <FlatList
          data={messages}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  paddingVertical: responsiveHeight(2),
                  borderTopWidth: 1,
                  borderTopColor: AppColors.DARKGRAY,
                  paddingHorizontal: responsiveWidth(5),
                }}
                onPress={() => navigateToRoute('PrivateMessages')}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Image
                    source={item.userImg}
                    style={{width: 25, height: 25, borderRadius: 100}}
                  />
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                      }}>
                      <AppText
                        title={item.username}
                        textColor={AppColors.BLACK}
                        textSize={1.8}
                        textFontWeight
                      />
                      <AppText
                        title={item.time}
                        textColor={AppColors.GRAY}
                        textSize={1.5}
                      />
                    </View>
                    <LineBreak space={0.5} />
                    <AppText
                      title={item.message}
                      textColor={AppColors.LIGHTGRAY}
                      textSize={1.5}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {activeTab.id == 2 && (
        <View style={{paddingHorizontal: responsiveWidth(5)}}>
          <Image
            source={AppImages.msg_map}
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(62),
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />

          <LineBreak space={3} />

          <View
            style={{
              paddingVertical: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(2),
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <Image
                source={AppImages.user}
                style={{width: 45, height: 45, borderRadius: 100}}
              />
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: responsiveWidth(74),
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <AppText
                    title={'John Doe'}
                    textColor={AppColors.BLACK}
                    textSize={2}
                    textFontWeight
                  />
                  <TouchableOpacity>
                    <AntDesign
                      name="closecircleo"
                      size={responsiveFontSize(3.5)}
                      color={AppColors.BTNCOLOURS}
                    />
                  </TouchableOpacity>
                </View>
                <AppText
                  title={'Last active 3h ago'}
                  textColor={AppColors.LIGHTGRAY}
                  textSize={1.5}
                />
              </View>
            </View>
            <LineBreak space={4} />
            <AppButton
              title={'Chat'}
              borderRadius={5}
              buttoWidth={88}
              handlePress={() => navigateToRoute('PrivateMessages')}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Messages;
