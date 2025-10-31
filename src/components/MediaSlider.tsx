/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import { IMAGE_URL } from '../redux/constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppColors from '../utils/AppColors';

const { width } = Dimensions.get('window');

const MediaSlider = ({ media = [] }) => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [paused, setPaused] = useState(true);
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePlayPause = (item) => {
    if (playingVideo?.path === item.path) {
      setPaused(!paused); // toggle play/pause
    } else {
      setPlayingVideo(item);
      setPaused(false);
    }
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
    setPaused(true);
  };

   const handleScroll = (event) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / width
    );
    setActiveIndex(slideIndex);
  };

  const getFullUrl = (fileName) => `${IMAGE_URL}${fileName}`;
  const isVideoFile = (fileName) => fileName?.endsWith('.mp4');

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={media}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const fullUrl = getFullUrl(item);
          const isVideo = isVideoFile(item);

          return (
            <View
              style={{
                width: responsiveWidth(85.5),
                height: responsiveHeight(30),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isVideo ? (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handlePlayPause({ path: fullUrl })}
                    style={{ width: responsiveWidth(85.5), height: '100%' }}>
                    <Video
                      source={{ uri: fullUrl }}
                      style={{
                        width: responsiveWidth(85.5),
                        height: responsiveHeight(30),
                        borderRadius: 10,
                      }}
                      resizeMode="cover"
                      paused={
                        playingVideo?.path === fullUrl ? paused : true
                      }
                      controls={false} // hide default controls for cleaner look
                      repeat={false}
                    />
                    {/* Play/Pause Icon Overlay */}
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
                          playingVideo?.path === fullUrl && !paused
                            ? 'pause'
                            : 'play'
                        }
                        size={20}
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Close Button */}
                  {/* {playingVideo?.path === fullUrl && (
                    <TouchableOpacity
                      onPress={handleCloseVideo}
                      style={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        padding: 8,
                        borderRadius: 20,
                      }}>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        ✕
                      </Text>
                    </TouchableOpacity>
                  )} */}
                </>
              ) : (
                <Image
                  source={{ uri: fullUrl }}
                  style={{
                    width: responsiveWidth(85.5),
                    height: responsiveHeight(30),
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              )}
            </View>
          );
        }}
      />

       <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        {media.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor:
                index === activeIndex ? AppColors.BTNCOLOURS : '#d3d3d3',
            }}
          />
        ))}
        </View>
    </View>
  );
};

export default MediaSlider;
