import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Core } from '@huds0n/core';
import { useCallback, useMemo, useState, useEffect } from '@huds0n/utilities';

import ToastStateClass from '../../../State';
import * as Types from '../../../types';

import { ActionButtons } from './ActionButtons';

export function ReplyInput(
  props: Types.StateMessage & {
    _isLayout?: boolean;
    ToastState: ToastStateClass;
  },
) {
  const {
    _id,
    _isLayout,
    actionProps: { textInputProps, textInputButtonNames } = {},
    contentsColor,
    data,
    onTextSubmit,
    textValue,
    ToastState,
  } = props;

  const multiline = textInputProps?.multiline;

  const [value, setValue] = useState(textValue || '');

  const onChangeText = useCallback((text: string) => {
    setValue(text);
    ToastState.updateToastMessage(_id, { textValue: text }, false);
  });

  const onSubmitEditing = useCallback(
    ({ nativeEvent: { text } }) => {
      onTextSubmit?.(text, data);
      ToastState.toastHide(_id);
    },
    [data, onTextSubmit],
  );

  const TextInputButtons = useMemo(() => {
    const actions: Types.Action[] = [
      {
        label: textInputButtonNames?.cancel || 'Cancel',
        onPress: () => {
          ToastState.updateToastMessage(_id, {
            textValue: undefined,
            onTextSubmit: undefined,
          });
        },
      },
      {
        label: textInputButtonNames?.send || 'Send',
        onPress: () => {
          onTextSubmit?.(value, data);
          ToastState.toastHide(_id);
        },
      },
    ];

    return <ActionButtons {...props} actions={actions} />;
  }, [
    _id,
    data,
    onSubmitEditing,
    textInputButtonNames?.cancel,
    textInputButtonNames?.send,
    value,
  ]);

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

          padding: Core.spacings.M,
          width: '100%',
        }}
      >
        {!_isLayout && (
          <TextInput
            autoFocus
            clearButtonMode="always"
            returnKeyType={multiline ? undefined : 'done'}
            {...textInputProps}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={multiline ? undefined : onSubmitEditing}
            style={StyleSheet.flatten([
              { color: contentsColor, fontSize: Core.fontSizes.BODY },
              textInputProps?.style,
            ])}
          />
        )}
      </View>
      {TextInputButtons}
    </>
  );
}
