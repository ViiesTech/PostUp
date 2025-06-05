/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import AppColors from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from './AppButton';
import {useNavigation} from '@react-navigation/native';
import SVGXml from './SVGXML';
import {APPICONS} from '../assets/icons/AppIcons';

type props = {
  item?: any;
  selectedCard?: any;
  onCardPress?: any;
  activeCardBgColor?: any;
  component?: any;
  favItem?: any;
  callOnPress?: any;
  chatOnPress?: any;
  services?: any;
  isHideClose?: any;
  isShowBadge?: any;
  viewDetailsHandlePress?: any;
  profiles?: any;
  homeComponent?: any;
};

const HistoryCard = ({
  item,
  selectedCard,
  onCardPress,
  activeCardBgColor,
  component,
  favItem,
  services,
  isHideClose,
  isShowBadge,
  viewDetailsHandlePress,
  profiles,
  homeComponent,
  callOnPress,
  chatOnPress,
}: props) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={{
        borderWidth: selectedCard?.id == item.id ? 0 : 1,
        borderColor: AppColors.ThemeBlue,
        backgroundColor: component
          ? AppColors.BLACK
          : selectedCard?.id == item.id
          ? activeCardBgColor
            ? activeCardBgColor
            : AppColors.ThemeBlue
          : AppColors.WHITE,
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(2),
        borderRadius: 10,
        position: 'relative',
      }}
      onPress={onCardPress}>
      {services && isHideClose ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            borderWidth: 1,
            marginHorizontal: responsiveWidth(1.5),
            marginVertical: responsiveHeight(0.5),
            width: 13,
            height: 13,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: AppColors.WHITE,
            borderColor:
              selectedCard?.id == item.id
                ? AppColors.WHITE
                : AppColors.ThemeBlue,
          }}>
          <AntDesign
            name={'close'}
            size={responsiveFontSize(1.2)}
            color={
              selectedCard?.id == item.id
                ? AppColors.BLACK
                : AppColors.ThemeBlue
            }
          />
        </TouchableOpacity>
      ) : null}
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <Image
          source={item.profImg}
          style={{
            width: component || profiles ? 80 : 70,
            height: component || profiles ? 80 : 70,
            borderRadius: component || profiles ? 10 : 100,
          }}
        />

        <View style={{gap: 4}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <AppText
              title={item.username}
              textColor={
                selectedCard?.id == item.id ? AppColors.WHITE : AppColors.BLACK
              }
              textSize={2}
              textFontWeight
              textTransform={'uppercase'}
            />
            {component || favItem || services || profiles ? (
              <View
                style={
                  services || profiles
                    ? {flexDirection: 'row', gap: 7, alignItems: 'center'}
                    : null
                }>
                {services || (profiles && isShowBadge) ? (
                  <SVGXml
                    icon={APPICONS.correct_badge}
                    width={25}
                    height={25}
                  />
                ) : null}
                {services || (profiles && isShowBadge) ? (
                  <SVGXml icon={APPICONS.simple_badge} width={25} height={25} />
                ) : null}
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 100,
                    borderColor:
                      selectedCard?.id == item.id
                        ? AppColors.WHITE
                        : AppColors.ThemeBlue,
                  }}>
                  <AntDesign
                    name={services || profiles ? 'hearto' : 'heart'}
                    size={responsiveFontSize(1.8)}
                    color={
                      selectedCard?.id == item.id
                        ? AppColors.WHITE
                        : AppColors.ThemeBlue
                    }
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <AppText
                title={item.status}
                textColor={
                  selectedCard?.id == item.id
                    ? AppColors.WHITE
                    : homeComponent
                    ? AppColors.BLACK
                    : AppColors.ThemeBlue
                }
                textSize={1.4}
                textFontWeight
              />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: component || services || favItem || profiles ? -7 : 0,
              gap: 5,
            }}>
            <AppText
              title={item.designation}
              textColor={
                selectedCard?.id == item.id ? AppColors.WHITE : AppColors.GRAY
              }
              textSize={1.3}
            />
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
              }}>
              <AppText
                title={item.rating}
                textColor={
                  selectedCard?.id == item.id ? AppColors.WHITE : AppColors.GRAY
                }
                textSize={1.3}
              />
              {item.rating && (
                <View style={{flexDirection: 'row', gap: 2}}>
                  {[...Array(3)].map((_, index) => (
                    <Ionicons
                      key={index}
                      name="star"
                      size={responsiveFontSize(1.3)}
                      color={AppColors.Yellow}
                    />
                  ))}
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              width: responsiveWidth(62),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {favItem || services ? (
              <View
                style={
                  services
                    ? {flexDirection: 'row', gap: 10, alignItems: 'center'}
                    : null
                }>
                <AppButton
                  title="view details"
                  textColor={
                    selectedCard?.id == item.id
                      ? services
                        ? AppColors.BLACK
                        : AppColors.ThemeBlue
                      : AppColors.WHITE
                  }
                  bgColor={
                    selectedCard?.id == item.id
                      ? AppColors.WHITE
                      : AppColors.BLACK
                  }
                  borderRadius={5}
                  buttoWidth={25}
                  textSize={1.2}
                  padding={7}
                  textFontWeight={false}
                  textTransform={'uppercase'}
                  handlePress={viewDetailsHandlePress}
                />
                {services && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 7,
                    }}>
                    {item.ml && (
                      <AppText
                        title={`${item.ml} ml`}
                        textColor={
                          selectedCard?.id == item.id
                            ? AppColors.WHITE
                            : AppColors.GRAY
                        }
                        textSize={1.4}
                      />
                    )}
                    {item.min && (
                      <AppText
                        title={`${item.min} mint`}
                        textColor={
                          selectedCard?.id == item.id
                            ? AppColors.WHITE
                            : AppColors.BLACK
                        }
                        textSize={1.4}
                        textFontWeight
                      />
                    )}
                  </View>
                )}
              </View>
            ) : null}
            {component || profiles || homeComponent ? (
              <View>
                {component || profiles ? (
                  <View>
                    <AppText
                      title={'Typically reply in'}
                      textColor={
                        selectedCard?.id == item.id
                          ? AppColors.WHITE
                          : AppColors.GRAY
                      }
                      textSize={1.4}
                    />
                    <AppText
                      title={`${item.time} seconds`}
                      textColor={
                        selectedCard?.id == item.id
                          ? AppColors.WHITE
                          : AppColors.GRAY
                      }
                      textSize={1.4}
                    />
                  </View>
                ) : null}

                {homeComponent && (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 4,
                      alignItems: 'center',
                    }}>
                    <AppText
                      title={item.appointmentDate}
                      textColor={
                        selectedCard?.id == item.id
                          ? AppColors.WHITE
                          : AppColors.DARKGRAY
                      }
                      textSize={1.4}
                    />
                    <AppText
                      title={'|'}
                      textColor={
                        selectedCard?.id == item.id
                          ? AppColors.WHITE
                          : AppColors.BLACK
                      }
                      textSize={1.4}
                    />
                    <AppText
                      title={item.appointmentTime}
                      textColor={
                        selectedCard?.id == item.id
                          ? AppColors.WHITE
                          : AppColors.BLACK
                      }
                      textSize={1.4}
                      textFontWeight
                    />
                  </View>
                )}
              </View>
            ) : (
              <View style={{gap: 4}}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 3,
                    alignItems: 'center',
                  }}>
                  {item.location && (
                    <Entypo
                      name="location-pin"
                      size={responsiveFontSize(1.8)}
                      color={
                        selectedCard?.id == item.id
                          ? AppColors.WHITE
                          : AppColors.DARKGRAY
                      }
                    />
                  )}
                  <AppText
                    title={item.location}
                    textColor={
                      selectedCard?.id == item.id
                        ? AppColors.WHITE
                        : AppColors.GRAY
                    }
                    textSize={1.3}
                  />
                </View>
                <AppText
                  title={item.date}
                  textColor={
                    selectedCard?.id == item.id
                      ? AppColors.WHITE
                      : AppColors.GRAY
                  }
                  textSize={1.3}
                />
              </View>
            )}
            {component || profiles || homeComponent ? (
              <View style={{flexDirection: 'row', gap: 15}}>
                <TouchableOpacity
                  style={{
                    padding: 7,
                    borderRadius: 100,
                    backgroundColor: AppColors.WHITE,
                  }}
                  onPress={() =>
                    nav.navigate('CallAndChatHistory', {screen: 'cALL hISTORY'})
                  }>
                  <Ionicons
                    name="call"
                    size={responsiveFontSize(2.2)}
                    color={
                      homeComponent ? AppColors.ThemeBlue : AppColors.BLACK
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 7,
                    borderRadius: 100,
                    backgroundColor: AppColors.WHITE,
                  }}
                  onPress={() =>
                    nav.navigate('CallAndChatHistory', {screen: 'cHAT hISTORY'})
                  }>
                  <AntDesign
                    name="wechat"
                    size={responsiveFontSize(2.2)}
                    color={
                      homeComponent ? AppColors.ThemeBlue : AppColors.BLACK
                    }
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <AppText
                title={item.price}
                textColor={
                  selectedCard?.id == item.id
                    ? AppColors.WHITE
                    : AppColors.BLACK
                }
                textSize={2.2}
                textFontWeight
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
