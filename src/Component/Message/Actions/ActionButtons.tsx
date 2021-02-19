import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@huds0n/components';
import { Core } from '@huds0n/core';
import { useMemo, useState } from '@huds0n/utilities';

import ToastStateClass from '../../../State';
import * as Types from '../../../types';

import { Action } from './Action';

export function ActionButtons(
  props: Types.StateMessage & {
    ToastState: ToastStateClass;
  },
) {
  const { actions, contentsColor } = props;

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        height: ToastStateClass.DEFAULT_ACTION_HEIGHT,
        borderColor: contentsColor,
      }}
    >
      {actions?.map((actionProps, index) => (
        <Action key={index} {...props} {...actionProps} index={index} />
      ))}
    </View>
  );
}
