"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageText = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
function MessageText({ contentsColor, message, messageStyle, title, titleStyle, }) {
    return (<react_native_1.View style={{ flex: 1, padding: theme_1.theme.spacings.M }}>
      {title && (<react_native_1.Text style={react_native_1.StyleSheet.flatten([{ color: contentsColor }, titleStyle])}>
          {title}
        </react_native_1.Text>)}
      {message && (<react_native_1.Text style={react_native_1.StyleSheet.flatten([{ color: contentsColor }, messageStyle])}>
          {message}
        </react_native_1.Text>)}
    </react_native_1.View>);
}
exports.MessageText = MessageText;
