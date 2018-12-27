import * as React from 'react';
import { Inventory, StandInventory, TurnData } from "../store";
import AllGrid from './allGrid';

export interface StandProps {
    inventory: Inventory,
    standInventory: StandInventory,
    turnData: TurnData,

    onStart: () => void,
}

// tslint:disable:jsx-no-lambda
// const getStandItems = (props: StandProps) => {
//     // tslint:disable-next-line:no-console
//     console.log(props);
//     return (Object as any).entries(props.standInventory).map(([name, quantity]: [string, number]) => {
//         return <label key={name}>{quantity} {name}</label>
// }) };

export default (props: StandProps) => (
    <div>
        <button onClick={() => props.onStart()}>Start</button>
        { props.turnData && <AllGrid
            inventory={props.inventory}
            standInventory={props.standInventory}
            turnData={props.turnData}
        />}
    </div>
    );