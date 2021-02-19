import { Icon } from '@huds0n/components';

const message = {
  actionStyle: 'viewStyle',
  actionProps: {
    buttonStyle: 'viewStyle',
    labelStyle: 'textStyle',
    textInputProps: {
      style: 'textStyle',
    },
  },
  backgroundColor: 'color',
  containerStyle: 'viewStyle',
  contentsColor: 'color',
  icon: Icon.theming.props,
  messageStyle: 'textStyle',
  titleStyle: 'textStyle',
} as const;

export const theming = {
  message,
  props: {
    defaultMessageProps: message,
  },
} as const;
