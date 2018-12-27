export default interface Day {
    readonly actualSoldCount: number;
    readonly currentTick: number;
    readonly lemonadePitchers: number;
    readonly potentialSoldCount: number;
    readonly totalTicks: number;
}

export const hasDayEnded = (day: Day) =>
    !day || day.currentTick >= day.totalTicks - 1;
