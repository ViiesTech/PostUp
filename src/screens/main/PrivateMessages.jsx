/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppTextInput from '../../components/AppTextInput';
import LineBreak from '../../components/LineBreak';

const messages = [
  {id: '1', text: 'Let me know when reached', time: '9:42 am', isUser: false},
  {id: '2', text: "I'm here", time: '9:43 am', isUser: true},
  {id: '3', text: '...', isTyping: true, isUser: false},
];

const renderItem = ({item}) => {
  if (item.isTyping) {
    return (
      <View style={[styles.messageBubble, styles.typingBubble]}>
        <Text style={styles.typingDots}>•••</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.otherMessage,
      ]}>
      <View
        style={[
          styles.messageBubble,
          {backgroundColor: item.isUser ? AppColors.BTNCOLOURS : '#587b58'},
        ]}>
        <Text
          style={[
            styles.messageText,
            {color: item.isUser ? AppColors.WHITE : AppColors.WHITE},
          ]}>
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            {color: item.isUser ? AppColors.WHITE : AppColors.WHITE},
          ]}>
          {item.time}
        </Text>
      </View>
    </View>
  );
};

const PrivateMessages = () => {
  return (
    <View style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        goBack
        heading="Alex Charlie"
        borderBottomWidth={0.5}
        borderBottomColor={AppColors.GRAY}
        paddingBottom={2}
        textFontWeight={true}
        privateMessages={'privateMessages'}
        profImg={
          <Image
            source={AppImages.user}
            style={{width: 40, height: 40, borderRadius: 100}}
          />
        }
      />

      <LineBreak space={2} />

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatArea}
      />

      <View style={styles.inputContainer}>
        <AppTextInput
          inputPlaceHolder={'Hello World'}
          inputWidth={65}
          containerBg={AppColors.WHITE}
          inputBgColour={AppColors.WHITE}
          borderColor={AppColors.WHITE}
          rightIcon={
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="paperclip"
                size={responsiveFontSize(3)}
                color={AppColors.BLACK}
                style={styles.icon}
              />
            </TouchableOpacity>
          }
        />
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="send"
            size={responsiveFontSize(3)}
            color="#007AFF"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrivateMessages;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: AppColors.WHITE},
  chatArea: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  messageContainer: {marginVertical: 5},
  messageBubble: {
    padding: responsiveHeight(1.5),
    borderRadius: 10,
    maxWidth: '70%',
    backgroundColor: AppColors.ThemeBlue,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {color: AppColors.WHITE},
  messageTime: {
    fontSize: responsiveFontSize(1.2),
    color: AppColors.WHITE,
    marginTop: responsiveHeight(0.5),
    textAlign: 'right',
  },
  typingBubble: {
    backgroundColor: '#587b58',
    alignSelf: 'flex-start',
    paddingHorizontal: responsiveWidth(5),
  },
  typingDots: {
    fontSize: responsiveFontSize(3),
    color: AppColors.BTNCOLOURS,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#D9D9D9',
  },
  icon: {
    marginHorizontal: responsiveWidth(1),
  },
});
