/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
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
import {useCustomNavigation} from '../../utils/Hooks';

const comments = [
  {
    id: 1,
    username: 'Alexander',
    time: '7h',
    userProf: AppImages.user,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea codo consequat. ',
  },
  {
    id: 2,
    username: 'Alexander',
    time: '7h',
    userProf: AppImages.user,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea codo consequat. ',
  },
];

const EventDetails = () => {
  const {navigateToRoute} = useCustomNavigation();
  return (
    <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <ImageBackground
        source={AppImages.event}
        style={{
          height: responsiveHeight(50),
        }}
        imageStyle={{
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
        }}>
        <AppHeader goBack arrowWhite />
      </ImageBackground>

      <ScrollView style={{flex: 1}}>
        <LineBreak space={2} />
        <View style={{paddingHorizontal: responsiveWidth(5)}}>
          <AppText
            title={'Event name here'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textTransform={'capitalize'}
            textFontWeight
          />

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
                title={'12-15 March, 2025'}
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
                title={'Lorem venue, California'}
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

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
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

          <View
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
          </View>
          <LineBreak space={2} />
        </View>

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
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetails;
