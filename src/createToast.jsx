"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToast = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Component_1 = require("./Component");
const State_1 = (0, tslib_1.__importDefault)(require("./State"));
function createToast(presets) {
    const ToastState = new State_1.default(presets);
    const ToastComponent = (0, Component_1.getToastComponent)(ToastState);
    return class ToastClassComponent extends react_1.default.Component {
        static display = ToastState.toastDisplay;
        static hide = ToastState.toastHide;
        static useIsMessageShowing = ToastState.useIsMessageShowing;
        render() {
            return <ToastComponent {...this.props}/>;
        }
    };
}
exports.createToast = createToast;
