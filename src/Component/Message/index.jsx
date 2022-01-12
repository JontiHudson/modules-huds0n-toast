"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const components_1 = require("@huds0n/components");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const Actions_1 = require("./Actions");
const DismissButton_1 = require("./DismissButton");
const MessageText_1 = require("./MessageText");
function Message(props) {
    const { message: { actions, contentsColor, data, FooterComponent, icon, onPress, showDismiss, title, message, }, ToastState, } = props;
    ToastState.useProp("_refreshId");
    const [currentMessage] = ToastState.useProp("currentMessage");
    const _onPress = (0, utilities_1.useCallback)(() => {
        onPress === null || onPress === void 0 ? void 0 : onPress(data);
    }, [onPress, data]);
    const onPressIn = (0, utilities_1.useCallback)(() => {
        ToastState.setState({ isPressed: true });
    });
    const onPressOut = (0, utilities_1.useCallback)(() => {
        ToastState.setState({ isPressed: false });
    });
    return (<react_native_1.View style={{ opacity: currentMessage ? 1 : 0 }}>
      {!(currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.selectedActionInput) && (<components_1.Pressable disabled={!onPress} onPress={_onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={{
                paddingHorizontal: theme_1.theme.spacings.L,
                flexDirection: "row",
                alignItems: "center",
            }}>
          {icon && (<>
              <components_1.Icon color={contentsColor} size={24} {...icon}/>
              <react_native_1.View style={{ width: theme_1.theme.spacings.S }}/>
            </>)}
          {(title || message) && <MessageText_1.MessageText {...props.message}/>}
          {showDismiss && <DismissButton_1.DismissButton {...props}/>}
        </components_1.Pressable>)}
      {FooterComponent || (actions && <Actions_1.Actions {...props}/>)}
    </react_native_1.View>);
}
exports.Message = Message;
