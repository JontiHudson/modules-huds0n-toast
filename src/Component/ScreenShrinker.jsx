"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenShrinker = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
function ScreenShrinker({ ToastState, }) {
    const [{ currentMessage, translateY }] = ToastState.useState([
        'currentMessage',
        'translateY',
    ]);
    const prevMessage = ToastState.prevState.currentMessage;
    const heightAnim = (0, utilities_1.useAnimatedValue)();
    (0, utilities_1.useEffect)(() => {
        if ((currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.layout) === 'relative') {
            if ((prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.layout) === 'absolute') {
                react_native_1.Animated.timing(heightAnim, {
                    toValue: ToastState.translateYAnim,
                    duration: ToastState.animationDuration,
                    useNativeDriver: false,
                }).start(({ finished }) => {
                    finished &&
                        react_native_1.Animated.timing(heightAnim, {
                            toValue: ToastState.translateYAnim,
                            duration: 0,
                            useNativeDriver: false,
                        }).start();
                });
            }
            else {
                react_native_1.Animated.timing(heightAnim, {
                    toValue: ToastState.translateYAnim,
                    duration: 0,
                    useNativeDriver: false,
                }).start();
            }
        }
        else {
            react_native_1.Animated.timing(heightAnim, {
                toValue: 0,
                duration: ToastState.animationDuration,
                useNativeDriver: false,
            }).start();
        }
    }, [translateY], { layout: 'BEFORE' });
    return (<react_native_1.Animated.View style={{
            backgroundColor: (currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.backgroundColor) || theme_1.theme.colors.GREY,
            height: heightAnim,
            width: '100%',
        }}/>);
}
exports.ScreenShrinker = ScreenShrinker;
