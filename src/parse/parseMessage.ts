import {NodifyContest } from "..";
import { MessageType, SendMessage } from "../api/sendMessage";
import { GetAtcoderContest } from "../contest/atcoder";
import { GetCodeforcesContest } from "../contest/codeforces";
import { GetDiv2Contests, GetRecentContests } from "../contest/Contest";
import { GetLocalTime } from "../utils";

export async function ParseMessage(data: any) {
    if (data["raw_message"] == ".contest") {
        let messageType: MessageType;
        let qq: number;
        if (data["message_type"] == "private") {
            messageType = MessageType.PRIVATE;
            qq = data["user_id"];
        }
        else {
            messageType = MessageType.GROUP;
            qq = data["group_id"];
        }
        let recentContests = await GetDiv2Contests();
        let message = "最近的比赛为：\n";
        let cnt = 0;
        for (const contest of recentContests) {
            if (cnt > 2) break;
            message += contest.toString();
            cnt++;
        }
        SendMessage(messageType, qq, message);
    } else if (data["raw_message"] == ".test") {
        NodifyContest();
    }
}