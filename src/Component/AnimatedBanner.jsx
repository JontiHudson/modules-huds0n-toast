"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedBanner = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const animations_1 = require("@huds0n/animations");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const Message_1 = require("./Message");
function AnimatedBanner({ ToastState, }) {
    const [{ currentMessage, translateY, isPressed, safeAreaY }] = ToastState.useState([
        '_refreshId',
        'currentMessage',
        'translateY',
        'safeAreaY',
        'isPressed',
    ]);
    const safeAreaTranslate = (0, utilities_1.useMemo)(() => safeAreaY > 0
        ? ToastState.translateYAnim.interpolate({
            inputRange: [0, safeAreaY],
            outputRange: [0, safeAreaY],
            extrapolate: 'clamp',
        })
        : 0, [safeAreaY]);
    const color = (currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.backgroundColor) || theme_1.theme.colors.GREY;
    const pressedColor = (0, utilities_1.useMemo)(() => (isPressed ? (0, utilities_1.darkenColor)(color) : undefined), [color, isPressed]);
    const Background = (<animations_1.ColorFaderContainer animation={{ duration: ToastState.animationDuration }} backgroundColor={color} overrideColor={pressedColor} style={react_native_1.StyleSheet.absoluteFill}/>);
    const AnimatedMessage = (<react_native_1.Animated.View style={{
            overflow: 'visible',
            height: react_native_1.Dimensions.get('screen').height,
            top: -react_native_1.Dimensions.get('screen').height,
            transform: [{ translateY: ToastState.translateYAnim }],
        }}>
      {Background}

      <animations_1.ContentsFaderContainer animationDuration={ToastState.animationDuration} style={{
            bottom: 0,
            height: translateY,
            justifyContent: 'flex-end',
            overflow: 'hidden',
            position: 'absolute',
            width: '100%',
        }} dependencies={currentMessage}>
        {currentMessage && (<Message_1.Message message={currentMessage} ToastState={ToastState}/>)}
      </animations_1.ContentsFaderContainer>
    </react_native_1.Animated.View>);
    const AnimatedStatusBar = (<react_native_1.Animated.View style={{
            height: react_native_1.Dimensions.get('screen').height,
            top: -react_native_1.Dimensions.get('screen').height,
            position: 'absolute',
            width: '100%',
            transform: [{ translateY: safeAreaTranslate }],
            overflow: 'visible',
            opacity: pressedColor ? 0 : 1,
        }}>
      {react_native_1.Platform.OS === 'android' ? (<react_native_1.View style={react_native_1.StyleSheet.flatten([
                {
                    backgroundColor: color,
                    height: '100%',
                    position: 'absolute',
                    width: '100%',
                },
                !!pressedColor && { backgroundColor: pressedColor },
            ])}/>) : (<animations_1.ColorFaderContainer animation={{ duration: ToastState.animationDuration }} backgroundColor={color} style={react_native_1.StyleSheet.flatten([
                {
                    height: '100%',
                    position: 'absolute',
                    width: '100%',
                },
                !!pressedColor && { backgroundColor: pressedColor },
            ])}/>)}
    </react_native_1.Animated.View>);
    return (<react_native_1.View pointerEvents="box-none" style={{
            position: 'absolute',
            width: '100%',
            flex: 1,
            zIndex: 1000,
        }}>
      {react_native_1.Platform.OS === 'android' && currentMessage && (<react_native_1.StatusBar backgroundColor={pressedColor ? pressedColor : color}/>)}
      {!!currentMessage && !!translateY && (<react_native_1.View pointerEvents="box-none">
          {AnimatedMessage}
          {AnimatedStatusBar}
        </react_native_1.View>)}
    </react_native_1.View>);
}
exports.AnimatedBanner = AnimatedBanner;
