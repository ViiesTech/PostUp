/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import TwoOptionDropdown from '../../components/CustomDropDown';

const data = [
  {
    id: 1,
    profImg: AppImages.user,
    username: 'Alicia James',
    timeLeft: 'Top Poster',
    desc: 'Lorem ipsum simply dummy amet, consectetur sadipscing elitr, sed',
    likes: '196',
    comments: '20',
    shares: '5',
    productImg: AppImages.event,
  },
  {
    id: 2,
    profImg: AppImages.user,
    username: 'Alicia James',
    timeLeft: 'Casual Poster',
    desc: 'Lorem ipsum simply dummy amet, consectetur sadipscing elitr, sed',
    likes: '196',
    comments: '20',
    shares: '5',
    productImg: AppImages.event,
  },
];

const comments = [
  {
    id: 1,
    image: AppImages.event,
    name: 'Alexander',
    time: '7h',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea codo consequat. ',
  },
  {
    id: 2,
    image: AppImages.event,
    name: 'Alexander',
    time: '7h',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea codo consequat. ',
  },
];

const GeneralForum = () => {
  const nav = useNavigation();
  const [isShowComment, setIsshowComment] = useState({
    index: null,
    shown: false,
  });

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        goBack
        heading="General Forum"
        textFontWeight={true}
        isCenteredHead={true}
        icon={
          <TwoOptionDropdown
            onOption1Press={() => nav.navigate('CreatePost')}
            onOption2Press={() => nav.navigate('CreateEvent')}
          />
        }
      />
      <LineBreak space={2} />
      <FlatList
        data={data}
        ItemSeparatorComponent={<LineBreak space={4} />}
        ListFooterComponent={<LineBreak space={2} />}
        ListHeaderComponent={
          <>
            <LineBreak space={2} />
            <View
              style={{
                marginHorizontal: responsiveWidth(4),
                paddingHorizontal: responsiveWidth(3),
                paddingVertical: responsiveHeight(2),
                backgroundColor: AppColors.WHITE,
                elevation: 10,
                borderRadius: 5,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image
                  source={AppImages.user}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: AppColors.PEACHCOLOUR,
                  }}
                />
                <View>
                  <AppText
                    title={'Alicia Roth'}
                    textColor={AppColors.BLACK}
                    textSize={2.5}
                    textFontWeight
                  />
                  <LineBreak space={0.5} />
                  <AppText
                    title={'What do you want to talk about?'}
                    textColor={AppColors.LIGHTGRAY}
                    textSize={1.3}
                  />
                </View>
              </View>
              <LineBreak space={1} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: responsiveWidth(14),
                    gap: 15,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 7,
                    }}>
                    <FontAwesome
                      name="photo"
                      size={responsiveFontSize(1.5)}
                      color={AppColors.LIGHTGRAY}
                    />
                    <AppText
                      title={'Photos'}
                      textColor={AppColors.LIGHTGRAY}
                      textSize={1.2}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 7,
                    }}>
                    <Entypo
                      name="folder-video"
                      size={responsiveFontSize(1.5)}
                      color={AppColors.LIGHTGRAY}
                    />
                    <AppText
                      title={'Videos'}
                      textColor={AppColors.LIGHTGRAY}
                      textSize={1.2}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: AppColors.BTNCOLOURS,
                    borderRadius: 15,
                    borderBottomLeftRadius: 0,
                  }}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={responsiveFontSize(4)}
                    color={AppColors.WHITE}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <LineBreak space={2} />
          </>
        }
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                marginHorizontal: responsiveWidth(4),
                paddingHorizontal: responsiveWidth(3),
                paddingVertical: responsiveHeight(2),
                backgroundColor: AppColors.WHITE,
                elevation: 10,
                borderRadius: 5,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image
                  source={item.profImg}
                  style={{width: 45, height: 45, borderRadius: 100}}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: responsiveWidth(72),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <AppText
                        title={item.username}
                        textColor={AppColors.BLACK}
                        textSize={2.2}
                        textFontWeight
                      />
                      <View style={{paddingTop: responsiveHeight(0.7)}}>
                        <AppText
                          title={'added a new Post Up'}
                          textColor={AppColors.LIGHTGRAY}
                          textSize={1.2}
                        />
                      </View>
                    </View>

                    <View>
                      <Feather
                        name="alert-circle"
                        size={responsiveFontSize(2.5)}
                        color={AppColors.LIGHTGRAY}
                      />
                    </View>
                  </View>
                  <AppText
                    title={item.timeLeft}
                    textColor={AppColors.LIGHTGRAY}
                    textSize={1.3}
                  />
                </View>
              </View>

              <LineBreak space={2} />
              <View
                style={{
                  borderWidth: 1,
                  borderColor: AppColors.BTNCOLOURS,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    paddingHorizontal: responsiveWidth(3),
                    paddingVertical: responsiveHeight(1.5),
                  }}>
                  <AppText
                    title={item.desc}
                    textColor={AppColors.LIGHTGRAY}
                    textSize={1.8}
                  />
                </View>
                <Image
                  source={item.productImg}
                  style={{
                    width: responsiveWidth(85.5),
                    height: responsiveHeight(25),
                    borderRadius: 5,
                  }}
                />
              </View>

              <LineBreak space={2} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 25}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 7,
                    }}>
                    <AntDesign
                      name="like2"
                      size={responsiveFontSize(2)}
                      color={AppColors.LIGHTGRAY}
                    />
                    <AppText
                      title={item.likes}
                      textColor={AppColors.LIGHTGRAY}
                      textSize={1.8}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (isShowComment.index == index && isShowComment.shown) {
                        setIsshowComment({
                          index: index,
                          shown: !isShowComment.shown,
                        });
                      } else {
                        setIsshowComment({
                          index: index,
                          shown: true,
                        });
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 7,
                    }}>
                    <MaterialCommunityIcons
                      name="comment-text-multiple-outline"
                      size={responsiveFontSize(2)}
                      color={AppColors.LIGHTGRAY}
                    />
                    <AppText
                      title={item.comments}
                      textColor={AppColors.LIGHTGRAY}
                      textSize={1.8}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 7,
                    }}>
                    <Fontisto
                      name="share-a"
                      size={responsiveFontSize(2)}
                      color={AppColors.LIGHTGRAY}
                    />
                    <AppText
                      title={item.shares}
                      textColor={AppColors.LIGHTGRAY}
                      textSize={1.8}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <LineBreak space={2} />

              {isShowComment.index == index && isShowComment.shown && (
                <FlatList
                  data={comments}
                  ItemSeparatorComponent={<LineBreak space={3} />}
                  renderItem={({item}) => (
                    <>
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          borderColor: AppColors.GRAY,
                          paddingHorizontal: responsiveWidth(2),
                          paddingVertical: responsiveHeight(1),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 10,
                            alignItems: 'center',
                          }}>
                          <Image
                            source={item.image}
                            style={{width: 30, height: 30, borderRadius: 100}}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: responsiveWidth(77),
                              alignItems: 'center',
                              gap: 20,
                            }}>
                            <View>
                              <AppText
                                title={item.name}
                                textColor={AppColors.BLACK}
                                textSize={1.5}
                                textFontWeight
                              />
                              <AppText
                                title={item.time}
                                textColor={AppColors.LIGHTGRAY}
                                textSize={1}
                              />
                            </View>
                          </View>
                        </View>
                        <LineBreak space={1} />
                        <AppText
                          title={item.desc}
                          textColor={AppColors.DARKGRAY}
                          textSize={1.5}
                          lineHeight={2.2}
                        />
                      </View>
                      <LineBreak space={1} />
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: responsiveWidth(2),
                          gap: 10,
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity>
                          <AppText
                            title={'Reply'}
                            textColor={AppColors.LIGHTGRAY}
                            textSize={1.5}
                            borderBottomWidth={1}
                            borderBottomColor={AppColors.LIGHTGRAY}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => nav.navigate('PrivateMessages')}>
                          <AppText
                            title={'Hey"s'}
                            textColor={AppColors.lowGreen}
                            textSize={1.5}
                            borderBottomWidth={1}
                            borderBottomColor={AppColors.lowGreen}
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                />
              )}
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default GeneralForum;
