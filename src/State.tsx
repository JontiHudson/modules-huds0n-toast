import { Animated, Easing } from 'react-native';

import { Core } from '@huds0n/core';
import { SharedState } from '@huds0n/shared-state';
import { assignEnumerableGetters } from '@huds0n/utilities';

import * as Types from './types';

export default class ToastState extends SharedState<Types.State> {
  static readonly DEFAULT_AUTO_DISPLAY_TIME = 2500;
  static readonly DEFAULT_ANIMATION_DURATION = 350;
  static readonly DEFAULT_MIN_DISPLAY_TIME = 1000;
  static readonly DEFAULT_POSITION: Types.Position = 'top';
  static readonly DEFAULT_IS_ROOT_COMPONENT = false;
  static DEFAULT_ACTION_HEIGHT = 40;
  static DEFAULT_MULTILINE_TEXT_HEIGHT = 100;

  defaultProps: Types.Message = {
    autoDismiss: false,
    backgroundColor: Core.colors.GREY,
    contentsColor: Core.colors.WHITE,
    layout: 'absolute',
    messageStyle: { fontSize: Core.fontSizes.NOTE },
    titleStyle: { fontSize: Core.fontSizes.BODY },
  };

  readonly heightAnim = new Animated.Value(0);

  readonly animationDuration: number;
  readonly position: Types.Position;
  readonly isRootComponent: boolean;

  constructor({
    animationDuration = ToastState.DEFAULT_ANIMATION_DURATION,
    defaultMessageProps,
    position = ToastState.DEFAULT_POSITION,
    isRootComponent = ToastState.DEFAULT_IS_ROOT_COMPONENT,
  }: Types.Options) {
    super({
      _refreshId: Symbol('initial_id'),
      currentMessage: null,
      isPressed: false,
      messageHeight: 0,
      messages: [],
      yOffset: 0,
    });

    this.animationDuration = animationDuration;

    this.position = position;
    this.isRootComponent = isRootComponent;

    defaultMessageProps && this.updateDefaultProps(defaultMessageProps);

    this.animateMessage = this.animateMessage.bind(this);
    this.toastDisplay = this.toastDisplay.bind(this);
    this.toastHide = this.toastHide.bind(this);
    this.useIsMessageShowing = this.useIsMessageShowing.bind(this);

    this.addListener(
      'messages',
      ({ messages: [currentTop] }, { messages: [prevTop] = [] }) => {
        if (currentTop !== prevTop) {
          this.handleUpdateMessage();
        }
      },
    );
  }

  updateDefaultProps(defaultProps: Types.Message) {
    assignEnumerableGetters(this.defaultProps, defaultProps);
  }

  toastDisplay(message: Types.Message): string | Symbol {
    const stampedMessage = this.formatMessage(message);

    if (stampedMessage.highPriority) {
      this.setState({
        messages: [stampedMessage, ...this.state.messages],
      });
    } else {
      this.setState({
        messages: [...this.state.messages, stampedMessage],
      });
    }

    return stampedMessage._id;
  }

  toastHide(messageId: string | Symbol, hideImmediately?: boolean) {
    const index = this.state.messages.findIndex(
      (element) => element._id === messageId,
    );

    if (index !== -1) {
      const message = this.state.messages[index];

      if (hideImmediately) {
        this.removeMessageFromState(message._id);
      } else {
        const {
          minDisplayTime = ToastState.DEFAULT_MIN_DISPLAY_TIME,
        } = message;

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
    Animated.timing(this.heightAnim, {
      toValue,
      duration: this.animationDuration,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(callback);
  }

  useIsMessageShowing(message: Types.Message | string) {
    const [{ messages }] = this.useState('messages');

    return !!messages.find(
      (element) => element === message || element._id === message,
    );
  }

  updateToastMessage(
    _id: Types.MessageId,
    update: Partial<Types.StateMessage>,
    forceRerender = true,
  ) {
    const message = this.state.messages.find((m) => m._id === _id);

    if (message) {
      Object.assign(message, update);
    }

    forceRerender && this.setState({ _refreshId: Symbol('refresh_id') });
  }

  private removeMessageFromState(messageId: Types.StateMessage['_id']) {
    const messages = this.state.messages.filter(
      (element) => element._id !== messageId,
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

  private handleMessageAutoHide(message: Types.StateMessage) {
    setTimeout(
      () => {
        this.toastHide(message._id);
      },
      typeof message.autoDismiss === 'number'
        ? message.autoDismiss
        : ToastState.DEFAULT_AUTO_DISPLAY_TIME,
    );
  }

  private handleToastHide() {
    this.animateMessage(0, () => {
      if (!this.state.messages.length) {
        this.setState({ currentMessage: null, messageHeight: 0 });
      }
    });
  }

  private formatMessage(message: Types.Message): Types.StateMessage {
    return assignEnumerableGetters(
      {
        _id: Symbol('Auto message ID'),
        timestamp: new Date().valueOf(),
      },
      this.defaultProps,
      message,
    );
  }
}
