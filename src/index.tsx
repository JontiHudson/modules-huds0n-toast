import React from 'react';

import { getToastComponent } from './Component';
import ToastStateClass from './State';
import { theming } from './theming';
import * as ToastTypes from './types';

export function createToast(options: ToastTypes.Options) {
  const ToastState = new ToastStateClass(options);
  // @ts-ignore
  const ToastComponent = getToastComponent(ToastState);

  return class ToastClassComponent extends React.Component<ToastTypes.Props> {
    static theming = theming;

    static display = ToastState.toastDisplay;
    static hide = ToastState.toastHide;
    static State = ToastState;
    static useIsMessageShowing = ToastState.useIsMessageShowing;

    componentDidMount() {
      if (this.props.defaultMessageProps) {
        ToastState.updateDefaultProps(this.props.defaultMessageProps);
      }
    }

    componentDidUpdate({ defaultMessageProps }: ToastTypes.Props) {
      if (defaultMessageProps) {
        ToastState.updateDefaultProps(defaultMessageProps);
      }
    }

    render() {
      return <ToastComponent {...this.props} />;
    }
  };
}

export { ToastTypes };

export namespace Toast {
  export type Action = ToastTypes.Action;
  export type Message = ToastTypes.Message;
  export type Options = ToastTypes.Options;
  export type Props = ToastTypes.Props;
}

export const Toast = createToast({
  isRootComponent: true,
});
