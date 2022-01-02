import React from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  ColorFaderContainer,
  ContentsFaderContainer,
} from '@huds0n/animations';
import { theme } from '@huds0n/theming/src/theme';
import { useMemo, darkenColor } from '@huds0n/utilities';

import ToastStateClass from '../State';

import { Message } from './Message';

export function AnimatedBanner({
  ToastState,
}: {
  ToastState: ToastStateClass;
}) {
  const [{ currentMessage, translateY, isPressed, safeAreaY }] =
    ToastState.useState([
      '_refreshId',
      'currentMessage',
      'translateY',
      'safeAreaY',
      'isPressed',
    ]);

  const safeAreaTranslate = useMemo(
    () =>
      safeAreaY > 0
        ? ToastState.translateYAnim.interpolate({
            inputRange: [0, safeAreaY],
            outputRange: [0, safeAreaY],
            extrapolate: 'clamp',
          })
        : 0,
    [safeAreaY],
  );

  const color = currentMessage?.backgroundColor || theme.colors.GREY;

  const pressedColor = useMemo(
    () => (isPressed ? darkenColor(color) : undefined),
    [color, isPressed],
  );

  const Background = (
    <ColorFaderContainer
      animation={{ duration: ToastState.animationDuration }}
      backgroundColor={color}
      overrideColor={pressedColor}
      style={StyleSheet.absoluteFill}
    />
  );

  const AnimatedMessage = (
    <Animated.View
      style={{
        overflow: 'visible',
        height: Dimensions.get('screen').height,
        top: -Dimensions.get('screen').height,
        transform: [{ translateY: ToastState.translateYAnim }],
      }}
    >
      {Background}

      <ContentsFaderContainer
        animationDuration={ToastState.animationDuration}
        style={{
          bottom: 0,
          height: translateY,
          justifyContent: 'flex-end',
          overflow: 'hidden',
          position: 'absolute',
          width: '100%',
        }}
        dependencies={currentMessage}
      >
        {currentMessage && (
          <Message message={currentMessage} ToastState={ToastState} />
        )}
      </ContentsFaderContainer>
    </Animated.View>
  );

  const AnimatedStatusBar = (
    <Animated.View
      style={{
        height: Dimensions.get('screen').height,
        top: -Dimensions.get('screen').height,
        position: 'absolute',
        width: '100%',
        transform: [{ translateY: safeAreaTranslate }],
        overflow: 'visible',
        // hides when pressed to show pressedColor on AnimatedMessage
        opacity: pressedColor ? 0 : 1,
      }}
    >
      {Platform.OS === 'android' ? (
        <View
          style={StyleSheet.flatten([
            {
              backgroundColor: color,
              height: '100%',
              position: 'absolute',
              width: '100%',
            },
            !!pressedColor && { backgroundColor: pressedColor },
          ])}
        />
      ) : (
        <ColorFaderContainer
          animation={{ duration: ToastState.animationDuration }}
          backgroundColor={color}
          style={StyleSheet.flatten([
            {
              height: '100%',
              position: 'absolute',
              width: '100%',
            },
            !!pressedColor && { backgroundColor: pressedColor },
          ])}
        />
      )}
    </Animated.View>
  );

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        width: '100%',
        flex: 1,
        zIndex: 1000,
      }}
    >
      {Platform.OS === 'android' && currentMessage && (
        <StatusBar backgroundColor={pressedColor ? pressedColor : color} />
      )}
      {!!currentMessage && !!translateY && (
        <View pointerEvents="box-none">
          {AnimatedMessage}
          {AnimatedStatusBar}
        </View>
      )}
    </View>
  );
}
