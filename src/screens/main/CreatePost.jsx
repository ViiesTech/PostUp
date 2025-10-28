/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import LineBreak from '../../components/LineBreak';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import SVGXml from '../../components/SVGXML';
import APPICONS from './../../assets/icons/AppIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CreatePost = () => {
  const [media, setMedia] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleAddMedia = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any', // allows both photo & video
    })
      .then(images => {
        console.log('Selected Media:', images);
        setMedia(images);
      })
      .catch(err => console.log('Picker Error:', err));
  };

  const handlePlayVideo = videoItem => {
    if (videoItem.mime.startsWith('video')) {
      setPlayingVideo(videoItem);
    }
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  const handleDelete = mediaItem => {
    const updatedMedia = media.filter(item => item.path !== mediaItem.path);
    setMedia(updatedMedia);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        goBack
        heading="Create Post"
        textFontWeight={true}
        isCenteredHead={true}
      />

      <LineBreak space={4} />

      <View style={{paddingHorizontal: responsiveWidth(4)}}>
        <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
          <View
            style={{
              borderWidth: 4,
              borderColor: AppColors.WHITE,
              elevation: 10,
              width: responsiveWidth(16),
              height: responsiveWidth(16),
              borderRadius: 10,
            }}>
            <Image
              source={AppImages.user}
              style={{
                width: responsiveWidth(14),
                height: responsiveWidth(14),
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <AppText
              title={'Ronald Sustroharjo'}
              textColor={AppColors.BLACK}
              textSize={1.8}
              textFontWeight
            />
            <AppText
              title={'Top Poster'}
              textColor={AppColors.GRAY}
              textSize={1.6}
              textFontWeight
            />
          </View>
        </View>
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Write your text'}
          borderColor={AppColors.BTNCOLOURS}
          inputHeight={20}
          borderRadius={5}
          multiline={true}
          textAlignVertical={'top'}
        />
        <LineBreak space={2} />
        <AppButton title={'Post'} buttoWidth={92} />
        <LineBreak space={2} />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}
          onPress={() => handleAddMedia()}>
          <SVGXml icon={APPICONS.gallery} width={20} height={20} />
          <AppText
            title={'Add Photo Or Video'}
            textColor={AppColors.BTNCOLOURS}
            textSize={1.8}
            textFontWeight
          />
        </TouchableOpacity>
        <FlatList
          data={media}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
          }}
          renderItem={({item}) => (
            <View style={{marginTop: responsiveHeight(4)}}>
              {playingVideo && playingVideo.path === item.path ? (
                <View>
                  {/* Video Player */}
                  <Video
                    source={{uri: playingVideo.path}}
                    style={{
                      width: '100%',
                      aspectRatio: 16 / 9,
                      borderRadius: 10,
                    }}
                    controls
                    fullscreen
                  />

                  {/* Close Button */}
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: 20,
                      width: 35,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={handleCloseVideo}>
                      <AntDesign
                        name="close"
                        size={responsiveFontSize(2.5)}
                        color={AppColors.WHITE}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handlePlayVideo(item)}
                  activeOpacity={0.8}>
                  <ImageBackground
                    source={{uri: item.path}}
                    imageStyle={{borderRadius: 10}}
                    style={{
                      width: responsiveWidth(27),
                      height: responsiveWidth(27),
                      borderRadius: 10,
                      overflow: 'visible',
                    }}>
                    {/* Delete Icon */}
                    <TouchableOpacity
                      onPress={() => handleDelete(item)}
                      style={{
                        position: 'absolute',
                        right: -8,
                        top: -8,
                        backgroundColor: '#FFD5D5',
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 3,
                      }}>
                      <SVGXml
                        icon={APPICONS.trash_red}
                        width={15}
                        height={15}
                      />
                    </TouchableOpacity>

                    {/* Play Icon Overlay for videos */}
                    {item.mime?.startsWith('video') && (
                      <View
                        style={{
                          position: 'absolute',
                          alignSelf: 'center',
                          top: '35%',
                        }}>
                        <SVGXml
                          icon={APPICONS.play_icon}
                          width={30}
                          height={30}
                        />
                      </View>
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default CreatePost;
