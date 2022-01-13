"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToast = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const Component_1 = require("./Component");
const State_1 = (0, tslib_1.__importDefault)(require("./State"));
function createToast(presets) {
    var _a;
    const ToastState = new State_1.default(presets);
    const ToastComponent = (0, Component_1.getToastComponent)(ToastState);
    return _a = class ToastClassComponent extends react_1.default.Component {
            render() {
                return <ToastComponent {...this.props}/>;
            }
        },
        _a.display = ToastState.toastDisplay,
        _a.hide = ToastState.toastHide,
        _a.useIsMessageShowing = ToastState.useIsMessageShowing,
        _a;
}
exports.createToast = createToast;
