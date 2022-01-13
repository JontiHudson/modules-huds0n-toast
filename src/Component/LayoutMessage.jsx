"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutMessage = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
const Message_1 = require("./Message");
exports.LayoutMessage = react_1.default.memo(({ ToastState }) => {
    const [{ currentMessage }] = ToastState.useState([
        "_refreshId",
        "currentMessage",
    ]);
    const wrapperRef = (0, utilities_1.useRef)(null);
    const handleMessageLayout = (0, utilities_1.useCallback)(({ nativeEvent: { layout: { height: messageHeight }, }, }) => {
        wrapperRef.current?.measure((x, y, width, height, pagex, pageY = 0) => {
            const translateY = messageHeight;
            const safeAreaY = messageHeight - height;
            const updatedState = ToastState.setState({
                translateY,
                safeAreaY,
            });
            if (updatedState)
                ToastState.animateMessage(translateY);
        });
    });
    const show = refreshOnMessageChange(currentMessage);
    if (!show) {
        return null;
    }
    return (<react_native_1.View pointerEvents="none" style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: 0,
        }}>
        <react_native_1.View pointerEvents="none" onLayout={handleMessageLayout} style={{
            width: "100%",
        }}>
          {currentMessage && (<react_native_1.SafeAreaView>
              <react_native_1.View ref={wrapperRef}>
                <Message_1.Message _isLayout message={currentMessage} ToastState={ToastState}/>
              </react_native_1.View>
            </react_native_1.SafeAreaView>)}
        </react_native_1.View>
      </react_native_1.View>);
});
function refreshOnMessageChange(currentMessage) {
    const [show, setShow] = (0, utilities_1.useState)(true);
    (0, utilities_1.useEffect)(() => {
        if (currentMessage) {
            setShow(false);
        }
    }, [currentMessage], { layout: "BEFORE" });
    (0, utilities_1.useEffect)(() => {
        if (!show) {
            setShow(true);
        }
    }, [show], { layout: "BEFORE" });
    return show;
}
