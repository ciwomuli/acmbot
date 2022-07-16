import needle from "needle";
import { ChcheTime } from "../config";
import { Contest } from "./Contest";
let recentContests: Array<Contest>;
let lastGetTime: number = 0;
export async function GetCodeforcesContest(): Promise<Contest[]> {
    let nowTime = Date.now() / 1000;
    // console.log(nowTime);
    //console.log(lastGetTime);
    if (nowTime - lastGetTime > ChcheTime) {
        try {
            recentContests = [];
            console.log("Begin to get codeforces contest.");
            await needle('get', "https://codeforces.com/api/contest.list?gym=false", { json: true }).then((res) => {
                // console.log(res.body);
                let data = res.body;
                if (data["status"] == "OK") {
                    let contests = data["result"];
                    for (let contest of contests) {
                        //console.log(contest["id"])
                        if (contest["phase"] == "BEFORE") {
                            recentContests.push(new Contest(contest["name"], contest["startTimeSeconds"]));
                        }
                    }
                    lastGetTime = nowTime;
                }
                //    console.log(recentContests);
            }).catch((err) => {
                if (err) {
                    return console.log(err);
                }
            });
        } catch {
            console.log("获取CF失败");
        }
    }
    return recentContests;
}