import { NodifyContest } from "..";
import { SendMessageBack } from "../api/sendMessage";
import { GetDiv2Contests } from "../contest/Contest";
import { SendRankList } from "../contest/ranklist";

export async function ParseMessage(data: any) {
    if (data["raw_message"] == ".contest") {
        let recentContests = await GetDiv2Contests();
        let message = "最近的比赛为：\n";
        let cnt = 0;
        for (const contest of recentContests) {
            if (cnt > 2) break;
            message += contest.toString();
            cnt++;
        }
        SendMessageBack(data, message);
    } else if (data["raw_message"] == ".test") {
        NodifyContest();
    } else if (data["raw_message"] == "来个榜") {
        SendRankList(data);
    }
}