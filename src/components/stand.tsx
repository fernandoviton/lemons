import * as React from 'react';
import { Inventory, TurnData } from "../store";
import AllGrid from './allGrid';

export interface StandProps {
    inventory: Inventory,
    turnData: TurnData,

    onStart: () => void,
}

// tslint:disable:jsx-no-lambda

export default (props: StandProps) => (
    <div>
        <button onClick={() => props.onStart()}>Start</button>
        { props.turnData && <AllGrid
            inventory={props.inventory}
            turnData={props.turnData}
        />}
    </div>
    );