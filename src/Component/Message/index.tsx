import React from 'react';
import { View } from 'react-native';

import { Pressable, Icon } from '@huds0n/components';
import { Core } from '@huds0n/core';
import { useCallback } from '@huds0n/utilities';

import ToastStateClass from '../../State';
import * as Types from '../../types';

import { Actions } from './Actions';
import { DismissButton } from './DismissButton';
import { MessageText } from './MessageText';

export function Message(
  props: Types.StateMessage & {
    _isLayout?: boolean;
    ToastState: ToastStateClass;
  },
) {
  const {
    contentsColor,
    data,
    FooterComponent,
    icon,
    onPress,
    onTextSubmit,
    ToastState,
  } = props;

  ToastState.useProp('_refreshId');
  const [currentMessage] = ToastState.useProp('currentMessage');

  const _onPress = useCallback(() => {
    onPress?.(data);
  }, [data]);

  const onPressIn = useCallback(() => {
    ToastState.setState({ isPressed: true });
  });

  const onPressOut = useCallback(() => {
    ToastState.setState({ isPressed: false });
  });

  return (
    <View style={{ opacity: currentMessage ? 1 : 0 }}>
      {!onTextSubmit && (
        <Pressable
          disabled={!onPress}
          onPress={_onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={{
            paddingHorizontal: Core.spacings.L,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {icon && (
            <>
              <Icon color={contentsColor} size={24} {...icon} />
              <View style={{ width: Core.spacings.S }} />
            </>
          )}
          <MessageText {...props} />
          <DismissButton {...props} />
        </Pressable>
      )}
      {FooterComponent || (props.actions && <Actions {...props} />)}
    </View>
  );
}
