"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
const shared_state_1 = require("@huds0n/shared-state");
const utilities_1 = require("@huds0n/utilities");
class ToastState extends shared_state_1.SharedState {
    constructor(presets) {
        super({
            _refreshId: Symbol("initial_id"),
            currentMessage: null,
            isPressed: false,
            messages: [],
            safeAreaY: 0,
            translateY: 0,
        });
        this.animationDuration = 350;
        this.defaultProps = {
            autoDismiss: false,
            backgroundColor: theme_1.theme.colors.GREY,
            layout: "absolute",
            messageStyle: { fontSize: theme_1.theme.fontSizes.NOTE },
            titleStyle: { fontSize: theme_1.theme.fontSizes.BODY },
            get contentsColor() {
                return theme_1.theme.colors.BACKGROUND;
            },
        };
        this.translateYAnim = new react_native_1.Animated.Value(0);
        this.presets = presets;
        this.animateMessage = this.animateMessage.bind(this);
        this.toastDisplay = this.toastDisplay.bind(this);
        this.toastHide = this.toastHide.bind(this);
        this.useIsMessageShowing = this.useIsMessageShowing.bind(this);
        this.addListener(({ messages: [currentTop] }, { messages: [prevTop] = [] }) => {
            if (currentTop !== prevTop) {
                this.handleUpdateMessage();
            }
        }, "messages");
    }
    updateDefaultProps(defaultProps) {
        (0, utilities_1.assignEnumerableGetters)(this.defaultProps, defaultProps);
    }
    toastDisplay(message) {
        const stampedMessage = this.formatMessage(message);
        const sortedMessages = [...this.state.messages, stampedMessage].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));
        this.setState({
            messages: sortedMessages,
        });
        return stampedMessage._id;
    }
    toastHide(messageId, hideImmediately) {
        const index = this.state.messages.findIndex((element) => element._id === messageId);
        if (index !== -1) {
            const message = this.state.messages[index];
            if (hideImmediately) {
                this.removeMessageFromState(message._id);
            }
            else {
                const { minDisplayTime = ToastState.DEFAULT_MIN_DISPLAY_TIME } = message;
                const currentTimestamp = new Date().valueOf();
                const delayRemaining = message.timestamp + minDisplayTime - currentTimestamp;
                const delay = delayRemaining > 0 ? delayRemaining : 0;
                setTimeout(() => {
                    this.removeMessageFromState(message._id);
                }, delay);
            }
        }
    }
    animateMessage(toValue, callback) {
        react_native_1.Animated.timing(this.translateYAnim, {
            toValue,
            duration: this.animationDuration,
            easing: react_native_1.Easing.ease,
            useNativeDriver: false,
        }).start(callback);
    }
    useIsMessageShowing(message) {
        const [{ messages }] = this.useState("messages");
        return !!messages.find((element) => element === message || element._id === message);
    }
    updateToastMessage(_id, update, forceRerender = true) {
        const message = this.state.messages.find((m) => m._id === _id);
        if (message) {
            Object.assign(message, update);
        }
        forceRerender && this.setState({ _refreshId: Symbol("refresh_id") });
    }
    removeMessageFromState(messageId) {
        const messages = this.state.messages.filter((element) => element._id !== messageId);
        this.setState({
            messages,
        });
    }
    handleUpdateMessage() {
        const { messages } = this.state;
        const topMessage = messages[0];
        if (topMessage) {
            if (topMessage.autoDismiss) {
                this.handleMessageAutoHide(topMessage);
            }
            this.setState({ currentMessage: topMessage, isPressed: false });
        }
        else {
            this.handleToastHide();
        }
    }
    handleMessageAutoHide(message) {
        setTimeout(() => {
            this.toastHide(message._id);
        }, typeof message.autoDismiss === "number"
            ? message.autoDismiss
            : ToastState.DEFAULT_AUTO_DISPLAY_TIME);
    }
    handleToastHide() {
        this.animateMessage(0, () => {
            if (!this.state.messages.length) {
                this.setState({ currentMessage: null, translateY: 0 });
            }
        });
    }
    formatMessage(message) {
        return (0, utilities_1.assignEnumerableGetters)({
            _id: Symbol("Auto message ID"),
            timestamp: new Date().valueOf(),
        }, this.defaultProps, message.preset && this.presets[message.preset], message);
    }
}
exports.default = ToastState;
ToastState.DEFAULT_AUTO_DISPLAY_TIME = 2500;
ToastState.DEFAULT_MIN_DISPLAY_TIME = 1000;
ToastState.DEFAULT_ACTION_HEIGHT = 40;
ToastState.DEFAULT_MULTILINE_TEXT_HEIGHT = 100;
