"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToastComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
const AnimatedBanner_1 = require("./AnimatedBanner");
const LayoutMessage_1 = require("./LayoutMessage");
const ScreenContents_1 = require("./ScreenContents");
const ScreenShrinker_1 = require("./ScreenShrinker");
function getToastComponent(ToastState) {
    return function ToastComponent(props) {
        const { animationDuration, defaultMessageProps } = props;
        (0, utilities_1.useEffect)(() => {
            if (typeof animationDuration === "number")
                ToastState.animationDuration = animationDuration;
        }, [animationDuration], { layout: "BEFORE" });
        (0, utilities_1.useEffect)(() => {
            if (defaultMessageProps)
                ToastState.updateDefaultProps(defaultMessageProps);
        }, [defaultMessageProps], { layout: "BEFORE" });
        return (<react_native_1.View style={{
                height: "100%",
                width: "100%",
            }}>
        <react_native_1.StatusBar />
        <LayoutMessage_1.LayoutMessage ToastState={ToastState} {...props}/>
        <ScreenShrinker_1.ScreenShrinker ToastState={ToastState}/>
        <ScreenContents_1.ScreenContents ToastState={ToastState} {...props}/>
        <AnimatedBanner_1.AnimatedBanner ToastState={ToastState} {...props}/>
      </react_native_1.View>);
    };
}
exports.getToastComponent = getToastComponent;
