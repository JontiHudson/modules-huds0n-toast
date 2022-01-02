import React from 'react';

import { getToastComponent } from './Component';
import { defaultPresets } from './presets';
import ToastStateClass from './State';

import * as ToastTypes from './types';

export function createToast<P extends ToastTypes.Presets>(presets: P) {
  const ToastState = new ToastStateClass<P>(presets);
  // @ts-ignore
  const ToastComponent = getToastComponent(ToastState);

  return class ToastClassComponent extends React.Component<
    ToastTypes.Props<P>
  > {
    static display = ToastState.toastDisplay;
    static hide = ToastState.toastHide;
    static useIsMessageShowing = ToastState.useIsMessageShowing;

    render() {
      return <ToastComponent {...this.props} />;
    }
  };
}

export { ToastTypes };

export namespace Toast {
  export type Action = ToastTypes.Action;
  export type Message = ToastTypes.Message<typeof defaultPresets>;
  export type MessageID = ToastTypes.MessageId;
  export type Props = ToastTypes.Props<typeof defaultPresets>;
}

export const Toast = createToast(defaultPresets);
