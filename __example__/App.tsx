import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Button } from '@huds0n/components';
import { Toast } from '@huds0n/toast';

export default function Components() {
  const onSuccessPress = () => {
    Toast.display({
      title: 'Success',
      message: 'Success message',
    });
  };

  const onWarnPress = () => {
    Toast.display({
      title: 'Warn',
      message: 'Warn message',
      onPress: () => {},
    });
  };

  const onErrorPress = () => {
    Toast.display({
      title: 'Error',
      message: 'Error message',
    });
  };

  const onNotifyPress = () => {
    Toast.display({
      title: 'Notify',
      message: 'Notify message',
    });
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Toast>
        <View style={styles.container}>
          <Button onPress={onSuccessPress}>Success</Button>

          <Button onPress={onWarnPress}>Warn</Button>

          <Button onPress={onErrorPress}>Error</Button>

          <Button onPress={onNotifyPress}>Notify</Button>
        </View>
      </Toast>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  safeAreaView: {
    flex: 1,
  },
});
