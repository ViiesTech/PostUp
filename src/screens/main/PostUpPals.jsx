/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
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
import {useSelector} from 'react-redux';
import {
  useAddRequestMutation,
  useApproveRejectReqMutation,
  useBlockUserMutation,
  useIgnoreUserMutation,
  useLazyGetFollowingsAndFollowReqQuery,
  useLazyGetNearByUsersQuery,
} from '../../redux/services';
import {ShowToast} from '../../utils/Hooks';
import {IMAGE_URL} from '../../redux/constant';
import moment from 'moment';

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
  const {lat, long} = useSelector(state => state?.persistedData.userLocation);
  const [getNearByUsers, {data, isLoading}] = useLazyGetNearByUsersQuery();
  const [
    getFollowingsAndFollowReq,
    {
      data: FollowingsAndFollowReqData,
      isLoading: FollowingsAndFollowReqLoading,
    },
  ] = useLazyGetFollowingsAndFollowReqQuery();
  const [addRequest, {isLoading: addReqLoading}] = useAddRequestMutation();
  const [ignoreUser, {isLoading: ignoreUserLoading}] = useIgnoreUserMutation();
  const [blockUser, {isLoading: blockUserLoading}] = useBlockUserMutation();
  const [approveRejectReq, {isLoading: approveLoading}] =
    useApproveRejectReqMutation();
  const {user, token} = useSelector(state => state?.persistedData);
  const [addPalId, setAddPalId] = useState(null);
  const [ignoreUserId, setIgnoreUserId] = useState(null);
  const [approveRejectId, setApproveRejectId] = useState(null);
  const [blockUserId, setBlockUserId] = useState(null);

  useEffect(() => {
    if (lat && long) {
      fetchPals(long, lat)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long]);

  const fetchPals = async (long, lat) => {
      getNearByUsers({longitude: long, latitude: lat})
        .unwrap()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          ShowToast(
            err.error ||
              err?.error?.response?.data?.message ||
              'Failed to fetch near by users',
          );
        });
  };

  const addPalHandler = async targetId => {
    const data = {
      userId: user?._id,
      targetId,
    };

    setAddPalId(targetId);

    try {
      const res = await addRequest(data).unwrap();
      if (res.success) {
        ShowToast(res.message);
        fetchPals(long, lat);
      } else {
        ShowToast(res.message);
      }
    } catch (err) {
      console.log('Failed to add pal ====>', err?.data);
      ShowToast(
        err.error || err?.error?.response?.data?.message || 'Failed to add pal',
      );
    }
  };

  const ingorePalHandler = async ignoredUserId => {
    const data = {
      userId: user?._id,
      ignoredUserId,
    };

    setIgnoreUserId(ignoredUserId);

    try {
      const res = await ignoreUser(data).unwrap();
      if (res.success) {
        ShowToast(res.message);
        fetchPals(long, lat);
      } else {
        ShowToast(res.message);
      }
    } catch (err) {
      console.log('Failed to add pal ====>', err?.data);
      ShowToast(
        err.error || err?.error?.response?.data?.message || 'Failed to add pal',
      );
    }
  };

  const blockPalHandler = async blockedId => {
    const data = {
      userId: user?._id,
      blockedId,
    };

    setBlockUserId(blockedId);

    try {
      const res = await blockUser(data).unwrap();
      if (res.success) {
        ShowToast(res.message);
        fetchPals(long, lat);
      } else {
        ShowToast(res.message);
      }
    } catch (err) {
      console.log('Failed to add pal ====>', err?.data);
      ShowToast(
        err.error || err?.error?.response?.data?.message || 'Failed to add pal',
      );
    }
  };

  const handleFetchFollowAndFollowingReq = async type => {
    await getFollowingsAndFollowReq(type)
      .unwrap()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to fetch follow and followings req',
        );
      });
  };

  const approveOnPressHandler = async ({reqId, status}) => {
    const data = {
      reqId,
      status,
    };

    setApproveRejectId({reqId, status});

    try {
      const res = await approveRejectReq(data).unwrap();
      if (res.success) {
        ShowToast(res.message);
        const type = selectedTab === 'pal-req' ? 'FollowReq' : 'Followings';
        handleFetchFollowAndFollowingReq(type);
      } else {
        ShowToast(res.message);
      }
    } catch (err) {
      console.log('Failed to approve ====>', err?.data);
      ShowToast(
        err.error || err?.error?.response?.data?.message || 'Failed to approve',
      );
    }
  };

  useEffect(() => {
    const type = selectedTab === 'pal-req' ? 'FollowReq' : 'Followings';
   if(type) { 
    handleFetchFollowAndFollowingReq(type);
    }
  }, [selectedTab]);

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

        <LineBreak space={2} />

        {data?.data?.length === 0 ? (
          <View style={{marginTop: responsiveHeight(1)}}>
            <AppText
              title={'Suggestions Not Found'}
              textFontWeight
              textSize={2}
              textAlignment={'center'}
              textColor={AppColors.BLACK}
            />
          </View>
        ) : isLoading ? (
          <View style={{marginTop: responsiveHeight(1)}}>
            <ActivityIndicator color={AppColors.lowGreen} size={'large'} />
          </View>
        ) : (
          <FlatList
            data={data?.data}
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
                      source={{uri: `${IMAGE_URL}${item.image}`}}
                      style={{width: 50, height: 50, borderRadius: 100}}
                    />
                    <View>
                      <LineBreak space={0.5} />
                      <AppText
                        title={'You have a new friend suggestion:'}
                        textColor={AppColors.LIGHTGRAY}
                        textSize={1.5}
                      />
                      <AppText
                        title={item.fullName}
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
                            handlePress={() => addPalHandler(item?._id)}
                            textSize={1.4}
                            loaderSize={'small'}
                            loading={addPalId === item._id && addReqLoading}
                            padding={8}
                            buttoWidth={20}
                          />
                          <AppButton
                            title={'Ignore'}
                            borderRadius={5}
                            handlePress={() => ingorePalHandler(item?._id)}
                            textSize={1.4}
                            loaderSize={'small'}
                            loading={
                              ignoreUserId === item._id && ignoreUserLoading
                            }
                            padding={8}
                            bgColor={'#E55B13'}
                            buttoWidth={15}
                          />
                          <AppButton
                            title={'Block'}
                            borderRadius={5}
                            handlePress={() => blockPalHandler(item?._id)}
                            loaderSize={'small'}
                            textSize={1.4}
                            loading={
                              blockUserId === item._id && blockUserLoading
                            }
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
        )}

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

        {selectedTab === 'pal-req' ? (
          FollowingsAndFollowReqData?.data?.length === 0 ? (
            <View style={{marginTop: responsiveHeight(4)}}>
              <AppText
                title={'Pal Requests Not Found'}
                textFontWeight
                textSize={2}
                textAlignment={'center'}
                textColor={AppColors.BLACK}
              />
            </View>
          ) : FollowingsAndFollowReqLoading ? (
            <View style={{marginTop: responsiveHeight(4)}}>
              <ActivityIndicator color={AppColors.lowGreen} size={'large'} />
            </View>
          ) : (
            <FlatList
              data={FollowingsAndFollowReqData?.data}
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
                        source={{uri: `${IMAGE_URL}${item?.userId?.image}`}}
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
                            title={item?.userId?.fullName}
                            textColor={AppColors.BLACK}
                            textSize={1.5}
                            textFontWeight
                          />
                          <LineBreak space={0.5} />
                          <AppText
                            title={moment(item.createdAt).fromNow()}
                            textColor={AppColors.LIGHTGRAY}
                            textSize={1.5}
                          />
                        </View>
                        <View style={{flexDirection: 'row', gap: 10}}>
                          <View>
                            <AppButton
                              title={'Approve'}
                              borderRadius={5}
                              handlePress={() =>
                                approveOnPressHandler({
                                  reqId: item?._id,
                                  status: 'Approve',
                                })
                              }
                              textSize={1.4}
                              loading={
                                approveRejectId?.reqId === item?._id &&
                                approveRejectId?.status === 'Approve' &&
                                approveLoading
                              }
                              padding={10}
                              buttoWidth={22}
                            />
                          </View>
                          <View>
                            <AppButton
                              title={'Reject'}
                              borderRadius={5}
                              handlePress={() =>
                                approveOnPressHandler({
                                  reqId: item?._id,
                                  status: 'Reject',
                                })
                              }
                              bgColor={'#E55B13'}
                              textSize={1.4}
                              loading={
                                approveRejectId?.reqId === item?._id &&
                                approveRejectId?.status === 'Reject' &&
                                approveLoading
                              }
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
          )
        ) : null}

        {selectedTab === 'my-pal' ? (
          FollowingsAndFollowReqData?.data?.length === 0 ? (
            <View style={{marginTop: responsiveHeight(4)}}>
              <AppText
                title={'My Pals Not Found'}
                textFontWeight
                textSize={2}
                textAlignment={'center'}
                textColor={AppColors.BLACK}
              />
            </View>
          ) : (
            <FlatList
              data={FollowingsAndFollowReqData?.data}
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
                        source={{uri: `${IMAGE_URL}${item?.targetId?.image}`}}
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
                            title={item?.targetId?.fullName}
                            textColor={AppColors.BLACK}
                            textSize={1.5}
                            textFontWeight
                          />
                          <LineBreak space={0.5} />
                          <AppText
                            title={item?.targetId?.email}
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
          )
        ) : null}
      </View>
    </ScrollView>
  );
};

export default PostUpPals;
