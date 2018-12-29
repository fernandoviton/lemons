import * as React from 'react';
import { Day, Inventory } from "../store";
import AllGrid from './allGrid';

export interface StandProps {
    currentTime: number,
    day: Day,
    inventory: Inventory,
    isTimerOn: boolean,

    onStart: () => void,
    onPause: () => void,
}

// tslint:disable:jsx-no-lambda

export default (props: StandProps) => (
    <div>
        { !props.isTimerOn && <button onClick={() => props.onStart()}>Start</button> }
        { props.isTimerOn && <button onClick={() => props.onPause()}>Pause</button> }
        { props.day && <AllGrid
            currentTime={props.currentTime}
            inventory={props.inventory}
            day={props.day}
        />}
    </div>
    );