"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DismissButton = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const components_1 = require("@huds0n/components");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
function DismissButton({ message: { _id, contentsColor, data, onDismiss, showDismiss }, ToastState, }) {
    const handleDismissPress = (0, utilities_1.useCallback)(() => {
        _id && ToastState.toastHide(_id);
        onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(data);
    }, [_id, data]);
    return (<components_1.Icon containerStyle={react_native_1.StyleSheet.flatten({
            paddingHorizontal: theme_1.theme.spacings.M,
        })} color={contentsColor} name="cancel" set="MaterialIcons" size={24} onPress={handleDismissPress}/>);
}
exports.DismissButton = DismissButton;
