"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenContents = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
function ScreenContents({ children, ToastState, }) {
    const [{ currentMessage, messages }] = ToastState.useState([
        "currentMessage",
        "messages",
    ]);
    const handleStartShouldSetResponderCapture = (0, utilities_1.useMemo)(() => currentMessage?.dismissOnScreenPress
        ? () => {
            ToastState.toastHide(currentMessage._id);
            return false;
        }
        : undefined, [currentMessage]);
    const shouldDisableScreenTouch = (0, utilities_1.useMemo)(() => {
        if (messages.some((message) => message.disableScreenTouch === true ||
            message.disableScreenTouch === "TRANSLUCENT")) {
            return "TRANSLUCENT";
        }
        if (messages.some((message) => message.disableScreenTouch === "TRANSPARENT")) {
            return "TRANSPARENT";
        }
    }, [messages]);
    return (<react_native_1.View onStartShouldSetResponderCapture={handleStartShouldSetResponderCapture} pointerEvents={shouldDisableScreenTouch ? "none" : undefined} style={{ flex: 1 }}>
      {children}
      {!!shouldDisableScreenTouch && (<react_native_1.View style={{
                position: "absolute",
                top: "-50%",
                height: "200%",
                width: "100%",
                backgroundColor: "black",
                opacity: shouldDisableScreenTouch === "TRANSPARENT" ? 0 : 0.3,
            }}/>)}
    </react_native_1.View>);
}
exports.ScreenContents = ScreenContents;
