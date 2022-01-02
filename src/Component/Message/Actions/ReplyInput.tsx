import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

import { theme } from '@huds0n/theming/src/theme';
import { useCallback, useMemo, useState } from '@huds0n/utilities';

import ToastStateClass from '../../../State';
import * as Types from '../../../types';

import { ActionButtons } from './ActionButtons';

export function ReplyInput(props: {
  _isLayout?: boolean;
  message: Types.StateMessage;
  ToastState: ToastStateClass;
}) {
  const {
    _isLayout,
    message: { _id, contentsColor, data },
    ToastState,
  } = props;

  if (!ToastState.state.currentMessage?.selectedActionInput) return null;

  const {
    buttonNames,
    initialValue,
    onSubmit,
    props: inputProps,
  } = ToastState.state.currentMessage.selectedActionInput;

  const multiline = inputProps?.multiline;

  const [value, setValue] = useState(initialValue || '');

  const onSubmitEditing = useCallback(
    ({ nativeEvent: { text } }) => {
      onSubmit?.(text, data);
      ToastState.toastHide(_id);
    },
    [data, onSubmit],
  );

  const TextInputButtons = useMemo(() => {
    const actions: Types.Action[] = [
      {
        label: buttonNames?.cancel || 'Cancel',
        onPress: () => {
          ToastState.updateToastMessage(_id, {
            selectedActionInput: null,
          });
        },
      },
      {
        label: buttonNames?.send || 'Send',
        onPress: () => {
          onSubmit?.(value, data);
          ToastState.toastHide(_id);
        },
      },
    ];

    return <ActionButtons {...props} actions={actions} />;
  }, [_id, data, onSubmit, buttonNames?.cancel, buttonNames?.send, value]);

  return (
    <>
      <View
        style={{
          borderColor: contentsColor,
          borderTopWidth: StyleSheet.hairlineWidth,
          justifyContent: multiline ? 'flex-start' : 'center',
          height: multiline
            ? ToastStateClass.DEFAULT_MULTILINE_TEXT_HEIGHT
            : ToastStateClass.DEFAULT_ACTION_HEIGHT,

          padding: theme.spacings.M,
          width: '100%',
        }}
      >
        {!_isLayout && (
          <TextInput
            autoFocus
            clearButtonMode="always"
            returnKeyType={multiline ? undefined : 'done'}
            {...inputProps}
            value={value}
            onChangeText={setValue}
            onSubmitEditing={multiline ? undefined : onSubmitEditing}
            style={StyleSheet.flatten([
              {
                color: contentsColor,
                fontSize: theme.fontSizes.BODY,
              },
              Platform.OS === 'web' && {
                outlineStyle: 'none',
                height: '100%',
              },
              inputProps?.style,
            ])}
          />
        )}
      </View>
      {TextInputButtons}
    </>
  );
}
