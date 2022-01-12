import React from "react";
import { View } from "react-native";

import { useMemo } from "@huds0n/utilities";

import ToastStateClass from "../State";
import type { Types } from "../types";

export function ScreenContents({
  children,
  ToastState,
}: Types.Props & { ToastState: ToastStateClass }) {
  const [{ currentMessage, messages }] = ToastState.useState([
    "currentMessage",
    "messages",
  ]);

  const handleStartShouldSetResponderCapture = useMemo(
    () =>
      currentMessage?.dismissOnScreenPress
        ? () => {
            ToastState.toastHide(currentMessage._id);
            return false;
          }
        : undefined,
    [currentMessage]
  );

  const shouldDisableScreenTouch = useMemo(() => {
    if (
      messages.some(
        (message) =>
          message.disableScreenTouch === true ||
          message.disableScreenTouch === "TRANSLUCENT"
      )
    ) {
      return "TRANSLUCENT";
    }

    if (
      messages.some((message) => message.disableScreenTouch === "TRANSPARENT")
    ) {
      return "TRANSPARENT";
    }
  }, [messages]);

  return (
    <View
      onStartShouldSetResponderCapture={handleStartShouldSetResponderCapture}
      pointerEvents={shouldDisableScreenTouch ? "none" : undefined}
      style={{ flex: 1 }}
    >
      {children}
      {!!shouldDisableScreenTouch && (
        <View
          style={{
            position: "absolute",
            top: "-50%",
            height: "200%",
            width: "100%",
            backgroundColor: "black",
            opacity: shouldDisableScreenTouch === "TRANSPARENT" ? 0 : 0.3,
          }}
        />
      )}
    </View>
  );
}
