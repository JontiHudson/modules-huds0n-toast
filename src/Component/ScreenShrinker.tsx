import React from 'react';
import { Animated } from 'react-native';

import { theme } from '@huds0n/theming/src/theme';
import { useAnimatedValue, useEffect } from '@huds0n/utilities';

import ToastStateClass from '../State';

export function ScreenShrinker({
  ToastState,
}: {
  ToastState: ToastStateClass;
}) {
  const [{ currentMessage, translateY }] = ToastState.useState([
    'currentMessage',
    'translateY',
  ]);

  const prevMessage = ToastState.prevState.currentMessage;

  const heightAnim = useAnimatedValue();

  useEffect(
    () => {
      if (currentMessage?.layout === 'relative') {
        if (prevMessage?.layout === 'absolute') {
          Animated.timing(heightAnim, {
            toValue: ToastState.translateYAnim,
            duration: ToastState.animationDuration,
            useNativeDriver: false,
          }).start(({ finished }) => {
            finished &&
              Animated.timing(heightAnim, {
                toValue: ToastState.translateYAnim,
                duration: 0,
                useNativeDriver: false,
              }).start();
          });
        } else {
          Animated.timing(heightAnim, {
            toValue: ToastState.translateYAnim,
            duration: 0,
            useNativeDriver: false,
          }).start();
        }
      } else {
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: ToastState.animationDuration,
          useNativeDriver: false,
        }).start();
      }
    },
    [translateY],
    { layout: 'BEFORE' },
  );

  return (
    <Animated.View
      style={{
        backgroundColor: currentMessage?.backgroundColor || theme.colors.GREY,
        height: heightAnim,
        width: '100%',
      }}
    />
  );
}
