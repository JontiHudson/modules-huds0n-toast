import React from 'react';
import { View } from 'react-native';

import { Pressable, Icon } from '@huds0n/components';
import { theme } from '@huds0n/theming/src/theme';
import { useCallback } from '@huds0n/utilities';

import ToastStateClass from '../../State';
import * as Types from '../../types';

import { Actions } from './Actions';
import { DismissButton } from './DismissButton';
import { MessageText } from './MessageText';

export function Message(props: {
  _isLayout?: boolean;
  message: Types.StateMessage;
  ToastState: ToastStateClass;
}) {
  const {
    message: {
      actions,
      contentsColor,
      data,
      FooterComponent,
      icon,
      onPress,
      showDismiss,
      title,
      message,
    },
    ToastState,
  } = props;

  ToastState.useProp('_refreshId');
  const [currentMessage] = ToastState.useProp('currentMessage');

  const _onPress = useCallback(() => {
    onPress?.(data);
  }, [onPress, data]);

  const onPressIn = useCallback(() => {
    ToastState.setState({ isPressed: true });
  });

  const onPressOut = useCallback(() => {
    ToastState.setState({ isPressed: false });
  });

  return (
    <View style={{ opacity: currentMessage ? 1 : 0 }}>
      {!currentMessage?.selectedActionInput && (
        <Pressable
          disabled={!onPress}
          onPress={_onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={{
            paddingHorizontal: theme.spacings.L,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {icon && (
            <>
              <Icon color={contentsColor} size={24} {...icon} />
              <View style={{ width: theme.spacings.S }} />
            </>
          )}
          {(title || message) && <MessageText {...props.message} />}
          {showDismiss && <DismissButton {...props} />}
        </Pressable>
      )}
      {FooterComponent || (actions && <Actions {...props} />)}
    </View>
  );
}
