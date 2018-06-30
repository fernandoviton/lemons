import * as React from 'react';
import './store.css';

export interface SaleItemProps {
    quantity: number,
    name: string,

    sales?: Array<{
        amount: number,
        cost: number
    }>,
};

export default (props: SaleItemProps) => (
    <div className="card mb-4 box-shadow">
        <div className="card-header">
        <h4 className="my-0 font-weight-normal">{props.name}</h4>
        </div>
        <div className="card-body">
            <h4 className="mt-3 mb-4">You have {props.quantity}</h4>
            {props.sales && props.sales.map((sale) =>
                <button
                    key={sale.amount + sale.cost}
                    type="button"
                    className="btn btn-lg btn-block btn-primary">Buy {sale.amount} for ${sale.cost}</button>
                )}
        </div>
    </div>
)