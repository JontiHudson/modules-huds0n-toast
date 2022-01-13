"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyInput = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const State_1 = (0, tslib_1.__importDefault)(require("../../../State"));
const ActionButtons_1 = require("./ActionButtons");
function ReplyInput(props) {
    var _a;
    const { _isLayout, message: { _id, contentsColor, data }, ToastState, } = props;
    if (!((_a = ToastState.state.currentMessage) === null || _a === void 0 ? void 0 : _a.selectedActionInput))
        return null;
    const { buttonNames, initialValue, onSubmit, props: inputProps, } = ToastState.state.currentMessage.selectedActionInput;
    const multiline = inputProps === null || inputProps === void 0 ? void 0 : inputProps.multiline;
    const [value, setValue] = (0, utilities_1.useState)(initialValue || "");
    const onSubmitEditing = (0, utilities_1.useCallback)(({ nativeEvent: { text } }) => {
        onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(text, data);
        ToastState.toastHide(_id);
    }, [data, onSubmit]);
    const TextInputButtons = (0, utilities_1.useMemo)(() => {
        const actions = [
            {
                label: (buttonNames === null || buttonNames === void 0 ? void 0 : buttonNames.cancel) || "Cancel",
                onPress: () => {
                    ToastState.updateToastMessage(_id, {
                        selectedActionInput: null,
                    });
                },
            },
            {
                label: (buttonNames === null || buttonNames === void 0 ? void 0 : buttonNames.send) || "Send",
                onPress: () => {
                    onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(value, data);
                    ToastState.toastHide(_id);
                },
            },
        ];
        return <ActionButtons_1.ActionButtons {...props} actions={actions}/>;
    }, [_id, data, onSubmit, buttonNames === null || buttonNames === void 0 ? void 0 : buttonNames.cancel, buttonNames === null || buttonNames === void 0 ? void 0 : buttonNames.send, value]);
    return (<>
      <react_native_1.View style={{
            borderColor: contentsColor,
            borderTopWidth: react_native_1.StyleSheet.hairlineWidth,
            justifyContent: multiline ? "flex-start" : "center",
            height: multiline
                ? State_1.default.DEFAULT_MULTILINE_TEXT_HEIGHT
                : State_1.default.DEFAULT_ACTION_HEIGHT,
            padding: theme_1.theme.spacings.M,
            width: "100%",
        }}>
        {!_isLayout && (<react_native_1.TextInput autoFocus clearButtonMode="always" returnKeyType={multiline ? undefined : "done"} {...inputProps} value={value} onChangeText={setValue} onSubmitEditing={multiline ? undefined : onSubmitEditing} style={react_native_1.StyleSheet.flatten([
                {
                    color: contentsColor,
                    fontSize: theme_1.theme.fontSizes.BODY,
                },
                react_native_1.Platform.OS === "web" && {
                    outlineStyle: "none",
                    height: "100%",
                },
                inputProps === null || inputProps === void 0 ? void 0 : inputProps.style,
            ])}/>)}
      </react_native_1.View>
      {TextInputButtons}
    </>);
}
exports.ReplyInput = ReplyInput;
