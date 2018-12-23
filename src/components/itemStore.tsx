import * as React from 'react';
import { AvailableForSale, Inventory } from '../store';
import { default as StoreItem } from './item';
import { default as Stand, StandProps } from './stand';

// tslint:disable-next-line:no-submodule-imports
import 'ag-grid/dist/styles/ag-grid.css';
// tslint:disable-next-line:no-submodule-imports
import 'ag-grid/dist/styles/ag-theme-balham.css';
import './store.css';

// const allInventory: Inventory = ({
//   cups: 120,
//   lemons: 5,
// });

// const allAvailableForSale: AvailableForSale = ({
//   cups: [
//     {amount: 80, cost: 2.25},
//     {amount: 200, cost: 4.25},
//   ],
//   lemons: [
//     {amount: 1, cost: .25},
//   ]
// });

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export interface ItemStoreProps {
  inventory: Inventory;
  availableForSale: AvailableForSale;
  onBuy: (name: string, amount: number, cost: number) => void
}

// tslint:disable:jsx-no-lambda
const getStoreItems = (props: ItemStoreProps) =>
  (Object as any).entries(props.inventory).map(([name, quantity]: [string, number]) => {
    return <StoreItem
      key={name}
      name={capitalize(name)}
      quantity={quantity}
      salePrices={props.availableForSale[name]}
      onBuy={(amount, cost) => props.onBuy(name, amount, cost)}
      />
  });

export interface ItemStoreProps {
  inventory: Inventory;
  availableForSale: AvailableForSale;
  onBuy: (name: string, amount: number, cost: number) => void
}

export default (props: ItemStoreProps & StandProps) => (
  <div>
    <div className="container">
      <div className="card-deck mb-3 text-center">
        { getStoreItems(props) }
      </div>
    </div>
    <Stand {...props}/>
  </div>
);

// export default class ItemStore extends React.Component {
//   public render() {
//     return (
//       <div>
//         {/* <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
//             <div className=".col-sm-4">
//                 <a className="p-2 text-dark" href="#">5 Lemons</a>
//             </div>
//             <div className=".col-sm-4">
//                 <a className="p-2 text-dark" href="#">6 Cups of Sugar</a>
//             </div>
//             <div className=".col-sm-4">
//                 <a className="p-2 text-dark" href="#">100 Ice Cubes</a>
//             </div>
//             <div className=".col-sm-4">
//                 <a className="p-2 text-dark" href="#">40 Cups</a>
//             </div>
//         </div> */}

//         <div className="container">
//           <div className="card-deck mb-3 text-center">
//             { getStoreItems(allInventory, allAvailableForSale) }
//           </div>
//         </div>
//         {/* <div className="ag-theme-balham" style={{height: '200px'}}>
//           <AgGridReact {...gridProps}/>
//         </div> */}
//       </div>
//     );
//   }
// }