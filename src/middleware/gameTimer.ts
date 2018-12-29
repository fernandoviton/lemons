import { Action, ActionType, passTime } from "../actions";
import toMiddleware from "./toMiddleware";

let activeTimer: NodeJS.Timer | undefined;

export const timerSideEffect = async (oldState: any, newState: any, dispatch: any, action: Action) => {
    switch (action.type) {
        case ActionType.START_TIME:
            if (!activeTimer) {
                activeTimer = setInterval(() => { dispatch(passTime(1)) }, 500);
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