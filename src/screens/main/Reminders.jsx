import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import notifee from '@notifee/react-native';
import {deleteReminder} from '../../redux/slices/appSlice';
import {Calendar} from 'react-native-calendars';

import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import {useCustomNavigation} from '../../utils/Hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Reminders = () => {
  const {navigateToRoute} = useCustomNavigation();
  const dispatch = useDispatch();
  const {user, reminders = []} = useSelector(
    state => state?.persistedData || {},
  );

  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = useCallback(day => {
    setSelectedDate(day.dateString);
    console.log('Selected Date:', day.dateString);
  }, []);

  const markedDates = useMemo(() => {
    const marks = {};
    reminders.forEach(reminder => {
      marks[reminder.date] = {
        marked: true,
        dotColor: AppColors.PRIMARY,
      };
    });

    if (selectedDate) {
      marks[selectedDate] = {
        ...marks[selectedDate],
        selected: true,
        selectedColor: AppColors.BTNCOLOURS,
      };
    }
    return marks;
  }, [reminders, selectedDate]);

  const selectedDateReminders = useMemo(() => {
    return reminders.filter(r => r.date === selectedDate);
  }, [reminders, selectedDate]);

  const handleDeleteReminder = async id => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await notifee.cancelNotification(id);
            dispatch(deleteReminder(id));
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader goBack isCenteredHead heading="Reminders" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <LineBreak space={2} />

        <View style={styles.calendarWrapper}>
          <Calendar
            style={styles.calendar}
            onDayPress={onDayPress}
            markingType={'dot'}
            theme={{
              backgroundColor: AppColors.WHITE,
              calendarBackground: AppColors.WHITE,
              textSectionTitleColor: AppColors.GRAY,
              selectedDayBackgroundColor: AppColors.BTNCOLOURS,
              selectedDayTextColor: AppColors.WHITE,
              todayTextColor: AppColors.BTNCOLOURS,
              dayTextColor: AppColors.BLACK,
              textDisabledColor: '#d9e1e8',
              dotColor: AppColors.BTNCOLOURS,
              selectedDotColor: AppColors.WHITE,
              arrowColor: AppColors.BTNCOLOURS,
              monthTextColor: AppColors.BLACK,
              indicatorColor: AppColors.BTNCOLOURS,
              textDayFontWeight: '400',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
            }}
            markedDates={markedDates}
          />
        </View>

        <LineBreak space={3} />

        {/* Reminders List Section */}
        <View style={styles.listHeader}>
          <AppText
            title={
              selectedDate ? `Reminders for ${selectedDate}` : 'Select a date'
            }
            textSize={2.2}
            textFontWeight
          />
        </View>

        <View style={styles.emptyContainer}>
          {selectedDateReminders.length > 0 ? (
            selectedDateReminders.map(reminder => (
              <View key={reminder.id} style={styles.reminderCard}>
                <View style={{flex: 1}}>
                  <AppText
                    title={reminder.title}
                    textSize={1.8}
                    textFontWeight
                  />
                  <AppText
                    title={reminder.description || 'No description'}
                    textColor={AppColors.GRAY}
                    textSize={1.4}
                  />
                  <AppText
                    title={moment(reminder.fullDate).format('h:mm a')}
                    textColor={AppColors.BTNCOLOURS}
                    textSize={1.2}
                    textFontWeight
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteReminder(reminder.id)}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={responsiveFontSize(2.5)}
                    color={AppColors.RED}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <AppText
              title="No reminders set for this date."
              textColor={AppColors.GRAY}
              textSize={1.8}
              textAlignment="center"
            />
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigateToRoute('CreateReminder')}
        activeOpacity={0.8}>
        <MaterialCommunityIcons
          name="plus"
          size={responsiveFontSize(3.5)}
          color={AppColors.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  calendarWrapper: {
    paddingHorizontal: responsiveWidth(5),
  },
  calendar: {
    borderRadius: 15,
    paddingBottom: 10,
    // Add shadow/elevation for a "card" look
    backgroundColor: AppColors.WHITE,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  listHeader: {
    paddingHorizontal: responsiveWidth(6),
    marginBottom: 15,
  },
  emptyContainer: {
    paddingHorizontal: responsiveWidth(6),
    marginTop: 10,
  },
  reminderCard: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  fab: {
    position: 'absolute',
    right: responsiveWidth(6),
    bottom: responsiveHeight(4),
    backgroundColor: AppColors.BTNCOLOURS,
    width: responsiveFontSize(6.5),
    height: responsiveFontSize(6.5),
    borderRadius: responsiveFontSize(3.25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default Reminders;
