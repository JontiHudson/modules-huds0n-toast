import React from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';

import {
  ColorFaderContainer,
  ContentsFaderContainer,
} from '@huds0n/animations';
import { Core } from '@huds0n/core';
import { useMemo, darkenColor } from '@huds0n/utilities';

import ToastStateClass from '../State';

import { Message } from './Message';

export function AnimatedBanner({
  ToastState,
}: {
  ToastState: ToastStateClass;
}) {
  const [
    { currentMessage, messageHeight, isPressed, yOffset },
  ] = ToastState.useState([
    '_refreshId',
    'currentMessage',
    'messageHeight',
    'yOffset',
    'isPressed',
  ]);

  const isTop = ToastState.position === 'top';
  const isRoot = ToastState.isRootComponent;

  const safeAreaTranslate = useMemo(
    () =>
      ToastState.heightAnim.interpolate(
        isTop
          ? {
              inputRange: [0, yOffset],
              outputRange: [0, yOffset],
              extrapolate: 'clamp',
            }
          : {
              inputRange: [yOffset, 0],
              outputRange: [yOffset, 0],
              extrapolate: 'clamp',
            },
      ),
    [yOffset],
  );

  const color = currentMessage?.backgroundColor || Core.colors.GREY;

  const pressedColor = useMemo(
    () => (isPressed ? darkenColor(color) : undefined),
    [color, isPressed],
  );

  const Background = (
    <ColorFaderContainer
      animation={{ duration: ToastState.animationDuration }}
      backgroundColor={color}
      overrideColor={pressedColor}
      style={StyleSheet.flatten({
        [isTop ? 'top' : 'bottom']: '-200%',
        height: '300%',
        position: 'absolute',
        width: '100%',
      })}
    />
  );

  const AnimatedMessage = (
    <Animated.View
      style={{
        overflow: 'visible',
        [isTop ? 'top' : 'bottom']: '-100%',
        transform: [{ translateY: ToastState.heightAnim }],
      }}
    >
      {Background}
      <SafeAreaView>
        <ContentsFaderContainer
          animationDuration={ToastState.animationDuration}
          style={{
            justifyContent: isTop ? 'flex-end' : 'flex-start',
            height: messageHeight,
            width: '100%',
            overflow: 'hidden',
          }}
          dependencies={'true'}
        >
          {currentMessage && (
            <Message {...currentMessage} ToastState={ToastState} />
          )}
        </ContentsFaderContainer>
      </SafeAreaView>
    </Animated.View>
  );

  const AnimatedStatusBar = (
    <Animated.View
      style={{
        [isTop ? 'top' : 'bottom']: isTop ? -yOffset : yOffset,
        height: isTop ? yOffset : -yOffset,
        position: 'absolute',
        width: '100%',
        transform: [{ translateY: safeAreaTranslate }],
        overflow: 'visible',
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
      style={StyleSheet.flatten([
        {
          position: 'absolute',
          width: '100%',
          flex: 1,
          zIndex: 1000,
        },
        isTop ? { top: -yOffset } : { bottom: yOffset },
      ])}
    >
      {Platform.OS === 'android' && currentMessage && (
        <StatusBar backgroundColor={pressedColor ? pressedColor : color} />
      )}
      {!!currentMessage && (
        <View>
          {AnimatedMessage}
          {isRoot && AnimatedStatusBar}
        </View>
      )}
    </View>
  );
}
