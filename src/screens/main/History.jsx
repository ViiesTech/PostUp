/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppImages from '../../assets/images/AppImages';
import {useLazyGetAllPostQuery} from '../../redux/services';
import {ShowToast} from '../../utils/Hooks';
import {IMAGE_URL} from '../../redux/constant';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const gallery = [
  {id: 1, img: AppImages.stepOne},
  {id: 2, img: AppImages.stepOne},
  {id: 3, img: AppImages.stepOne},
  {id: 4, img: AppImages.stepOne},
  {id: 5, img: AppImages.stepOne},
  {id: 6, img: AppImages.stepOne},
  {id: 7, img: AppImages.stepOne},
  {id: 8, img: AppImages.stepOne},
  {id: 9, img: AppImages.stepOne},
  {id: 10, img: AppImages.stepOne},
  {id: 11, img: AppImages.stepOne},
];

const History = () => {
  const [getAllPost, {data, isLoading}] = useLazyGetAllPostQuery();
  const [postImages, setPostImages] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [paused, setPaused] = useState(true);

  const handlePlayPause = item => {
    if (playingVideo?.path === item.path) {
      setPaused(!paused);
    } else {
      setPlayingVideo(item);
      setPaused(false);
    }
  };

  const handleFetchPosts = async () => {
    await getAllPost()
      .unwrap()
      .then(res => {
        const images = Array.isArray(res?.data)
          ? res?.data
              .map((post, index) => ({
                id: index + 1,
                files: (Array.isArray(post?.posts) ? post.posts : []).map(
                  file => ({
                    url: file,
                    type: file.toLowerCase().endsWith('.mp4')
                      ? 'video'
                      : 'image',
                  }),
                ),
              }))
              .filter(item => item.files.length > 0)
          : [];

        const imagesRes = images.flatMap(post =>
          post.files.map(file => ({
            id: post.id,
            url: file.url,
            type: file.type,
          })),
        );

        setPostImages(imagesRes);
      })
      .catch(err => {
        console.log(err);
        ShowToast(
          err.error ||
            err?.error?.response?.data?.message ||
            'Failed to fetch posts images',
        );
      });
  };

  useEffect(() => {
    handleFetchPosts();
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading="History"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={55}
      />
      <LineBreak space={4} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <AppText
          title={'Places I Posts'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
      </View>

      {data?.data?.length === 0 ? (
        <View style={{marginTop: responsiveHeight(4)}}>
          <AppText
            title={'Post Images Not Found'}
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
          data={postImages}
          numColumns={3}
          columnWrapperStyle={{justifyContent: 'center', gap: 2}}
          ItemSeparatorComponent={<LineBreak space={0.5} />}
          ListHeaderComponent={<LineBreak space={2} />}
          ListFooterComponent={<LineBreak space={2} />}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => {
            const isVideo = item.type === 'video';
            const fileUrl = `${IMAGE_URL}${item.url}`;

            return (
              <View>
                {isVideo ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handlePlayPause({path: fileUrl})}>
                    <Video
                      source={{uri: fileUrl}}
                      style={{
                        width: responsiveWidth(32),
                        height: responsiveHeight(15),
                        marginHorizontal: responsiveWidth(0.1),
                        borderRadius: 8,
                      }}
                      resizeMode="cover"
                      paused={playingVideo?.path === fileUrl ? paused : true}
                      muted
                    />
                    <View
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: '40%',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        borderRadius: 50,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name={
                          playingVideo?.path === fileUrl && !paused
                            ? 'pause'
                            : 'play'
                        }
                        size={20}
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={{uri: fileUrl}}
                    style={{
                      width: responsiveWidth(32),
                      height: responsiveHeight(15),
                      marginHorizontal: responsiveWidth(0.1),
                      borderRadius: 8,
                    }}
                  />
                )}
              </View>
            );
          }}
        />
      )}
    </ScrollView>
  );
};

export default History;
