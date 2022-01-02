import React from 'react';

import ToastStateClass from '../../../State';
import * as Types from '../../../types';

import { ActionButtons } from './ActionButtons';
import { ReplyInput } from './ReplyInput';

export function Actions(props: {
  _isLayout?: boolean;
  message: Types.StateMessage;
  ToastState: ToastStateClass;
}) {
  const {
    message: { actions },
    ToastState,
  } = props;

  if (ToastState.state.currentMessage?.selectedActionInput) {
    return <ReplyInput {...props} />;
  }

  if (actions) {
    return <ActionButtons {...props} actions={actions} />;
  }

  return null;
}
