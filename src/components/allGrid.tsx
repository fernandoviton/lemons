import * as React from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import { Inventory, TurnData } from '../store';

export interface AllGridProps {
    inventory: Inventory;
    turnData: TurnData;
}

// const getRowData = (inventory: Inventory | TurnData) =>
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
                {name: 'Lemonade Pitchers', quantity: props.turnData.lemonadePitchers},
                {name: 'Lemonade Sold', quantity: props.turnData.actualSoldCount || 0},
                {name: 'Current Time', quantity: props.turnData.currentTick},
            ]}
            />
    </div>
);