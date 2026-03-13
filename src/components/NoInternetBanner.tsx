import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {useNetInfo} from '../utils/useNetInfo';
import AppColors from '../utils/AppColors';

const NoInternetBanner = () => {
  const {isConnected} = useNetInfo();
  const translateY = useRef(new Animated.Value(-60)).current;
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the very first render so we don't flash the banner on mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (isConnected !== false) {
        return;
      }
    }

    Animated.spring(translateY, {
      toValue: isConnected === false ? 0 : -60,
      useNativeDriver: true,
      bounciness: 6,
    }).start();
  }, [isConnected, translateY]);

  return (
    <Animated.View
      style={[styles.banner, {transform: [{translateY}]}]}
      pointerEvents="none">
      <Text style={styles.text}>⚠️  No Internet Connection</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: AppColors.WHITE,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default NoInternetBanner;
