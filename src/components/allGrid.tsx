import * as React from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import { Inventory, StandInventory } from '../store';

export interface AllGridProps {
    inventory: Inventory;
    standInventory: StandInventory;
}

const getRowData = (inventory: Inventory | StandInventory) =>
    (Object as any).entries(inventory).map(([name, quantity]: [string, number]) => (
        {'name': name, 'quantity': quantity}
    ));

export default (props: AllGridProps) => (
    <div className="ag-theme-balham"
        style={{
            height: '500px',
            width: '600px'
        }}>
        <AgGridReact
            columnDefs={[
                {headerName: 'Name', field: 'name'},
                {headerName: 'Quantity', field: 'quantity'},
            ]}
            rowData={getRowData(props.inventory).concat(getRowData(props.standInventory))}
            />
    </div>
);