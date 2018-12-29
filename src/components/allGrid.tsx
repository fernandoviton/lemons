import * as React from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import { Day, Inventory } from '../store';

export interface AllGridProps {
    inventory: Inventory;
    day: Day;
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
                {name: 'Cups', quantity: props.inventory.cups},
                {name: 'Lemons', quantity: props.inventory.lemons},
                {name: 'Sugar (lbs)', quantity: props.inventory.poundsOfSugar},
                {name: 'Lemonade Pitchers', quantity: props.day.lemonadePitchers},
                {name: 'Lemonade Sold', quantity: props.day.actualSoldCount || 0},
                {name: 'Start Time', quantity: props.day.startTime},
            ]}
            />
    </div>
);