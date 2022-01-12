import { Animated, Easing } from "react-native";

import { theme } from "@huds0n/theming/src/theme";
import { SharedState } from "@huds0n/shared-state";
import { assignEnumerableGetters } from "@huds0n/utilities";

import type { Types } from "./types";

export type StateMessage<P extends Types.Presets = Types.Presets> =
  Types.Message<P> & {
    _id: Types.MessageId;
    timestamp: number;
    selectedActionInput: Types.ActionTextInput | null;
  };

type State<P extends Types.Presets> = {
  _refreshId: symbol;
  currentMessage: StateMessage<P> | null;
  isPressed: boolean;
  translateY: number;
  messages: StateMessage<P>[];
  safeAreaY: number;
};

export default class ToastState<
  P extends Types.Presets = Types.Presets
> extends SharedState<State<P>> {
  static readonly DEFAULT_AUTO_DISPLAY_TIME = 2500;
  static readonly DEFAULT_MIN_DISPLAY_TIME = 1000;
  static DEFAULT_ACTION_HEIGHT = 40;
  static DEFAULT_MULTILINE_TEXT_HEIGHT = 100;

  animationDuration = 350;

  readonly defaultProps: Types.Message<P> = {
    autoDismiss: false,
    backgroundColor: theme.colors.GREY,
    layout: "absolute",
    messageStyle: { fontSize: theme.fontSizes.NOTE },
    titleStyle: { fontSize: theme.fontSizes.BODY },
    get contentsColor() {
      return theme.colors.BACKGROUND;
    },
  };

  readonly presets: P;
  readonly translateYAnim = new Animated.Value(0);

  constructor(presets: P) {
    super({
      _refreshId: Symbol("initial_id"),
      currentMessage: null,
      isPressed: false,
      messages: [],
      safeAreaY: 0,
      translateY: 0,
    });

    this.presets = presets;

    this.animateMessage = this.animateMessage.bind(this);
    this.toastDisplay = this.toastDisplay.bind(this);
    this.toastHide = this.toastHide.bind(this);
    this.useIsMessageShowing = this.useIsMessageShowing.bind(this);

    this.addListener(
      ({ messages: [currentTop] }, { messages: [prevTop] = [] }) => {
        if (currentTop !== prevTop) {
          this.handleUpdateMessage();
        }
      },
      "messages"
    );
  }

  updateDefaultProps(defaultProps: Types.Message<P>) {
    assignEnumerableGetters(this.defaultProps, defaultProps);
  }

  toastDisplay(message: Types.Message<P>): Types.MessageId {
    const stampedMessage = this.formatMessage(message);

    const sortedMessages = [...this.state.messages, stampedMessage].sort(
      (a, b) => (b.zIndex || 0) - (a.zIndex || 0)
    );

    this.setState({
      messages: sortedMessages,
    });

    return stampedMessage._id;
  }

  toastHide(messageId: Types.MessageId, hideImmediately?: boolean) {
    const index = this.state.messages.findIndex(
      (element) => element._id === messageId
    );

    if (index !== -1) {
      const message = this.state.messages[index];

      if (hideImmediately) {
        this.removeMessageFromState(message._id);
      } else {
        const { minDisplayTime = ToastState.DEFAULT_MIN_DISPLAY_TIME } =
          message;

        const currentTimestamp = new Date().valueOf();
        const delayRemaining =
          message.timestamp + minDisplayTime - currentTimestamp;
        const delay = delayRemaining > 0 ? delayRemaining : 0;

        setTimeout(() => {
          this.removeMessageFromState(message._id);
        }, delay);
      }
    }
  }

  animateMessage(toValue: number, callback?: () => void) {
    Animated.timing(this.translateYAnim, {
      toValue,
      duration: this.animationDuration,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(callback);
  }

  useIsMessageShowing(message: Types.Message<P> | string) {
    const [{ messages }] = this.useState("messages");

    return !!messages.find(
      (element) => element === message || element._id === message
    );
  }

  updateToastMessage(
    _id: Types.MessageId,
    update: Partial<StateMessage<P>>,
    forceRerender = true
  ) {
    const message = this.state.messages.find((m) => m._id === _id);

    if (message) {
      Object.assign(message, update);
    }

    forceRerender && this.setState({ _refreshId: Symbol("refresh_id") });
  }

  private removeMessageFromState(messageId: StateMessage<P>["_id"]) {
    const messages = this.state.messages.filter(
      (element) => element._id !== messageId
    );

    this.setState({
      messages,
    });
  }

  private handleUpdateMessage() {
    const { messages } = this.state;
    const topMessage = messages[0];

    if (topMessage) {
      if (topMessage.autoDismiss) {
        this.handleMessageAutoHide(topMessage);
      }
      this.setState({ currentMessage: topMessage, isPressed: false });
    } else {
      this.handleToastHide();
    }
  }

  private handleMessageAutoHide(message: StateMessage<P>) {
    setTimeout(
      () => {
        this.toastHide(message._id);
      },
      typeof message.autoDismiss === "number"
        ? message.autoDismiss
        : ToastState.DEFAULT_AUTO_DISPLAY_TIME
    );
  }

  private handleToastHide() {
    this.animateMessage(0, () => {
      if (!this.state.messages.length) {
        this.setState({ currentMessage: null, translateY: 0 });
      }
    });
  }

  private formatMessage(message: Types.Message<P>): StateMessage<P> {
    return assignEnumerableGetters(
      {
        _id: Symbol("Auto message ID"),
        timestamp: new Date().valueOf(),
      },
      this.defaultProps,
      message.preset && this.presets[message.preset],
      message
    );
  }
}
