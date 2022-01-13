"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const ActionButtons_1 = require("./ActionButtons");
const ReplyInput_1 = require("./ReplyInput");
function Actions(props) {
    const { message: { actions }, ToastState, } = props;
    if (ToastState.state.currentMessage?.selectedActionInput) {
        return <ReplyInput_1.ReplyInput {...props}/>;
    }
    if (actions) {
        return <ActionButtons_1.ActionButtons {...props} actions={actions}/>;
    }
    return null;
}
exports.Actions = Actions;
