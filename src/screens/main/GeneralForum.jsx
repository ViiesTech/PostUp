/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
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
import {
  useCommentPostMutation,
  useLazyGetAllPostQuery,
  useLikePostMutation,
  useReplyCommentPostMutation,
} from '../../redux/services';
import {ShowToast} from '../../utils/Hooks';
import {IMAGE_URL} from '../../redux/constant';
import MediaSlider from '../../components/MediaSlider';
import moment from 'moment';
import {useSelector} from 'react-redux';
import AppTextInput from '../../components/AppTextInput';

// const data = [
//   {
//     id: 1,
//     profImg: AppImages.user,
//     username: 'Alicia James',
//     timeLeft: 'Top Poster',
//     desc: 'Lorem ipsum simply dummy amet, consectetur sadipscing elitr, sed',
//     likes: '196',
//     comments: '20',
//     shares: '5',
//     productImg: AppImages.event,
//   },
//   {
//     id: 2,
//     profImg: AppImages.user,
//     username: 'Alicia James',
//     timeLeft: 'Casual Poster',
//     desc: 'Lorem ipsum simply dummy amet, consectetur sadipscing elitr, sed',
//     likes: '196',
//     comments: '20',
//     shares: '5',
//     productImg: AppImages.event,
//   },
// ];

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
  const [getAllPost, {data, isLoading}] = useLazyGetAllPostQuery();
  const [likePost, {isLoading: LikeIsLoading}] = useLikePostMutation();
  const [commentPost, {isLoading: commentIsLoading}] = useCommentPostMutation();
  const [replyCommentPost, {isLoading: replyIsLoading}] =
    useReplyCommentPostMutation();
  const {user} = useSelector(state => state?.persistedData);
  const [reply, setReply] = useState({data: '', repliedBy: '', commentId: ''});
  const [comment, setComment] = useState('');
  const [likedId, setLikedId] = useState('');
  const [commentedId, setCommentedId] = useState('');
  const [showReplies, setShowReplies] = useState({
    index: null,
    shown: false,
  });

  const handleFetchPosts = async () => {
    await getAllPost()
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
            'Failed to fetch posts',
        );
      });
  };

  const handleLikePost = async postId => {
    const data = {
      userId: user?._id,
      postId: postId,
    };

    setLikedId(postId);

    await likePost(data)
      .unwrap()
      .then(res => {
        if (res.success) {
          handleFetchPosts();
        } else {
          ShowToast(res.message);
        }
      })
      .catch(err => {
        console.log(err);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to like post',
        );
      });
  };

  const handleCommentOnPress = async postId => {
    if (!comment) {
      return ShowToast('Comment is required');
    }

    const data = {
      userId: user?._id,
      postId: postId,
      message: comment,
    };

    setCommentedId(postId);

    await commentPost(data)
      .unwrap()
      .then(res => {
        if (res.success) {
          handleFetchPosts();
          setComment('');
        } else {
          ShowToast(res.message);
        }
      })
      .catch(err => {
        console.log(err);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to comment post',
        );
      });
  };

  const handleReplyOnPress = async item => {
    if (!comment && !reply?.data) {
      return ShowToast('Reply is required');
    }

    const data = {
      userId: user?._id,
      postId: item?._id,
      repliedBy: reply?.repliedBy,
      commentId: reply?.commentId,
      message: comment,
    };

    console.log(data);

    setCommentedId(item?._id);

    await replyCommentPost(data)
      .unwrap()
      .then(res => {
        if (res.success) {
          handleFetchPosts();
          setComment('');
          setReply({});
        } else {
          ShowToast(res.message);
        }
      })
      .catch(err => {
        console.log(err);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to reply comment',
        );
      });
  };

  useEffect(() => {
    handleFetchPosts();
  }, []);

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
      {data?.data.length === 0 ? (
        <View style={{marginTop: responsiveHeight(4)}}>
          <AppText
            title={'Posts Not Found'}
            textFontWeight
            textSize={2}
            textAlignment={'center'}
            textColor={AppColors.BLACK}
          />
        </View>
      ) : isLoading ? (
        <ActivityIndicator color={AppColors.lowGreen} size={'large'} />
      ) : (
        <FlatList
          data={data?.data}
          ItemSeparatorComponent={<LineBreak space={4} />}
          ListFooterComponent={<LineBreak space={2} />}
          // ListHeaderComponent={
          //   <>
          //     <LineBreak space={2} />
          //     <View
          //       style={{
          //         marginHorizontal: responsiveWidth(4),
          //         paddingHorizontal: responsiveWidth(3),
          //         paddingVertical: responsiveHeight(2),
          //         backgroundColor: AppColors.WHITE,
          //         elevation: 10,
          //         borderRadius: 5,
          //       }}>
          //       <View
          //         style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          //         <Image
          //           source={AppImages.user}
          //           style={{
          //             width: 50,
          //             height: 50,
          //             borderRadius: 5,
          //             borderWidth: 2,
          //             borderColor: AppColors.PEACHCOLOUR,
          //           }}
          //         />
          //         <View>
          //           <AppText
          //             title={'Alicia Roth'}
          //             textColor={AppColors.BLACK}
          //             textSize={2.5}
          //             textFontWeight
          //           />
          //           <LineBreak space={0.5} />
          //           <AppText
          //             title={'What do you want to talk about?'}
          //             textColor={AppColors.LIGHTGRAY}
          //             textSize={1.3}
          //           />
          //         </View>
          //       </View>
          //       <LineBreak space={1} />
          //       <View
          //         style={{
          //           flexDirection: 'row',
          //           justifyContent: 'space-between',
          //           alignItems: 'center',
          //         }}>
          //         <View
          //           style={{
          //             flexDirection: 'row',
          //             alignItems: 'center',
          //             paddingHorizontal: responsiveWidth(14),
          //             gap: 15,
          //           }}>
          //           <TouchableOpacity
          //             style={{
          //               flexDirection: 'row',
          //               alignItems: 'center',
          //               gap: 7,
          //             }}>
          //             <FontAwesome
          //               name="photo"
          //               size={responsiveFontSize(1.5)}
          //               color={AppColors.LIGHTGRAY}
          //             />
          //             <AppText
          //               title={'Photos'}
          //               textColor={AppColors.LIGHTGRAY}
          //               textSize={1.2}
          //             />
          //           </TouchableOpacity>
          //           <TouchableOpacity
          //             style={{
          //               flexDirection: 'row',
          //               alignItems: 'center',
          //               gap: 7,
          //             }}>
          //             <Entypo
          //               name="folder-video"
          //               size={responsiveFontSize(1.5)}
          //               color={AppColors.LIGHTGRAY}
          //             />
          //             <AppText
          //               title={'Videos'}
          //               textColor={AppColors.LIGHTGRAY}
          //               textSize={1.2}
          //             />
          //           </TouchableOpacity>
          //         </View>
          //         <TouchableOpacity
          //           style={{
          //             backgroundColor: AppColors.BTNCOLOURS,
          //             borderRadius: 15,
          //             borderBottomLeftRadius: 0,
          //           }}>
          //           <MaterialIcons
          //             name="keyboard-arrow-right"
          //             size={responsiveFontSize(4)}
          //             color={AppColors.WHITE}
          //           />
          //         </TouchableOpacity>
          //       </View>
          //     </View>
          //     <LineBreak space={2} />
          //   </>
          // }
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
                    source={{uri: `${IMAGE_URL}${item?.userId?.image}`}}
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
                          title={item?.userId?.fullName}
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
                    {/* <AppText
                    title={item.timeLeft || 'N/A'}
                    textColor={AppColors.LIGHTGRAY}
                    textSize={1.3}
                  /> */}
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
                      title={item.caption}
                      textColor={AppColors.LIGHTGRAY}
                      textSize={1.8}
                    />
                  </View>
                  {!!item.posts?.length ? (
                    <MediaSlider media={item.posts} />
                  ) : (
                    <Image
                      source={AppImages.image_notFound}
                      style={{
                        width: responsiveWidth(85),
                        height: responsiveHeight(30),
                        borderRadius: 5,
                      }}
                    />
                  )}
                </View>

                <LineBreak space={2} />

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
                      gap: 25,
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 7,
                      }}
                      disabled={LikeIsLoading}
                      onPress={() => handleLikePost(item._id)}>
                      {LikeIsLoading && likedId === item._id ? (
                        <ActivityIndicator
                          color={AppColors.lowGreen}
                          size={'small'}
                        />
                      ) : (
                        <AntDesign
                          name="like2"
                          size={responsiveFontSize(2)}
                          color={
                            item.like?.some(liker => liker._id === user?._id)
                              ? 'red'
                              : AppColors.LIGHTGRAY
                          }
                        />
                      )}
                      <AppText
                        title={item.totalLikes || '0'}
                        textColor={AppColors.LIGHTGRAY}
                        textSize={1.8}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          isShowComment.index == index &&
                          isShowComment.shown
                        ) {
                          setIsshowComment({
                            index: index,
                            shown: !isShowComment.shown,
                          });
                          setReply(null);
                          setComment(null);
                          setShowReplies({});
                        } else {
                          setIsshowComment({
                            index: index,
                            shown: true,
                          });
                          setReply(null);
                          setComment(null);
                          setShowReplies({});
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
                        title={item.totalComments || '0'}
                        textColor={AppColors.LIGHTGRAY}
                        textSize={1.8}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
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
                        title={item.totalShares || '0'}
                        textColor={AppColors.LIGHTGRAY}
                        textSize={1.8}
                      />
                    </TouchableOpacity> */}
                  </View>
                </View>
                <LineBreak space={2} />

                {isShowComment.index == index &&
                  isShowComment.shown &&
                  (item?.comment?.length === 0 ? null : (
                    <FlatList
                      data={item?.comment}
                      ItemSeparatorComponent={<LineBreak space={3} />}
                      renderItem={({item, index}) => (
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
                                source={{
                                  uri: `${IMAGE_URL}${item.userId?.image}`,
                                }}
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 100,
                                }}
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
                                    title={item?.userId?.fullName}
                                    textColor={AppColors.BLACK}
                                    textSize={1.8}
                                    textFontWeight
                                  />
                                  <AppText
                                    title={moment(item.commentedAt).fromNow()}
                                    textColor={AppColors.LIGHTGRAY}
                                    textSize={1.2}
                                  />
                                </View>
                              </View>
                            </View>
                            <LineBreak space={1} />
                            <AppText
                              title={item.message}
                              textColor={AppColors.DARKGRAY}
                              textSize={1.5}
                              lineHeight={2.2}
                            />
                            {item.replies?.length !== null && (
                              <View style={{paddingLeft: responsiveWidth(5)}}>
                                <LineBreak space={1} />
                                {showReplies?.commentId !== item._id && (
                                  <TouchableOpacity
                                    onPress={() => {
                                      if (
                                        showReplies.index == index &&
                                        showReplies.shown
                                      ) {
                                        setShowReplies({
                                          shown: false,
                                          index: null,
                                          commentId: null,
                                        });
                                      } else {
                                        setShowReplies({
                                          shown: true,
                                          index: index,
                                          commentId: item._id,
                                        });
                                      }
                                    }}>
                                    <AppText
                                      title={`View ${item.replies?.length} replies`}
                                      textColor={AppColors.DARKGRAY}
                                      textSize={1.5}
                                    />
                                  </TouchableOpacity>
                                )}

                                {showReplies?.index == index &&
                                  showReplies?.shown &&
                                  showReplies?.commentId === item._id && (
                                    <FlatList
                                      data={item?.replies}
                                      ItemSeparatorComponent={
                                        <LineBreak space={1} />
                                      }
                                      renderItem={({item: repliesItems}) => (
                                        <>
                                          <View
                                            style={{
                                              borderWidth: 1,
                                              borderRadius: 10,
                                              borderColor: AppColors.GRAY,
                                              paddingHorizontal:
                                                responsiveWidth(2),
                                              paddingVertical:
                                                responsiveHeight(1),
                                            }}>
                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                gap: 10,
                                                alignItems: 'center',
                                              }}>
                                              <Image
                                                source={{
                                                  uri: `${IMAGE_URL}${repliesItems.userId?.image}`,
                                                }}
                                                style={{
                                                  width: 25,
                                                  height: 25,
                                                  borderRadius: 100,
                                                }}
                                              />
                                              <View
                                                style={{
                                                  flexDirection: 'row',
                                                  justifyContent:
                                                    'space-between',
                                                  width: responsiveWidth(77),
                                                  alignItems: 'center',
                                                  gap: 20,
                                                }}>
                                                <View>
                                                  <AppText
                                                    title={
                                                      repliesItems?.userId
                                                        ?.fullName
                                                    }
                                                    textColor={AppColors.BLACK}
                                                    textSize={1.5}
                                                    textFontWeight
                                                  />
                                                  <AppText
                                                    title={moment(
                                                      repliesItems.createdAt,
                                                    ).fromNow()}
                                                    textColor={
                                                      AppColors.LIGHTGRAY
                                                    }
                                                    textSize={1}
                                                  />
                                                </View>
                                              </View>
                                            </View>
                                            <LineBreak space={1} />
                                            <AppText
                                              title={repliesItems.message}
                                              textColor={AppColors.DARKGRAY}
                                              textSize={1.3}
                                              lineHeight={2.2}
                                            />
                                          </View>
                                          <LineBreak space={0.5} />
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              paddingHorizontal:
                                                responsiveWidth(2),
                                              gap: 10,
                                              alignItems: 'center',
                                            }}>
                                            <TouchableOpacity
                                              onPress={() =>
                                                setReply({
                                                  data: `Replying to @${repliesItems?.userId?.fullName}`,
                                                  repliedBy:
                                                    repliesItems?.userId?._id,
                                                  commentId: item?._id,
                                                })
                                              }>
                                              <AppText
                                                title={'Reply'}
                                                textColor={AppColors.LIGHTGRAY}
                                                textSize={1.2}
                                                borderBottomWidth={1}
                                                borderBottomColor={
                                                  AppColors.LIGHTGRAY
                                                }
                                              />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                              onPress={() =>
                                                nav.navigate('PrivateMessages')
                                              }>
                                              <AppText
                                                title={'Hey"s'}
                                                textColor={AppColors.lowGreen}
                                                textSize={1.2}
                                                borderBottomWidth={1}
                                                borderBottomColor={
                                                  AppColors.lowGreen
                                                }
                                              />
                                            </TouchableOpacity>
                                          </View>
                                        </>
                                      )}
                                    />
                                  )}

                                <LineBreak space={1} />
                              </View>
                            )}
                          </View>
                          <LineBreak space={1} />
                          <View
                            style={{
                              flexDirection: 'row',
                              paddingHorizontal: responsiveWidth(2),
                              gap: 10,
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                setReply({
                                  data: `Replying to @${item?.userId?.fullName}`,
                                  repliedBy: item?.userId?._id,
                                  commentId: item?._id,
                                })
                              }>
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
                  ))}

                {isShowComment.index == index && isShowComment.shown && (
                  <View
                    style={{
                      marginTop: responsiveHeight(2),
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 15,
                    }}>
                    <Image
                      source={{
                        uri: `${IMAGE_URL}${user?.image}`,
                      }}
                      style={{width: 50, height: 50, borderRadius: 100}}
                    />
                    <View>
                      {reply?.data && reply?.repliedBy == item?.userId?._id && (
                        <View
                          style={{
                            borderWidth: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderColor: AppColors.LIGHTGRAY,
                            borderRadius: 10,
                            marginBottom: -5,
                            borderBottomWidth: 0,
                            paddingHorizontal: responsiveWidth(4),
                            paddingVertical: responsiveHeight(1),
                            paddingBottom: responsiveHeight(1.5),
                          }}>
                          <AppText
                            title={reply?.data}
                            textColor={AppColors.lowGreen}
                            textSize={1.8}
                          />

                          <TouchableOpacity
                            onPress={() => {
                              setReply({});
                              setComment('');
                            }}>
                            <AntDesign
                              name="close"
                              size={responsiveFontSize(2.5)}
                              color={AppColors.lowGreen}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                      <AppTextInput
                        inputPlaceHolder={'Comment here'}
                        inputWidth={55}
                        value={comment}
                        onChangeText={text => setComment(text)}
                        rightIcon={
                          <View style={{paddingHorizontal: responsiveWidth(2)}}>
                            {(commentIsLoading && commentedId === item?._id) ||
                            (replyIsLoading && commentedId === item?._id) ? (
                              <ActivityIndicator
                                color={AppColors.lowGreen}
                                size={'small'}
                              />
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  if (
                                    reply?.data &&
                                    reply?.repliedBy === item?.userId?._id
                                  ) {
                                    handleReplyOnPress(item);
                                  } else {
                                    handleCommentOnPress(item?._id);
                                  }
                                }}>
                                <FontAwesome
                                  name="send"
                                  size={responsiveFontSize(2)}
                                  color={AppColors.LIGHTGRAY}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        }
                      />
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
      )}
    </ScrollView>
  );
};

export default GeneralForum;
