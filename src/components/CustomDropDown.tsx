/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import AppText from './AppTextComps/AppText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TwoOptionDropdown = ({ onOption1Press, onOption2Press }) => {
    const [open, setOpen] = useState(false);

    return (
        <View >
            {/* Dropdown Button */}
            <TouchableOpacity
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
                // onPress={() => nav.navigate('CreatePost')}
                onPress={() => setOpen(!open)}
            >
                <AppText
                    title={'Actions'}
                    textColor={AppColors.BTNCOLOURS}
                    textSize={1.6}
                    borderBottomWidth={1}
                    borderBottomColor={AppColors.BTNCOLOURS}
                    textFontWeight
                />
                <FontAwesome
                    name="caret-down"
                    size={responsiveFontSize(2)}
                    color={AppColors.BTNCOLOURS}
                />
            </TouchableOpacity>

            {/* Dropdown Options */}
            {open && (
                <View
                    style={{
                        backgroundColor: AppColors?.WHITE || '#fff',
                        borderRadius: 8,
                        marginTop: 5,
                        elevation: 5,
                        borderWidth: 1,
                        top: 20,
                        right: -8,
                        borderColor: AppColors?.LIGHTGRAY || '#ddd',
                        overflow: 'hidden',
                        position: 'absolute',
                        zIndex: 9999999,
                        width: responsiveWidth(30),
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            setOpen(false);
                            onOption1Press?.();
                        }}
                        style={{
                            paddingVertical: responsiveHeight(1.5),
                            paddingHorizontal: responsiveWidth(4),
                        }}>
                        <Text style={{ fontSize: responsiveFontSize(1.6), color: AppColors?.BLACK || '#000' }}>
                            Create Post
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setOpen(false);
                            onOption2Press?.();
                        }}
                        style={{
                            paddingVertical: responsiveHeight(1.5),
                            paddingHorizontal: responsiveWidth(4),
                        }}>
                        <Text style={{ fontSize: responsiveFontSize(1.6), color: AppColors?.BLACK || '#000' }}>
                            Create Event
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default TwoOptionDropdown;
