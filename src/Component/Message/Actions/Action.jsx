"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const components_1 = require("@huds0n/components");
const theming_1 = require("@huds0n/theming");
function Action(props) {
    (0, theming_1.useIsDarkMode)();
    const { action: { buttonStyle, label, labelStyle, textInput, onPress }, message: { _id, contentsColor, data }, ToastState, index, } = props;
    const _onPress = () => {
        var _a;
        if (textInput) {
            ToastState.updateToastMessage(_id, { selectedActionInput: textInput });
        }
        else if (!((_a = ToastState.state.currentMessage) === null || _a === void 0 ? void 0 : _a.selectedActionInput)) {
            ToastState.toastHide(_id);
        }
        onPress === null || onPress === void 0 ? void 0 : onPress(data);
    };
    return (<components_1.Button feedback={undefined} key={label} style={react_native_1.StyleSheet.flatten([
            {
                flex: 1,
                borderColor: contentsColor,
                borderRadius: 0,
                borderWidth: 0,
                borderBottomWidth: react_native_1.StyleSheet.hairlineWidth,
                borderTopWidth: react_native_1.StyleSheet.hairlineWidth,
            },
            index > 0 && { borderLeftWidth: react_native_1.StyleSheet.hairlineWidth },
            buttonStyle,
        ])} label={label} labelStyle={react_native_1.StyleSheet.flatten([{ color: contentsColor }, labelStyle])} onPress={_onPress}/>);
}
exports.Action = Action;
