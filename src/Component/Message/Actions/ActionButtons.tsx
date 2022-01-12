import React from "react";
import { View } from "react-native";

import ToastStateClass, { StateMessage } from "../../../State";
import type { Types } from "../../../types";

import { Action } from "./Action";

export function ActionButtons(props: {
  actions: Types.Action[];
  message: StateMessage;
  ToastState: ToastStateClass;
}) {
  const { actions } = props;

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        height: ToastStateClass.DEFAULT_ACTION_HEIGHT,
      }}
    >
      {actions.map((action, index) => (
        <Action key={index} {...props} action={action} index={index} />
      ))}
    </View>
  );
}
