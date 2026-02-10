import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppImages from '../../assets/images/AppImages';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '../../components/AppButton';
import {useCustomNavigation} from '../../utils/Hooks';

const TABS = [
  {id: 1, title: 'Messages'},
  {id: 2, title: 'Map'},
];

const MESSAGE_DATA = [
  {
    id: '1',
    userImg: AppImages.user,
    username: 'Taylor Jonhanson',
    time: '10:45',
    message: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    id: '2',
    userImg: AppImages.user,
    username: 'Taylor Jonhanson',
    time: '10:45',
    message: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    id: '3',
    userImg: AppImages.user,
    username: 'Taylor Jonhanson',
    time: '10:45',
    message: 'Lorem ipsum dolor sit amet consectetur.',
  },
];

const Messages = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const {navigateToRoute} = useCustomNavigation();

  // Helper to render the Message List
  const renderMessageItem = ({item}) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => navigateToRoute('PrivateMessages')}>
      <View style={styles.row}>
        <Image source={item.userImg} style={styles.avatarSmall} />
        <View style={{flex: 1}}>
          <View style={styles.messageHeader}>
            <AppText
              title={item.username}
              textColor={AppColors.BLACK}
              textSize={1.8}
              textFontWeight
            />
            <AppText
              title={item.time}
              textColor={AppColors.GRAY}
              textSize={1.5}
            />
          </View>
          <LineBreak space={0.5} />
          <AppText
            title={item.message}
            textColor={AppColors.LIGHTGRAY}
            textSize={1.5}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        goBack
        heading={activeTab.title}
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={activeTab.id === 2 ? 52 : null}
        paddingBottom={2}
        borderBottomWidth={0.5}
        borderBottomColor={AppColors.DARKGRAY}
      />

      <LineBreak space={3} />

      {/* Tab Switcher */}
      <View style={{paddingHorizontal: responsiveWidth(5)}}>
        <FlatList
          data={TABS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.tabButton,
                {
                  backgroundColor:
                    activeTab.id === item.id
                      ? AppColors.BTNCOLOURS
                      : AppColors.lowGreen,
                },
              ]}
              onPress={() => setActiveTab(item)}>
              <AppText
                title={item.title}
                textColor={AppColors.WHITE}
                textSize={2}
                textFontWeight
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <LineBreak space={3} />

      {/* Main Content Area */}
      {activeTab.id === 1 ? (
        <FlatList
          data={MESSAGE_DATA}
          keyExtractor={item => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={{paddingBottom: 20}}
        />
      ) : (
        <View style={{flex: 1, paddingHorizontal: responsiveWidth(5)}}>
          <Image
            source={AppImages.msg_map}
            style={styles.mapImage}
            resizeMode="cover"
          />

          <LineBreak space={3} />

          <View style={styles.mapUserInfo}>
            <View style={styles.row}>
              <Image source={AppImages.user} style={styles.avatarLarge} />
              <View style={{flex: 1}}>
                <View style={styles.mapHeaderRow}>
                  <AppText
                    title={'John Doe'}
                    textColor={AppColors.BLACK}
                    textSize={2}
                    textFontWeight
                  />
                  <TouchableOpacity>
                    <AntDesign
                      name="closecircleo"
                      size={responsiveFontSize(3.5)}
                      color={AppColors.BTNCOLOURS}
                    />
                  </TouchableOpacity>
                </View>
                <AppText
                  title={'Last active 3h ago'}
                  textColor={AppColors.LIGHTGRAY}
                  textSize={1.5}
                />
              </View>
            </View>
            <LineBreak space={4} />
            <AppButton
              title={'Chat'}
              borderRadius={5}
              buttoWidth={90}
              handlePress={() => navigateToRoute('PrivateMessages')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  tabContainer: {
    backgroundColor: AppColors.lowGreen,
    borderRadius: 100,
  },
  tabButton: {
    width: responsiveWidth(45),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 100,
  },
  messageItem: {
    paddingVertical: responsiveHeight(2),
    borderTopWidth: 1,
    borderTopColor: AppColors.DARKGRAY,
    paddingHorizontal: responsiveWidth(5),
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarLarge: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  mapImage: {
    width: '100%',
    height: responsiveHeight(45),
    borderRadius: 15,
    alignSelf: 'center',
  },
  mapUserInfo: {
    paddingVertical: responsiveHeight(1),
  },
  mapHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Messages;
