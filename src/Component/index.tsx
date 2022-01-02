import React from 'react';
import { StatusBar, View } from 'react-native';

import { useEffect } from '@huds0n/utilities';

import ToastStateClass from '../State';
import * as Types from '../types';

import { AnimatedBanner } from './AnimatedBanner';
import { LayoutMessage } from './LayoutMessage';
import { ScreenContents } from './ScreenContents';
import { ScreenShrinker } from './ScreenShrinker';

export function getToastComponent(ToastState: ToastStateClass) {
  return function ToastComponent(props: Types.Props) {
    const { animationDuration, defaultMessageProps } = props;

    useEffect(
      () => {
        if (typeof animationDuration === 'number')
          ToastState.animationDuration = animationDuration;
      },
      [animationDuration],
      { layout: 'BEFORE' },
    );

    useEffect(
      () => {
        if (defaultMessageProps)
          ToastState.updateDefaultProps(defaultMessageProps);
      },
      [defaultMessageProps],
      { layout: 'BEFORE' },
    );

    return (
      <View
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <StatusBar />
        <LayoutMessage ToastState={ToastState} {...props} />
        <ScreenShrinker ToastState={ToastState} />
        <ScreenContents ToastState={ToastState} {...props} />
        <AnimatedBanner ToastState={ToastState} {...props} />
      </View>
    );
  };
}
