import type { TextStyle, TextInputProps, ViewStyle } from "react-native";

import type { ComponentTypes } from "@huds0n/components";

import { defaultPresets } from "./presets";

export declare namespace Types {
  export type Props<P extends Presets = typeof defaultPresets> = {
    children: React.ReactNode | React.ReactNode[];
    defaultMessageProps?: Message<P>;
    animationDuration?: number;
  };

  export type Layout = "absolute" | "relative";

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

  export type Presets = Record<string, Omit<Message, "preset">>;

  export type Message<P extends Presets = typeof defaultPresets> = {
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
    icon?: ComponentTypes.IconProps;
    layout?: Layout;
    message?: string;
    messageStyle?: TextStyle;
    minDisplayTime?: number;
    onDismiss?: (data?: string) => any;
    onPress?: (data?: string) => any;
    showDismiss?: boolean;
    title?: string;
    titleStyle?: TextStyle;
    preset?: keyof P;
  };

  type DisableScreenTouchProp = boolean | "TRANSPARENT" | "TRANSLUCENT";
}
