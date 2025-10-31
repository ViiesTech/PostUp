/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LineBreak from '../../components/LineBreak';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import APPICONS from './../../assets/icons/AppIcons';
import SVGXml from '../../components/SVGXML';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import AppButton from '../../components/AppButton';
import AppIcons from './../../assets/icons/AppIcons';
import {Calendar} from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ShowToast} from '../../utils/Hooks';
import {useSelector} from 'react-redux';
import {useCreateEventMutation, useLazyGetAllEventQuery} from '../../redux/services';
import { useNavigation } from '@react-navigation/native';

const CreateEvent = () => {
  const [media, setMedia] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [state, setState] = useState([
    {
      eventName: '',
      eventDesc: '',
      location: '',
    },
  ]);
  const {user} = useSelector(state => state?.persistedData);
  const [createEvent, {isLoading}] = useCreateEventMutation();
  const [getAllEvent] = useLazyGetAllEventQuery();
  const nav = useNavigation();

  const handleAddMedia = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo', 
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setSelectedTime(formattedTime);
    hideDatePicker();
  };

  const onChangeText = (value, text) => {
    setState(prevState => ({
      ...prevState,
      [value]: text,
    }));
  };

  const handleCreateEvent = async () => {
    if (!state.eventName) {
      return ShowToast('Please enter your event name');
    } else if (media.length === 0) {
      return ShowToast('Please add a photo');
    } else if (!state.eventDesc) {
      return ShowToast('Please enter your event description');
    } else if (!selectedDate) {
      return ShowToast('Please enter your event date');
    } else if (!selectedTime) {
      return ShowToast('Please enter your event time');
    } else if (!state.location) {
      return ShowToast('Please enter your event location');
    }

    const formData = new FormData();
    formData.append('userId', user?._id);
    formData.append('eventName', state.eventName);
    formData.append('time', selectedTime);
    formData.append('date', selectedDate);
    formData.append('description', state.eventDesc);
    formData.append('longitude', '106.5348');
    formData.append('latitude', '38.7946');
    formData.append('locationName', state.location);

    media.forEach(item => {
      if (item.path) {
        formData.append('eventImage', {
          uri: item.path,
          type: item.mime,
          name: item.filename,
        });
      }
    });

    try {
      const res = await createEvent(formData).unwrap();
      if (res.success) {
        ShowToast(res.message);
        handleFetchEvents();
        setMedia([]);
        setState({});
        setSelectedDate('');
        setSelectedTime('');
        nav.navigate('Main', {screen: 'Home'});
      } else {
        ShowToast(res.message);
      }
    } catch (err) {
      console.log('Failed to create event ====>', err?.data);
      ShowToast(
        err.error ||
          err?.error?.response?.data?.message ||
          'Failed to create event',
      );
    }
  };

  const handleFetchEvents = async () => {
      await getAllEvent()
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

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
        <AppHeader
          goBack
          heading="Create Event"
          textFontWeight={true}
          isCenteredHead={true}
        />
        <LineBreak space={2} />
        <View style={{paddingHorizontal: responsiveWidth(4)}}>
          <View>
            <AppText
              title={'Event Name'}
              textColor={AppColors.BLACK}
              textSize={1.8}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Event Name'}
              borderRadius={5}
              borderColor={AppColors.LIGHTGRAY}
              value={state.eventName}
              onChangeText={text => onChangeText('eventName', text)}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Event Description'}
              textColor={AppColors.BLACK}
              textSize={1.8}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Write your words'}
              borderRadius={5}
              multiline={true}
              inputHeight={15}
              textAlignVertical={'top'}
              borderColor={AppColors.LIGHTGRAY}
              value={state.eventDesc}
              onChangeText={text => onChangeText('eventDesc', text)}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Date'}
              textColor={AppColors.BLACK}
              textSize={1.8}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Enter your date name'}
              borderRadius={5}
              value={selectedDate}
              editable={false}
              inputWidth={78}
              rightIcon={
                <TouchableOpacity onPress={() => setShowDate(!showDate)}>
                  <SVGXml icon={AppIcons.date} width={20} height={20} />
                </TouchableOpacity>
              }
              borderColor={AppColors.LIGHTGRAY}
            />
            {showDate && (
              <Calendar
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  height: 350,
                }}
                onDayPress={day => {
                  setSelectedDate(day.dateString);
                  setShowDate(false);
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: '#00adf5',
                  },
                }}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#00adf5',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#dd99ee',
                }}
              />
            )}
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Time'}
              textColor={AppColors.BLACK}
              textSize={1.8}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Enter your time name'}
              borderRadius={5}
              editable={false}
              value={selectedTime}
              inputWidth={78}
              rightIcon={
                <TouchableOpacity onPress={() => showDatePicker()}>
                  <SVGXml icon={AppIcons.time} width={20} height={20} />
                </TouchableOpacity>
              }
              borderColor={AppColors.LIGHTGRAY}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <AppText
              title={'Location'}
              textColor={AppColors.BLACK}
              textSize={1.8}
            />
            <LineBreak space={1} />
            <AppTextInput
              inputPlaceHolder={'Enter your location name'}
              borderRadius={5}
              value={state.location}
              onChangeText={text => onChangeText('location', text)}
              inputWidth={78}
              borderColor={AppColors.LIGHTGRAY}
              rightIcon={
                <SVGXml icon={AppIcons.location} width={20} height={20} />
              }
            />
          </View>
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
          <LineBreak space={2} />
          <AppButton
            title={'Create Now'}
            buttoWidth={92}
            loading={isLoading}
            handlePress={() => handleCreateEvent()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateEvent;
