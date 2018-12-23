import * as React from 'react';
import { StandInventory } from "../store";

export interface StandProps {
    standInventory: StandInventory,
}

// tslint:disable:jsx-no-lambda
const getStandItems = (props: StandProps) => {
    // tslint:disable-next-line:no-console
    console.log(props);
    return (Object as any).entries(props.standInventory).map(([name, quantity]: [string, number]) => {
        return <label key={name}>{quantity} {name}</label>
}) };

export default (props: StandProps) => (
    <div className="container">
        <div className="card-deck mb-3 text-center">
        { getStandItems(props) }
        </div>
    </div>
)