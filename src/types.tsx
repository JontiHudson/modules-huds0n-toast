import { TextStyle, TextInputProps, ViewStyle } from 'react-native';

import { Icon } from '@huds0n/components';

export type Props<P extends Presets = any> = {
  children: React.ReactNode | React.ReactNode[];
  defaultMessageProps?: Message<P>;
  animationDuration?: number;
};

export type Layout = 'absolute' | 'relative';

export type MessageId = string | Symbol | number;

type OnTextSubmitFn = (text: string, data?: string) => any;

export type Action = {
  buttonStyle?: ViewStyle;
  label: string;
  labelStyle?: TextStyle;
  onPress?: (data?: string) => any;
  textInput?: ActionTextInput;
};

export type ActionTextInput = {
  buttonNames?: {
    cancel?: string;
    send?: string;
  };
  onSubmit?: OnTextSubmitFn;
  props?: TextInputProps;
  initialValue?: string;
};

export type MessageWithoutPreset = {
  _id?: MessageId;
  actions?: Action[];
  autoDismiss?: boolean | number | null;
  backgroundColor?: string;
  containerStyle?: ViewStyle;
  contentsColor?: string;
  data?: string;
  disableScreenTouch?: DisableScreenTouchProp;
  dismissOnScreenPress?: boolean;
  FooterComponent?: React.ReactElement;
  zIndex?: number;
  icon?: Icon.Props;
  layout?: Layout;
  message?: string;
  messageStyle?: TextStyle;
  minDisplayTime?: number;
  onDismiss?: (data?: string) => any;
  onPress?: (data?: string) => any;
  showDismiss?: boolean;
  title?: string;
  titleStyle?: TextStyle;
};

export type Presets = Record<string, MessageWithoutPreset>;

export type Message<P extends Presets = any> = MessageWithoutPreset & {
  preset?: keyof P;
};

type DisableScreenTouchProp = boolean | 'TRANSPARENT' | 'TRANSLUCENT';

export type StateMessage<P extends Presets = any> = Message<P> & {
  _id: MessageId;
  timestamp: number;
  selectedActionInput: ActionTextInput | null;
};

export type State<P extends Presets> = {
  _refreshId: symbol;
  currentMessage: StateMessage<P> | null;
  isPressed: boolean;
  translateY: number;
  messages: StateMessage<P>[];
  safeAreaY: number;
};
