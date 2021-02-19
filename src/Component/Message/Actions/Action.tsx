import React from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '@huds0n/components';

import ToastStateClass from '../../../State';
import * as Types from '../../../types';

export function Action(
  props: Types.StateMessage &
    Types.Action & { index: number; ToastState: ToastStateClass },
) {
  const {
    _id,
    actionProps: { buttonStyle, labelStyle } = {},
    contentsColor,
    data,
    ToastState,
    label,
    onPress,
    onTextSubmit,
    index,
  } = props;

  const _onPress = () => {
    if (onTextSubmit) {
      ToastState.updateToastMessage(_id, { onTextSubmit });
    } else {
      ToastState.toastHide(_id);
    }

    onPress?.(data);
  };

  return (
    <Button
      feedback={undefined}
      key={label}
      style={StyleSheet.flatten([
        {
          flex: 1,
          borderColor: contentsColor,
          borderRadius: 0,
          borderWidth: StyleSheet.hairlineWidth,
        },
        buttonStyle,
      ])}
      label={label}
      labelStyle={StyleSheet.flatten([{ color: contentsColor }, labelStyle])}
      onPress={_onPress}
    />
  );
}
