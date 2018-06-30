import * as React from 'react';
import SaleItem from './saleItem';

// tslint:disable-next-line:no-submodule-imports
import 'ag-grid/dist/styles/ag-grid.css';
// tslint:disable-next-line:no-submodule-imports
import 'ag-grid/dist/styles/ag-theme-balham.css';
import './store.css';

// const gridProps: GridOptions = {
//     columnDefs: [
//         {field: 'name', headerName: 'Name', width: 120},
//         {field: 'count', headerName: 'In Stock', width: 100},
//         {field: 'cost', headerName: 'Cost', width: 120},
//         {field: 'actions', headerName: 'Actions'},
//     ],
//     rowData:[
//         {name: 'Lemons', count: '5', cost: '$.25 each', actions: 'Buy'}
//     ],
// }

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
        <SaleItem name={'Lemons'} quantity={5} sales={[
          {amount: 1, cost: .25},
        ]}/>
        <SaleItem name={'Cups'} quantity={120} sales={[
          {amount: 80, cost: 2.25},
          {amount: 200, cost: 4.25},
        ]}/>
      </div>
    </div>
    {/* <div className="ag-theme-balham" style={{height: '200px'}}>
      <AgGridReact {...gridProps}/>
    </div> */}
  </div>
);