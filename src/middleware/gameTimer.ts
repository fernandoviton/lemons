import { Action, ActionType, nextDay, passTime } from "../actions";
import { hasDayEnded } from "../store";
import toMiddleware from "./toMiddleware";

let activeTimer: NodeJS.Timer | undefined;
export const forgetActiveTimer = () => { activeTimer = undefined }
export const hasActiveTimer = (): boolean => activeTimer !== undefined;

export const onTimeInterval = (state: any, dispatch: any) => {
    // tslint:disable-next-line:no-console
    console.debug('tick...');
    if (hasDayEnded(state)) {
        dispatch(nextDay());
    } else {
        dispatch(passTime(1));
    }
}

export const timerSideEffect = async (oldState: any, newState: any, dispatch: any, action: Action) => {
    switch (action.type) {
        case ActionType.START_TIME:
            if (!activeTimer) {
                // tslint:disable-next-line:no-empty
                activeTimer = setInterval(() => { onTimeInterval(newState, dispatch)}, 500);
            }
            break;
        case ActionType.PAUSE_TIME:
            if (activeTimer) {
                clearInterval(activeTimer);
                activeTimer = undefined;
            }
            break;
        default:
            break;
    }
}

export default toMiddleware(timerSideEffect);