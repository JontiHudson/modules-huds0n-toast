import { TextStyle, TextInputProps, ViewStyle } from 'react-native';

import { Icon } from '@huds0n/components';

export type Props = {
  children: React.ReactNode | React.ReactNode[];
  defaultMessageProps?: Message;
};

export type Position = 'top' | 'bottom';
export type Layout = 'absolute' | 'relative';

export type MessageId = string | Symbol;

type OnTextSubmitFn = (text: string, data?: string) => any;

export type Action = {
  label: string;
  onPress?: (data?: string) => any;
  onTextSubmit?: OnTextSubmitFn;
};

export type ActionProps = {
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
  textInputProps?: TextInputProps;
  textInputButtonNames?: {
    cancel?: string;
    send?: string;
  };
};

export type Message = {
  _id?: MessageId;
  actions?: Action[];
  actionProps?: ActionProps;
  autoDismiss?: boolean | number | null;
  backgroundColor?: string;
  containerStyle?: ViewStyle;
  contentsColor?: string;
  data?: string;
  disableScreenTouch?: DisableScreenTouchProp;
  dismissOnScreenPress?: boolean;
  FooterComponent?: React.ReactElement;
  highPriority?: boolean;
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

type DisableScreenTouchProp = boolean | 'TRANSPARENT' | 'TRANSLUCENT';

export type Options = {
  animationDuration?: number;
  defaultMessageProps?: Message;
  position?: Position;
  isRootComponent?: boolean;
};

export type StateMessage = Message & {
  _id: MessageId;
  timestamp: number;
  onTextSubmit?: OnTextSubmitFn;
  textValue?: string;
};

export type State = {
  _refreshId: symbol;
  currentMessage: StateMessage | null;
  isPressed: boolean;
  messageHeight: number;
  messages: StateMessage[];
  yOffset: number;
};
