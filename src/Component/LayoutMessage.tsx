import React from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  SafeAreaView,
  View as ViewRN,
} from 'react-native';

import { View } from '@huds0n/components';
import { useCallback, useEffect, useState, useRef } from '@huds0n/utilities';

import ToastStateClass from '../State';

import { Message } from './Message';

export const LayoutMessage = React.memo(
  ({ ToastState }: { ToastState: ToastStateClass }) => {
    const [{ currentMessage }] = ToastState.useState([
      '_refreshId',
      'currentMessage',
    ]);

    const wrapperRef = useRef<ViewRN>(null);

    const handleMessageLayout = useCallback(
      ({
        nativeEvent: {
          layout: { height: messageHeight },
        },
      }: LayoutChangeEvent) => {
        if (ToastState.isRootComponent) {
          wrapperRef.current?.measure(
            (x, y, width, height, pagex, pageY = 0) => {
              const yOffset =
                ToastState.position === 'top'
                  ? pageY
                  : pageY + messageHeight - Dimensions.get('screen').height;
              const translate =
                ToastState.position === 'top'
                  ? messageHeight + yOffset
                  : yOffset - messageHeight;

              ToastState.setState({ messageHeight, yOffset });

              ToastState.animateMessage(translate);
            },
          );
        } else {
          ToastState.setState({ messageHeight, yOffset: 0 });
          ToastState.animateMessage(
            ToastState.state.messages[0] ? messageHeight : 0,
          );
        }
      },
    );

    const show = refreshOnMessageChange(currentMessage);

    if (!show) {
      return null;
    }

    return (
      <View
        pointerEvents="none"
        onLayout={handleMessageLayout}
        style={{ position: 'absolute', opacity: 0 }}
      >
        {currentMessage && (
          <SafeAreaView>
            <View ref={wrapperRef}>
              <Message _isLayout {...currentMessage} ToastState={ToastState} />
            </View>
          </SafeAreaView>
        )}
      </View>
    );
  },
);

// This is so onLayout fires even if message doesn't change in size
function refreshOnMessageChange(currentMessage: any) {
  const [show, setShow] = useState(true);

  useEffect(
    () => {
      if (currentMessage) {
        setShow(false);
      }
    },
    [currentMessage],
    { layout: 'BEFORE' },
  );

  useEffect(
    () => {
      if (!show) {
        setShow(true);
      }
    },
    [show],
    { layout: 'BEFORE' },
  );

  return show;
}
