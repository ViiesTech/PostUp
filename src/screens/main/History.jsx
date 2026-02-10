/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import {useLazyGetAllPostQuery} from '../../redux/services';
import {ShowToast} from '../../utils/Hooks';
import {IMAGE_URL} from '../../redux/constant';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    try {
      const res = await getAllPost().unwrap();
      const images = Array.isArray(res?.data)
        ? res.data
            .map((post, index) => ({
              id: index + 1,
              files: (Array.isArray(post?.posts) ? post.posts : []).map(
                file => ({
                  url: file,
                  type: file.toLowerCase().endsWith('.mp4') ? 'video' : 'image',
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
    } catch (err) {
      console.log('Error fetching posts:', err);
      ShowToast(
        err.error || err?.data?.message || 'Failed to fetch posts images',
      );
    }
  };

  useEffect(() => {
    handleFetchPosts();
  }, []);

  const renderItem = ({item}) => {
    const isVideo = item.type === 'video';
    const fileUrl = `${IMAGE_URL}${item.url}`;
    const isActive = playingVideo?.path === fileUrl;

    return (
      <View style={styles.itemContainer}>
        {isVideo ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePlayPause({path: fileUrl})}
            style={styles.videoWrapper}>
            <Video
              source={{uri: fileUrl}}
              style={styles.media}
              resizeMode="cover"
              paused={isActive ? paused : true}
              muted
              repeat={isActive}
            />
            <View style={styles.playOverlay}>
              <Ionicons
                name={isActive && !paused ? 'pause' : 'play'}
                size={24}
                color={AppColors.WHITE}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <Image source={{uri: fileUrl}} style={styles.media} />
        )}
      </View>
    );
  };

  const ListHeader = () => (
    <>
      <AppHeader
        heading="History"
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={55}
      />
      <LineBreak space={4} />
      <View style={styles.headerTitleContainer}>
        <AppText
          title={'Places I Posts'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
      </View>
      <LineBreak space={2} />
    </>
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <AppText
        title={'Post Images Not Found'}
        textFontWeight
        textSize={2}
        textAlignment={'center'}
        textColor={AppColors.BLACK}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading && postImages.length === 0 ? (
        <View style={styles.loaderContainer}>
          <ListHeader />
          <ActivityIndicator color={AppColors.lowGreen} size={'large'} />
        </View>
      ) : (
        <FlatList
          data={postImages}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={!isLoading && EmptyComponent}
          ListFooterComponent={<LineBreak space={2} />}
          ItemSeparatorComponent={<LineBreak space={0.5} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  listContent: {
    paddingBottom: responsiveHeight(2),
  },
  headerTitleContainer: {
    paddingHorizontal: responsiveWidth(6),
  },
  itemContainer: {
    flex: 1 / 3,
    padding: 1,
  },
  media: {
    width: '100%',
    height: responsiveHeight(15),
    borderRadius: 8,
  },
  videoWrapper: {
    width: '100%',
    height: responsiveHeight(15),
  },
  playOverlay: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    marginTop: responsiveHeight(10),
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
  },
});

export default History;
