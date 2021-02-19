import React from 'react';
import { StyleSheet } from 'react-native';

import { Core } from '@huds0n/core';
import { Icon } from '@huds0n/components';
import { useCallback } from '@huds0n/utilities';

import ToastStateClass from '../../State';
import * as Types from '../../types';

export function DismissButton({
  _id,
  contentsColor,
  data,
  onDismiss,
  showDismiss,
  ToastState,
}: Types.StateMessage & { ToastState: ToastStateClass }) {
  const handleDismissPress = useCallback(() => {
    _id && ToastState.toastHide(_id);
    onDismiss?.(data);
  }, [_id, data]);

  if (showDismiss) {
    return (
      <Icon
        containerStyle={StyleSheet.flatten({
          paddingHorizontal: Core.spacings.M,
        })}
        color={contentsColor}
        name="cancel"
        set="MaterialIcons"
        size={24}
        onPress={handleDismissPress}
      />
    );
  }

  return null;
}
