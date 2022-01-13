"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionButtons = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const State_1 = (0, tslib_1.__importDefault)(require("../../../State"));
const Action_1 = require("./Action");
function ActionButtons(props) {
    const { actions } = props;
    return (<react_native_1.View style={{
            alignItems: "center",
            flexDirection: "row",
            height: State_1.default.DEFAULT_ACTION_HEIGHT,
        }}>
      {actions.map((action, index) => (<Action_1.Action key={index} {...props} action={action} index={index}/>))}
    </react_native_1.View>);
}
exports.ActionButtons = ActionButtons;
