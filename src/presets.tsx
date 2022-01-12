import { theme } from "@huds0n/theming/src/theme";

export const defaultPresets = {
  alert: {
    get backgroundColor() {
      return theme.colors.WARN;
    },
    zIndex: 1,
    layout: "relative",
    messageStyle: {
      alignItems: "center",
    },
    titleStyle: {
      alignItems: "center",
    },
  },
  error: {
    get backgroundColor() {
      return theme.colors.ERROR;
    },
    disableScreenTouch: true,
    zIndex: 3,
    icon: {
      name: "stop",
      set: "Octicons",
    },
    showDismiss: true,
  },
  notify: {
    autoDismiss: 3000,
    get backgroundColor() {
      return theme.colors.GREY;
    },
    dismissOnScreenPress: true,
    zIndex: 0,
  },
  warn: {
    autoDismiss: 5000,
    get backgroundColor() {
      return theme.colors.WARN;
    },
    zIndex: 2,
    dismissOnScreenPress: true,
    icon: {
      name: "warning-outline",
      set: "Ionicons",
    },
  },
  success: {
    autoDismiss: 3000,
    dismissOnScreenPress: true,
    get backgroundColor() {
      return theme.colors.SUCCESS;
    },
    icon: {
      name: "checkcircleo",
      set: "AntDesign",
    },
    zIndex: 0,
  },
} as const;
