import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@huds0n/theming/src/theme';

import * as Types from '../../types';

export function MessageText({
  contentsColor,
  message,
  messageStyle,
  title,
  titleStyle,
}: Types.StateMessage) {
  return (
    <View style={{ flex: 1, padding: theme.spacings.M }}>
      {title && (
        <Text
          style={StyleSheet.flatten([{ color: contentsColor }, titleStyle])}
        >
          {title}
        </Text>
      )}
      {message && (
        <Text
          style={StyleSheet.flatten([{ color: contentsColor }, messageStyle])}
        >
          {message}
        </Text>
      )}
    </View>
  );
}
