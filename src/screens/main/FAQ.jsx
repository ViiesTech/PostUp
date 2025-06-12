/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import AppHeader from '../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import AppText from '../../components/AppTextComps/AppText';

const faqs = [
  {
    question: 'Show me a tour of the how the PostUp works',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
  },
  {question: 'Question 2', answer: 'Answer for question 2'},
  {question: 'Question 3', answer: 'Answer for question 3'},
  {question: 'Question 5', answer: 'Answer for question 5'},
  {question: 'Question 6', answer: 'Answer for question 6'},
  {question: 'Question 7', answer: 'Answer for question 7'},
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = index => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      <AppHeader
        heading={'Frequently Asked Questions'}
        goBack
        isCenteredHead={true}
        textFontWeight={true}
        isCenteredHeadWidth={82}
      />
      <LineBreak space={4} />
      <View style={{paddingHorizontal: responsiveWidth(5)}}>
        {faqs.map((item, index) => (
          <View key={index}>
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() => toggle(index)}
                style={styles.questionRow}>
                <AppText
                  title={item.question}
                  textColor={AppColors.BLACK}
                  textSize={1.7}
                  textFontWeight
                />
                <Entypo
                  name={
                    activeIndex === index
                      ? 'chevron-small-up'
                      : 'chevron-small-down'
                  }
                  size={responsiveFontSize(3)}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            {activeIndex === index && (
              <View style={styles.answerBox}>
                <AppText
                  title={item.answer}
                  textColor={AppColors.LIGHTGRAY}
                  textSize={1.8}
                  lineHeight={3}
                />
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: AppColors.BLACK,
    borderRadius: 6,
    marginBottom: responsiveHeight(1),
    backgroundColor: '#fff',
    elevation: 5,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    borderRadius: 6,
  },
  answerBox: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
    borderWidth: 1,
    borderColor: '#eee',
  },
});
