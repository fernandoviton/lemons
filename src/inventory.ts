export interface Price {
    amount: number;
    cost: number;
}

export interface AvailableForSale {
    [k: string]: Price[];
}

export interface Inventory {
    [k: string]: number; // TODO: change to interface and add display name
}