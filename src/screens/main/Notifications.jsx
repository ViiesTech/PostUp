/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';

const notificationsData = [
  {
    id: '1',
    name: 'Benjamin Poole',
    date: 'Nov 2nd',
    message:
      'Hi @tranmautritam, when you have time please take a look at the new designs I just made in Figma.',
    emoji: '👏',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    mention: '@tranmautritam',
    footerText: 'Katharine Wells Lorem ipsum dolor sit amet,',
  },
  {
    id: '2',
    name: 'Katharine Wells',
    date: 'Nov 2nd',
    message:
      'Please make the presentation as soon as possible Tam. We’re still waiting for it.',
    emoji: '🧡',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    footerText: 'Katharine Wells Lorem ipsum dolor sit amet,',
  },
  {
    id: '3',
    name: 'Bertha Ramos',
    date: 'Nov 2nd',
    message:
      'Are you actually working? I don’t see any new stuffs from you. Be creative!!!',
    emoji: '😤',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    footerText: 'Katharine Wells Lorem ipsum dolor sit amet,',
  },
  {
    id: '4',
    name: 'Marie Bowen',
    date: 'Nov 2nd',
    message:
      'Are you actually working? I don’t see any new stuffs from you. Be creative!!!',
    emoji: '😤',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    footerText: 'Katharine Wells Lorem ipsum dolor sit amet,',
  },
];

const MessageCard = ({item}) => (
  <View>
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <View style={{flex: 1}}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.message}>
        {item.message} <Text style={styles.emoji}>{item.emoji}</Text>
      </Text>
    </View>
    <LineBreak space={2} />
    <AppText
      title={item.footerText}
      textColor={AppColors.DARKGRAY}
      textSize={1.7}
    />
  </View>
);

const Notifications = () => {
  return (
    <ScrollView style={styles.container}>
      <AppHeader
        heading={'Notifications'}
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={60}
      />
      <LineBreak space={4} />

      <View style={{paddingHorizontal: responsiveWidth(6)}}>
        <FlatList
          data={notificationsData}
          keyExtractor={item => item.id}
          renderItem={({item}) => <MessageCard item={item} />}
          ItemSeparatorComponent={() => <LineBreak space={2} />}
        />
      </View>
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  card: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  name: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
  date: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.BLACK,
    fontWeight: 'bold',
  },
  message: {
    fontSize: responsiveFontSize(1.8),
    color: AppColors.DARKGRAY,
    paddingLeft: responsiveWidth(11),
  },
  emoji: {
    fontSize: responsiveFontSize(1.8),
  },
});
