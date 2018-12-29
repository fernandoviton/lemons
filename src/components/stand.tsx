import * as React from 'react';
import { Day, Inventory } from "../store";
import AllGrid from './allGrid';

export interface StandProps {
    currentTime: number,
    inventory: Inventory,
    day: Day,

    onStart: () => void,
    onPause: () => void,
}

// tslint:disable:jsx-no-lambda

export default (props: StandProps) => (
    <div>
        <button onClick={() => props.onStart()}>Start</button>
        { props.day && <AllGrid
            currentTime={props.currentTime}
            inventory={props.inventory}
            day={props.day}
        />}
    </div>
    );