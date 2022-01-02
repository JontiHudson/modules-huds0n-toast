import React from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '@huds0n/components';
import { useIsDarkMode } from '@huds0n/theming';

import ToastStateClass from '../../../State';
import * as Types from '../../../types';

export function Action(props: {
  ToastState: ToastStateClass;
  action: Types.Action;
  message: Types.StateMessage;
  index: number;
}) {
  useIsDarkMode();
  const {
    action: { buttonStyle, label, labelStyle, textInput, onPress },
    message: { _id, contentsColor, data },
    ToastState,
    index,
  } = props;

  const _onPress = () => {
    if (textInput) {
      ToastState.updateToastMessage(_id, { selectedActionInput: textInput });
    } else if (!ToastState.state.currentMessage?.selectedActionInput) {
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
          borderWidth: 0,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        index > 0 && { borderLeftWidth: StyleSheet.hairlineWidth },
        buttonStyle,
      ])}
      label={label}
      labelStyle={StyleSheet.flatten([{ color: contentsColor }, labelStyle])}
      onPress={_onPress}
    />
  );
}
