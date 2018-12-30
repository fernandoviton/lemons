import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Inventory } from "../store";

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import './stand.css';

export interface DayProps {
    readonly actualSoldCount: number;
    readonly dayNumber: number;
    readonly endTime: number; // the time in which this day has ended
    readonly currentMadeCups: number;
    readonly potentialSoldCount: number;
    readonly startTime: number;
}

export interface StandProps {
    currentTime: number,
    day: DayProps,
    inventory: Inventory,
    isTimerOn: boolean,

    onStart: () => void,
    onPause: () => void,
}

// tslint:disable:jsx-no-lambda

const makeGrid = (props: StandProps) => (
    <div className="ag-theme-balham">
        <AgGridReact
            columnDefs={[
                {headerName: 'Item', field: 'name'},
                {headerName: 'Quantity', field: 'quantity'},
            ]}
            domLayout='autoHeight'
            rowData={[
                {name: 'Current Time', quantity: props.currentTime},
                {name: 'Current Day End Time', quantity: props.day.endTime},
                {name: 'Cups', quantity: props.inventory.cups},
                {name: 'Lemons', quantity: props.inventory.lemons},
                {name: 'Sugar (lbs)', quantity: props.inventory.poundsOfSugar},
                {name: 'Cups of Lemonade', quantity: props.day.currentMadeCups},
                {name: 'Lemonade Sold', quantity: props.day.actualSoldCount || 0},
            ]}
            />
    </div>
);

export default (props: StandProps) => (
    <div>
        { !props.isTimerOn &&
            <button
                className="timer-button btn btn-primary"
                onClick={() => props.onStart()}>
                Start
            </button>
        }
        { props.isTimerOn &&
            <button
                className="timer-button btn btn-primary"
                onClick={() => props.onPause()}>
                Pause
            </button>
        }
        { props.day && makeGrid(props) }
    </div>
    );