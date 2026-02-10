/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../../components/AppButton';
import SVGXml from '../../components/SVGXML';
import AppIcons from '../../assets/icons/AppIcons';
import {ShowToast, useCustomNavigation} from '../../utils/Hooks';
import {useLazyGetEventByIdQuery} from '../../redux/services';
import {IMAGE_URL} from '../../redux/constant';
import ReviewCard from '../../components/ReviewCard';
import moment from 'moment';

const comments = [
  {
    id: 1,
    username: 'Alexander',
    time: '7h',
    userProf: AppImages.user,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    id: 2,
    username: 'Alexander',
    time: '7h',
    userProf: AppImages.user,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
];

const EventDetails = ({route}) => {
  const {navigateToRoute} = useCustomNavigation();
  const eventId = route?.params?.eventId;
  const [getEventById, {data, error, isLoading}] = useLazyGetEventByIdQuery();
  const event = data?.data;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    handleFetch(eventId);
  }, [eventId]);

  const handleFetch = async () => {
    await getEventById(eventId)
      .unwrap()
      .then(res => {
        if (!res.success) {
          ShowToast(res.message);
        }
      })
      .catch(err => {
        console.log(err);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to fetch events',
        );
      });
  };

  const handleScrollEnd = e => {
    const index = Math.round(
      e.nativeEvent.contentOffset.x / responsiveWidth(100),
    );
    setActiveIndex(index);
  };

  console.log('event:-', event);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={AppColors.lowGreen} size={'large'} />
        </View>
      ) : (
        <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
          <View>
            <FlatList
              data={event?.event?.eventImage}
              horizontal
              ref={flatListRef}
              pagingEnabled
              onMomentumScrollEnd={handleScrollEnd}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <ImageBackground
                  source={{uri: `${IMAGE_URL}${item}`}}
                  style={{
                    height: responsiveHeight(50),
                    width: responsiveWidth(100),
                  }}
                  imageStyle={{
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}>
                  <LineBreak space={2} />
                  {index === 0 && <AppHeader goBack arrowWhite />}
                  {/* <AppHeader goBack arrowWhite /> */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    {event?.event?.eventImage?.map((_, index) => (
                      <View
                        key={index}
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                          marginHorizontal: 4,
                          backgroundColor:
                            activeIndex === index ? '#00C853' : '#D3D3D3', // active/inactive color
                        }}
                      />
                    ))}
                  </View>
                  <LineBreak space={2} />
                </ImageBackground>
              )}
            />
          </View>

          <ScrollView style={{flex: 1}}>
            <LineBreak space={2} />
            <View style={{paddingHorizontal: responsiveWidth(5)}}>
              <AppText
                title={event?.event?.eventName}
                textColor={AppColors.BLACK}
                textSize={2.5}
                textTransform={'capitalize'}
                textFontWeight
              />
              <LineBreak space={1} />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppText
                  title={'Description : '}
                  textColor={AppColors.BLACK}
                  textSize={2.5}
                  textTransform={'capitalize'}
                  textFontWeight
                />
                <AppText
                  title={event?.event?.description}
                  textColor={AppColors.GRAY}
                  textSize={2.5}
                  textTransform={'capitalize'}
                />
              </View>

              <LineBreak space={2} />

              <View
                style={{
                  flexDirection: 'row',
                  gap: 25,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <FontAwesome
                    name="calendar"
                    size={responsiveFontSize(2)}
                    color={AppColors.darkYellow}
                  />
                  <AppText
                    title={event?.event?.date}
                    textColor={AppColors.LIGHTGRAY}
                    textSize={1.4}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <Octicons
                    name="location"
                    size={responsiveFontSize(2.2)}
                    color={AppColors.darkYellow}
                  />
                  <AppText
                    title={event?.event?.locationName}
                    textColor={AppColors.LIGHTGRAY}
                    textSize={1.4}
                  />
                </View>
              </View>

              <LineBreak space={2} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <AppButton
                  title={'Share'}
                  borderRadius={5}
                  handlePress={() => {}}
                  textSize={1.5}
                  padding={8}
                  buttoWidth={25}
                />

                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                  <TouchableOpacity>
                    <SVGXml icon={AppIcons.facebook} width={20} height={20} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <SVGXml icon={AppIcons.instagram} width={20} height={20} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <SVGXml icon={AppIcons.twitter} width={20} height={20} />
                  </TouchableOpacity>
                </View>
              </View>

              <LineBreak space={3} />

              {/* <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Image
              source={AppImages.user}
              style={{width: 40, height: 40, borderRadius: 100}}
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
                  title={'Alex Charlie'}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                  textFontWeight
                />
                <AppText
                  title={'Event Organizer'}
                  textColor={AppColors.LIGHTGRAY}
                  textSize={1.3}
                />
              </View>
              <AppButton
                title={'Hey’s'}
                borderRadius={5}
                handlePress={() => navigateToRoute('PrivateMessages')}
                textSize={1.4}
                padding={6}
                buttoWidth={18}
              />
            </View>
          </View> */}
              {/* <LineBreak space={2} /> */}
            </View>

            {/* <View
              style={{
                borderTopWidth: 1,
                borderTopColor: AppColors.GRAY,
                paddingHorizontal: responsiveWidth(5),
                paddingVertical: responsiveHeight(1.8),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <AppText
                  title={'Comments'}
                  textColor={AppColors.BLACK}
                  textSize={2.8}
                  textFontWeight
                />
                <TouchableOpacity>
                  <AppText
                    title={'See All'}
                    textColor={AppColors.LIGHTGRAY}
                    textSize={1.5}
                    borderBottomWidth={1}
                    borderBottomColor={AppColors.LIGHTGRAY}
                  />
                </TouchableOpacity>
              </View>

              <LineBreak space={2} />

              <FlatList
                data={comments}
                ItemSeparatorComponent={<LineBreak space={3} />}
                renderItem={({item}) => {
                  return (
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
                            source={item.userProf}
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
                                title={item.username}
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
                        <LineBreak space={1} />
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
                          onPress={() => navigateToRoute('PrivateMessages')}>
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
                  );
                }}
              />
            </View> */}

            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: AppColors.GRAY,
                paddingHorizontal: responsiveWidth(5),
                paddingVertical: responsiveHeight(1.8),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: responsiveWidth(3),
                    alignItems: 'center',
                  }}>
                  <AppText
                    title={'Reviews'}
                    textColor={AppColors.BLACK}
                    textSize={2}
                    textFontWeight
                  />
                  {/* <FontAwesome
                    name="star"
                    size={responsiveFontSize(2)}
                    color={AppColors.Yellow}
                  /> */}
                  {/* <AppText
                    title={'4.9 (12)'}
                    textColor={AppColors.BLACK}
                    textSize={2}
                  /> */}
                </View>

                {event?.reviews?.length !== 0 && (
                  <TouchableOpacity
                    onPress={() =>
                      navigateToRoute('AllReview', {reviews: event?.reviews})
                    }>
                    <AppText
                      title={'See All'}
                      textColor={AppColors.LIGHTGRAY}
                      textSize={1.5}
                      borderBottomWidth={1}
                      borderBottomColor={AppColors.LIGHTGRAY}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {event?.reviews?.length === 0 ? (
              <AppText
                title={'Reviews Not Found'}
                textFontWeight
                textSize={2}
                textAlignment={'center'}
                textColor={AppColors.BLACK}
              />
            ) : (
              <FlatList
                data={event?.reviews}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: responsiveWidth(4),
                  paddingHorizontal: responsiveWidth(5),
                }}
                renderItem={({item}) => (
                  <ReviewCard
                    image={item?.image ? item?.image : AppImages.event}
                    day={moment(item?.createdAt).fromNow()}
                    desc={item.message}
                    name={`${item?.eventId?.adminId?.fullName}`}
                    rating={item?.stars}
                  />
                )}
              />
            )}

            <LineBreak space={8} />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default EventDetails;
