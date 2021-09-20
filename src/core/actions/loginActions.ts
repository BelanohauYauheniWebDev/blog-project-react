import { createAction } from "typesafe-actions";

import { ACTIONS } from "./constants";

export const setMailLogin = createAction(ACTIONS.SET_MAIL)<string>();
export const setPasswordLogin = createAction(ACTIONS.SET_PASSWORD)<string>();
