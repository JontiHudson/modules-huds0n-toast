import React from "react";

import { getToastComponent } from "./Component";

import ToastStateClass from "./State";

import { Types } from "./types";

export function createToast<P extends Types.Presets>(presets: P) {
  const ToastState = new ToastStateClass<P>(presets);
  // @ts-ignore
  const ToastComponent = getToastComponent(ToastState);

  return class ToastClassComponent extends React.Component<Types.Props<P>> {
    static display = ToastState.toastDisplay;
    static hide = ToastState.toastHide;
    static useIsMessageShowing = ToastState.useIsMessageShowing;

    render() {
      // @ts-ignore
      return <ToastComponent {...this.props} />;
    }
  };
}
