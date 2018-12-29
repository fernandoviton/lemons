export default interface Day {
    readonly actualSoldCount: number;
    readonly endTime: number; // the time in which this day has ended
    readonly lemonadePitchers: number;
    readonly potentialSoldCount: number;
    readonly startTime: number;
}