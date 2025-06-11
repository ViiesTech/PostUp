/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ScrollView, FlatList, Image} from 'react-native';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppTextComps/AppText';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppImages from '../../assets/images/AppImages';
import AppButton from '../../components/AppButton';

const suggestions = [
  {
    id: 1,
    profImg: AppImages.user,
    title: 'You have a new friend suggestion:',
    username: 'Alex Charlie',
  },
  {
    id: 2,
    profImg: AppImages.user,
    title: 'You have a new friend suggestion:',
    username: 'Alex Charlie',
  },
  {
    id: 3,
    profImg: AppImages.user,
    title: 'You have a new friend suggestion:',
    username: 'Alex Charlie',
  },
  {
    id: 4,
    profImg: AppImages.user,
    title: 'You have a new friend suggestion:',
    username: 'Alex Charlie',
  },
];

const palReq = [
  {
    id: 1,
    profImg: AppImages.user,
    title: '7h',
    username: 'Alex Charlie',
  },
  {
    id: 2,
    profImg: AppImages.user,
    title: '7h',
    username: 'Alex Charlie',
  },
  {
    id: 3,
    profImg: AppImages.user,
    title: '7h',
    username: 'Alex Charlie',
  },
  {
    id: 4,
    profImg: AppImages.user,
    title: '7h',
    username: 'Alex Charlie',
  },
];

const myPal = [
  {
    id: 1,
    profImg: AppImages.user,
    title: 'You have a new friend suggestion:',
    username: 'Alex Charlie',
  },
  {
    id: 2,
    profImg: AppImages.user,
    title: 'You have a new friend suggestion:',
    username: 'Alex Charlie',
  },
  {
    id: 3,
    profImg: AppImages.user,
    title: 'You have a new friend suggestion:',
    username: 'Alex Charlie',
  },
  {
    id: 4,
    profImg: AppImages.user,
    title: 'You have a new friend suggestion:',
    username: 'Alex Charlie',
  },
];

const PostUpPals = () => {
  const [selectedTab, setSelectedTab] = useState('pal-req');
  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="Find PostUp Pals"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={67}
      />
      <LineBreak space={5} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <AppText
          title={'Pal Suggestions'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />

        <LineBreak space={3} />

        <FlatList
          data={suggestions}
          ItemSeparatorComponent={() => <LineBreak space={2} />}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: AppColors.DARKGRAY,
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveHeight(1),
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Image
                    source={item.profImg}
                    style={{width: 50, height: 50, borderRadius: 100}}
                  />
                  <View>
                    <LineBreak space={0.5} />
                    <AppText
                      title={item.title}
                      textColor={AppColors.LIGHTGRAY}
                      textSize={1.5}
                    />
                    <AppText
                      title={item.username}
                      textColor={AppColors.BLACK}
                      textSize={1.5}
                      textFontWeight
                    />
                    <LineBreak space={1} />
                    <View
                      style={{
                        flex: 1,
                        width: responsiveWidth(68),
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 7,
                        }}>
                        <AppButton
                          title={'Add Pal'}
                          borderRadius={5}
                          handlePress={() => {}}
                          textSize={1.4}
                          padding={8}
                          buttoWidth={20}
                        />
                        <AppButton
                          title={'Ignore'}
                          borderRadius={5}
                          handlePress={() => {}}
                          textSize={1.4}
                          padding={8}
                          bgColor={'#E55B13'}
                          buttoWidth={15}
                        />
                        <AppButton
                          title={'Block'}
                          borderRadius={5}
                          handlePress={() => {}}
                          textSize={1.4}
                          bgColor={AppColors.Yellow}
                          padding={8}
                          buttoWidth={15}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />

        <LineBreak space={4} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppButton
            title={'Pal Requests'}
            borderRadius={5}
            handlePress={() => setSelectedTab('pal-req')}
            buttoWidth={42}
            bgColor={selectedTab === 'pal-req' ? null : AppColors.WHITE}
            borderWidth={selectedTab === 'pal-req' ? 0 : 1}
            textColor={selectedTab === 'pal-req' ? AppColors.WHITE : '#E55B13'}
            borderColor={'#E55B13'}
          />
          <AppButton
            title={'My Pals'}
            borderRadius={5}
            handlePress={() => setSelectedTab('my-pal')}
            buttoWidth={42}
            bgColor={selectedTab === 'my-pal' ? null : AppColors.WHITE}
            borderWidth={selectedTab === 'my-pal' ? 0 : 1}
            textColor={selectedTab === 'my-pal' ? AppColors.WHITE : '#E55B13'}
            borderColor={'#E55B13'}
          />
        </View>
        <LineBreak space={4} />

        {selectedTab === 'pal-req' && (
          <FlatList
            data={palReq}
            ItemSeparatorComponent={() => <LineBreak space={2} />}
            ListFooterComponent={() => <LineBreak space={2} />}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: AppColors.DARKGRAY,
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1),
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                    }}>
                    <Image
                      source={item.profImg}
                      style={{width: 50, height: 50, borderRadius: 100}}
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View>
                        <AppText
                          title={item.username}
                          textColor={AppColors.BLACK}
                          textSize={1.5}
                          textFontWeight
                        />
                        <LineBreak space={0.5} />
                        <AppText
                          title={item.title}
                          textColor={AppColors.LIGHTGRAY}
                          textSize={1.5}
                        />
                      </View>
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <View>
                          <AppButton
                            title={'Approve'}
                            borderRadius={5}
                            handlePress={() => {}}
                            textSize={1.4}
                            padding={10}
                            buttoWidth={22}
                          />
                        </View>
                        <View>
                          <AppButton
                            title={'Reject'}
                            borderRadius={5}
                            handlePress={() => {}}
                            bgColor={'#E55B13'}
                            textSize={1.4}
                            padding={10}
                            buttoWidth={15}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}

        {selectedTab === 'my-pal' && (
          <FlatList
            data={myPal}
            ItemSeparatorComponent={() => <LineBreak space={2} />}
            ListFooterComponent={() => <LineBreak space={2} />}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: AppColors.DARKGRAY,
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1),
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                    }}>
                    <Image
                      source={item.profImg}
                      style={{width: 50, height: 50, borderRadius: 100}}
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View>
                        <AppText
                          title={item.username}
                          textColor={AppColors.BLACK}
                          textSize={1.5}
                          textFontWeight
                        />
                        <LineBreak space={0.5} />
                        <AppText
                          title={'24 mutual friends'}
                          textColor={AppColors.LIGHTGRAY}
                          textSize={1.5}
                        />
                      </View>
                      <AppButton
                        title={'Send “Hey”'}
                        borderRadius={5}
                        handlePress={() => {}}
                        textSize={1.4}
                        padding={12}
                        buttoWidth={22}
                      />
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default PostUpPals;
