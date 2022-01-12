import React from "react";
import { LayoutChangeEvent, SafeAreaView, View } from "react-native";

import { useCallback, useEffect, useState, useRef } from "@huds0n/utilities";

import ToastStateClass from "../State";

import { Message } from "./Message";

export const LayoutMessage = React.memo(
  ({ ToastState }: { ToastState: ToastStateClass }) => {
    const [{ currentMessage }] = ToastState.useState([
      "_refreshId",
      "currentMessage",
    ]);

    const wrapperRef = useRef<View>(null);

    const handleMessageLayout = useCallback(
      ({
        nativeEvent: {
          layout: { height: messageHeight },
        },
      }: LayoutChangeEvent) => {
        wrapperRef.current?.measure((x, y, width, height, pagex, pageY = 0) => {
          const translateY = messageHeight;
          const safeAreaY = messageHeight - height;

          const updatedState = ToastState.setState({
            translateY,
            safeAreaY,
          });

          if (updatedState) ToastState.animateMessage(translateY);
        });
      }
    );

    const show = refreshOnMessageChange(currentMessage);

    if (!show) {
      return null;
    }

    return (
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: 0,
        }}
      >
        <View
          pointerEvents="none"
          onLayout={handleMessageLayout}
          style={{
            width: "100%",
          }}
        >
          {currentMessage && (
            <SafeAreaView>
              <View ref={wrapperRef}>
                <Message
                  _isLayout
                  message={currentMessage}
                  ToastState={ToastState}
                />
              </View>
            </SafeAreaView>
          )}
        </View>
      </View>
    );
  }
);

// This is so onLayout fires even if message doesn't change in size
function refreshOnMessageChange(currentMessage: any) {
  const [show, setShow] = useState(true);

  useEffect(
    () => {
      if (currentMessage) {
        setShow(false);
      }
    },
    [currentMessage],
    { layout: "BEFORE" }
  );

  useEffect(
    () => {
      if (!show) {
        setShow(true);
      }
    },
    [show],
    { layout: "BEFORE" }
  );

  return show;
}
