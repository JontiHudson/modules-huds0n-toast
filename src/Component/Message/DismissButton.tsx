import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon } from '@huds0n/components';
import { theme } from '@huds0n/theming/src/theme';
import { useCallback } from '@huds0n/utilities';

import ToastStateClass from '../../State';
import * as Types from '../../types';

export function DismissButton({
  message: { _id, contentsColor, data, onDismiss, showDismiss },
  ToastState,
}: {
  message: Types.StateMessage;
  ToastState: ToastStateClass;
}) {
  const handleDismissPress = useCallback(() => {
    _id && ToastState.toastHide(_id);
    onDismiss?.(data);
  }, [_id, data]);

  return (
    <Icon
      containerStyle={StyleSheet.flatten({
        paddingHorizontal: theme.spacings.M,
      })}
      color={contentsColor}
      name="cancel"
      set="MaterialIcons"
      size={24}
      onPress={handleDismissPress}
    />
  );
}
