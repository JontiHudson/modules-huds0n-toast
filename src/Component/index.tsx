import React from 'react';
import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';

import { useMemo } from '@huds0n/utilities';

import ToastStateClass from '../State';
import * as Types from '../types';

import { AnimatedBanner } from './AnimatedBanner';
import { LayoutMessage } from './LayoutMessage';
import { ScreenContents } from './ScreenContents';
import { ScreenShrinker } from './ScreenShrinker';

export function getToastComponent(ToastState: ToastStateClass) {
  return function ToastComponent({ children }: Types.Props) {
    return (
      <View style={getContainerStyle(ToastState)}>
        <StatusBar />
        <LayoutMessage ToastState={ToastState} />
        <ScreenShrinker ToastState={ToastState} />
        <ScreenContents ToastState={ToastState}>{children}</ScreenContents>
        <AnimatedBanner ToastState={ToastState} />
      </View>
    );
  };
}

function getContainerStyle(ToastState: ToastStateClass): ViewStyle {
  return useMemo(() => {
    const { position } = ToastState;

    return StyleSheet.flatten([
      {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
      },
      position === 'top' && {
        flexDirection: 'column',
      },
      position === 'bottom' && {
        flexDirection: 'column-reverse',
      },
    ]);
  });
}
