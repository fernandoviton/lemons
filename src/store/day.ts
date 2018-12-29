export default interface Day {
    readonly actualSoldCount: number;
    readonly endTime: number; // the time in which this day has ended
    readonly lemonadePitchers: number;
    readonly potentialSoldCount: number;
    readonly startTime: number;
}

// export const hasDayEnded = (day: Day) =>
//     !day || day.currentTime >= day.endTime - 1;
