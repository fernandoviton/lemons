import { passTime } from './actions/index'

export const startGameTimer = (dispatch: any) =>
    setInterval(() => { dispatch(passTime(1)); }, 500);