import React from 'react';
import { Animated } from 'react-native';

import { Core } from '@huds0n/core';
import { useAnimatedValue, useEffect } from '@huds0n/utilities';

import ToastStateClass from '../State';

export function ScreenShrinker({
  ToastState,
}: {
  ToastState: ToastStateClass;
}) {
  const [{ currentMessage, messageHeight, yOffset }] = ToastState.useState([
    'currentMessage',
    'messageHeight',
    'yOffset',
  ]);

  const isTop = ToastState.position === 'top';

  const heightAnim = useAnimatedValue();

  useEffect(
    () => {
      if (messageHeight && currentMessage?.layout === 'relative') {
        Animated.timing(heightAnim, {
          toValue: ToastState.heightAnim.interpolate(
            isTop
              ? {
                  inputRange: [yOffset, messageHeight + yOffset],
                  outputRange: [0, messageHeight],
                  extrapolateLeft: 'clamp',
                }
              : {
                  inputRange: [yOffset - messageHeight, yOffset],
                  outputRange: [messageHeight, 0],
                  extrapolateRight: 'clamp',
                },
          ),
          duration: 0,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: ToastState.animationDuration,
          useNativeDriver: false,
        }).start();
      }
    },
    [messageHeight],
    { layout: 'BEFORE' },
  );

  return (
    <Animated.View
      style={{
        backgroundColor: currentMessage?.backgroundColor || Core.colors.GREY,
        height: heightAnim,
        width: '100%',
      }}
    />
  );
}
