import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Inventory } from "../store";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './stand.css';

export interface DayProps {
    readonly actualSoldCount: number;
    readonly dayNumber: number;
    readonly endTime: number; // the time in which this day has ended
    readonly currentMadeCups: number;
    readonly startTime: number;
}

export interface StandProps {
    currentTime: number,
    day: DayProps,
    hasDayEnded: boolean,
    inventory: Inventory,
    isTimerOn: boolean,

    onStart: () => void,
    onPause: () => void,
    onStartNextDay: () =>  void,
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
                {name: 'Lemonade Sold Today', quantity: props.day.actualSoldCount || 0},
            ]}
            />
    </div>
);

export default (props: StandProps) => (
    <div>
        { props.hasDayEnded &&
            <button
                className="timer-button btn btn-primary"
                onClick={() => props.onStartNextDay()}>
                Start Next Day
            </button>
        }
        { !props.hasDayEnded && !props.isTimerOn &&
            <button
                className="timer-button btn btn-primary"
                onClick={() => props.onStart()}>
                Go
            </button>
        }
        { !props.hasDayEnded && props.isTimerOn &&
            <button
                className="timer-button btn btn-primary"
                onClick={() => props.onPause()}>
                Pause
            </button>
        }
        { props.day && makeGrid(props) }
    </div>
    );