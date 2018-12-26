export default interface TurnData {
    readonly currentTick: number;
    readonly potentialSoldCount: number;
    readonly totalTicks: number;

    readonly actualSoldCount?: number;
}

export const isTurnEnded = (turnData: TurnData) =>
    turnData.currentTick >= turnData.totalTicks - 1;
