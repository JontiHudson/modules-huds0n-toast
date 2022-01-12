"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const components_1 = require("@huds0n/components");
const toast_1 = require("@huds0n/toast");
function Components() {
    const onSuccessPress = () => {
        toast_1.Toast.display({
            title: 'Success',
            message: 'Success message',
        });
    };
    const onWarnPress = () => {
        toast_1.Toast.display({
            title: 'Warn',
            message: 'Warn message',
            onPress: () => { },
        });
    };
    const onErrorPress = () => {
        toast_1.Toast.display({
            title: 'Error',
            message: 'Error message',
        });
    };
    const onNotifyPress = () => {
        toast_1.Toast.display({
            title: 'Notify',
            message: 'Notify message',
        });
    };
    return (<react_native_1.SafeAreaView style={styles.safeAreaView}>
      <toast_1.Toast>
        <react_native_1.View style={styles.container}>
          <components_1.Button onPress={onSuccessPress}>Success</components_1.Button>

          <components_1.Button onPress={onWarnPress}>Warn</components_1.Button>

          <components_1.Button onPress={onErrorPress}>Error</components_1.Button>

          <components_1.Button onPress={onNotifyPress}>Notify</components_1.Button>
        </react_native_1.View>
      </toast_1.Toast>
    </react_native_1.SafeAreaView>);
}
exports.default = Components;
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    safeAreaView: {
        flex: 1,
    },
});
