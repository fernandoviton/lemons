import * as React from 'react';
import { AvailableForSale, Inventory } from '../store';
import { default as StoreItem } from './item';

import './store.css';

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

export default (props: ItemStoreProps) => (
  <div>
    <div className="container pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <div className="card-deck mb-3 text-center">
        { getStoreItems(props) }
      </div>
    </div>
  </div>
);