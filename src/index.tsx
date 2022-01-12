import { createToast } from "./createToast";
import { defaultPresets } from "./presets";

import type { Types } from "./types";

export const Toast = createToast(defaultPresets);

export { createToast, Types as ToastTypes };
