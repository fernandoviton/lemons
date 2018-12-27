export default interface TurnData {
    readonly actualSoldCount: number;
    readonly currentTick: number;
    readonly lemonadePitchers: number;
    readonly potentialSoldCount: number;
    readonly totalTicks: number;
}

export const isTurnEnded = (turnData: TurnData) =>
    !turnData || turnData.currentTick >= turnData.totalTicks - 1;
