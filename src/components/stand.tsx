import * as React from 'react';
import { Day, Inventory } from "../store";
import AllGrid from './allGrid';

export interface StandProps {
    inventory: Inventory,
    day: Day,

    onStart: () => void,
}

// tslint:disable:jsx-no-lambda

export default (props: StandProps) => (
    <div>
        <button onClick={() => props.onStart()}>Start</button>
        { props.day && <AllGrid
            inventory={props.inventory}
            day={props.day}
        />}
    </div>
    );