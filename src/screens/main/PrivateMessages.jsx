/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AppTextInput from '../../components/AppTextInput';
import LineBreak from '../../components/LineBreak';

const INITIAL_MESSAGES = [
  {id: '3', text: '...', isTyping: true, isUser: false},
  {id: '2', text: "I'm here", time: '9:43 am', isUser: true},
  {id: '1', text: 'Let me know when reached', time: '9:42 am', isUser: false},
];

const PrivateMessages = () => {
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);

  const renderItem = ({item}) => {
    if (item.isTyping) {
      return (
        <View style={[styles.messageBubble, styles.typingBubble]}>
          <Text style={styles.typingDots}>•••</Text>
        </View>
      );
    }

    const isUser = item.isUser;

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.otherMessage,
        ]}>
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isUser ? AppColors.BTNCOLOURS : '#587b58',
              borderBottomRightRadius: isUser ? 2 : 15,
              borderBottomLeftRadius: isUser ? 15 : 2,
            },
          ]}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  const handleSend = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: messageText,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isUser: true,
      };
      setChatMessages([newMessage, ...chatMessages]);
      setMessageText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <AppHeader
        goBack
        heading="Alex Charlie"
        borderBottomWidth={0.5}
        borderBottomColor={AppColors.GRAY}
        paddingBottom={2}
        textFontWeight={true}
        privateMessages={'privateMessages'}
        profImg={
          <Image source={AppImages.user} style={styles.headerProfileImg} />
        }
      />

      <FlatList
        data={chatMessages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatArea}
        inverted // Messages start from bottom
      />

      <View style={styles.inputWrapper}>
        <View style={styles.inputInnerContainer}>
          <AppTextInput
            value={messageText}
            onChangeText={val => setMessageText(val)}
            inputPlaceHolder={'Type a message...'}
            inputWidth={70}
            containerBg={AppColors.WHITE}
            inputBgColour={AppColors.WHITE}
            borderColor={AppColors.WHITE}
            borderRadius={8}
            rightIcon={
              <TouchableOpacity activeOpacity={0.7}>
                <Feather
                  name="paperclip"
                  size={responsiveFontSize(3)}
                  color={AppColors.BLACK}
                />
              </TouchableOpacity>
            }
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <FontAwesome
              name="send"
              size={responsiveFontSize(3)}
              color={AppColors.BTNCOLOURS}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PrivateMessages;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: AppColors.WHITE},
  headerProfileImg: {width: 40, height: 40, borderRadius: 20},
  chatArea: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  messageContainer: {marginVertical: 6},
  messageBubble: {
    padding: responsiveHeight(1.5),
    borderRadius: 15,
    maxWidth: '80%',
  },
  userMessage: {alignSelf: 'flex-end'},
  otherMessage: {alignSelf: 'flex-start'},
  messageText: {
    color: AppColors.WHITE,
    fontSize: responsiveFontSize(1.8),
  },
  messageTime: {
    fontSize: responsiveFontSize(1.2),
    color: 'rgba(255,255,255,0.7)',
    marginTop: responsiveHeight(0.5),
    textAlign: 'right',
  },
  typingBubble: {
    backgroundColor: '#587b58',
    alignSelf: 'flex-start',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
  },
  typingDots: {
    fontSize: responsiveFontSize(2.5),
    color: AppColors.WHITE,
  },
  inputWrapper: {
    paddingBottom:
      Platform.OS === 'ios' ? responsiveHeight(2) : responsiveHeight(1.5),
    paddingTop: responsiveHeight(1),
    backgroundColor: '#F2F2F2',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputInnerContainer: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(4),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sendBtn: {
    padding: 10,
    // backgroundColor: AppColors.WHITE,
    // borderRadius: 50,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.2,
    // shadowRadius: 1,
  },
});
