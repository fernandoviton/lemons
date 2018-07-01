import * as React from 'react';
import './store.css';

import { Price } from './inventory';

export interface SaleItemProps {
    name: string;
    quantity: number;
    salePrices: Price[];
};

export default (props: SaleItemProps) => (
    <div className="card mb-4 box-shadow">
        <div className="card-header">
        <h4 className="my-0 font-weight-normal">{props.name}</h4>
        </div>
        <div className="card-body">
            <h4 className="mt-3 mb-4">You have {props.quantity}</h4>
            {props.salePrices.map((price) =>
                <button
                    key={price.amount + price.cost}
                    type="button"
                    className="btn btn-lg btn-block btn-primary">Buy {price.amount} for ${price.cost}</button>
                )}
        </div>
    </div>
)