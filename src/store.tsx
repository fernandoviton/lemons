import * as React from 'react';
import { AvailableForSale, Inventory } from './inventory';
import { default as StoreItem } from './item';

// tslint:disable-next-line:no-submodule-imports
import 'ag-grid/dist/styles/ag-grid.css';
// tslint:disable-next-line:no-submodule-imports
import 'ag-grid/dist/styles/ag-theme-balham.css';
import './store.css';

const allInventory: Inventory = ({
  cups: 120,
  lemons: 5,
});

const allAvailableForSale: AvailableForSale = ({
  cups: [
    {amount: 80, cost: 2.25},
    {amount: 200, cost: 4.25},
  ],
  lemons: [
    {amount: 1, cost: .25},
  ]
});

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const getStoreItems = (inventory: Inventory, availableForSale: AvailableForSale) =>
  (Object as any).entries(inventory).map(([name,quantity]: [string, number]) => (
    <StoreItem
      name={capitalize(name)}
      quantity={quantity}
      salePrices={availableForSale[name]}
      />
  ));

export default () => (
  <div>
        {/* <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <div className=".col-sm-4">
                <a className="p-2 text-dark" href="#">5 Lemons</a>
            </div>
            <div className=".col-sm-4">
                <a className="p-2 text-dark" href="#">6 Cups of Sugar</a>
            </div>
            <div className=".col-sm-4">
                <a className="p-2 text-dark" href="#">100 Ice Cubes</a>
            </div>
            <div className=".col-sm-4">
                <a className="p-2 text-dark" href="#">40 Cups</a>
            </div>
        </div> */}

    <div className="container">
      <div className="card-deck mb-3 text-center">
        { getStoreItems(allInventory, allAvailableForSale) }
      </div>
    </div>
    {/* <div className="ag-theme-balham" style={{height: '200px'}}>
      <AgGridReact {...gridProps}/>
    </div> */}
  </div>
);