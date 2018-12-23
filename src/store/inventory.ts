export interface Price {
    amount: number;
    cost: number;
}

export interface AvailableForSale {
    [k: string]: Price[];
}

export interface Inventory {
    cups: number,
    lemons: number,
    poundsOfSugar: number,
}

export interface Stand {
    lemonadePitchers: number;
}