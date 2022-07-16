import cheerio from "cheerio";
import needle from "needle";
import { Contest } from "./Contest";
let recentContests: Array<Contest>;
let finished: Boolean;
let lastGetTime: number = 0;
export async function GetAtcoderContest(): Promise<Array<Contest>> {
    let nowTime = Date.now() / 1000;
    if (nowTime - lastGetTime > ChcheTime) {
        try {
            recentContests = [];
            console.log("Begin to get atcoder contest.");
            let body = await (await needle('get', "https://atcoder.jp/?lang=en")).body;
            const $ = cheerio.load(body);
            $("#contest-table-upcoming > div > table > tbody > tr").each((index: any, ele: any) => {
                let time = new Date($(ele).children("td:nth-child(1)").text()).getTime();
                let name = $(ele).children("td:nth-child(2)").text().substring(3);
                recentContests.push(new Contest(name, time / 1000));
            });
            lastGetTime = nowTime;
        } catch {
            console.log("获取Atcoder失败");
        }
    }
    return recentContests;
}