import { ContestRex } from "../config";
import { GetLocalTime } from "../utils";
import { GetAtcoderContest } from "./atcoder";
import { GetCodeforcesContest } from "./codeforces";

export class Contest {
    name: string;
    startTime: number;
    constructor(name: string, startTime: number) {
        this.name = name;
        this.startTime = startTime;
    }
    toString(): string {
        let message: string;
        message = this.name;
        message += "   开始于：";
        message += GetLocalTime(this.startTime * 1000);
        message += "\n";
        return message;
    }
}
export async function GetRecentContests(): Promise<Array<Contest>> {
    let ret: Array<Contest> = [];
    let recentCodeforcesContests = await GetCodeforcesContest();
    for (const contest of recentCodeforcesContests) {
        ret.push(contest);
    }
    let recentAtcoderContests = await GetAtcoderContest();
    for (const contest of recentAtcoderContests) {
        ret.push(contest);
    }
    ret.sort((a, b) => { return a.startTime - b.startTime });
    return ret;
}

export async function GetDiv2Contests(): Promise<Array<Contest>> {
    let recentContests = await GetRecentContests();
    let div2Contests: Array<Contest> = [];
    for (const contest of recentContests) {
        if (contest.name.match(ContestRex)) {
            div2Contests.push(contest);
        }
    }
    return div2Contests;
}