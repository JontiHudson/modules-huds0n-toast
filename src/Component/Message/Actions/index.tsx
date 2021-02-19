import React from 'react';

import ToastStateClass from '../../../State';
import * as Types from '../../../types';

import { ActionButtons } from './ActionButtons';
import { ReplyInput } from './ReplyInput';

export function Actions(
  props: Types.StateMessage & {
    _isLayout?: boolean;
    ToastState: ToastStateClass;
  },
) {
  const { actions, onTextSubmit } = props;

  if (onTextSubmit) {
    return <ReplyInput {...props} />;
  }

  if (actions) {
    return <ActionButtons {...props} />;
  }

  return null;
}
