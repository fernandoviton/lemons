import * as React from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import { Day, Inventory } from '../store';

export interface AllGridProps {
    currentTime: number;
    day: Day;
    inventory: Inventory;
}

// const getRowData = (inventory: Inventory | Day) =>
//     inventory
//     ? (Object as any).entries(inventory).map(([name, quantity]: [string, number]) => (
//         {'name': name, 'quantity': quantity}))
//     : [];

export default (props: AllGridProps) => (
    <div className="ag-theme-balham"
        style={{
            height: '300px',
            width: '400px'
        }}>
        <AgGridReact
            columnDefs={[
                {headerName: 'Item', field: 'name'},
                {headerName: 'Quantity', field: 'quantity'},
            ]}
            rowData={[
                {name: 'Current Time', quantity: props.currentTime},
                {name: 'Cups', quantity: props.inventory.cups},
                {name: 'Lemons', quantity: props.inventory.lemons},
                {name: 'Sugar (lbs)', quantity: props.inventory.poundsOfSugar},
                {name: 'Lemonade Pitchers', quantity: props.day.lemonadePitchers},
                {name: 'Lemonade Sold', quantity: props.day.actualSoldCount || 0},
                {name: 'Current Day Start Time', quantity: props.day.startTime},
                {name: 'Current Day End Time', quantity: props.day.endTime},
            ]}
            />
    </div>
);