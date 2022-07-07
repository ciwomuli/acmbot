import { scheduleJob } from 'node-schedule';
import WebSocket from 'ws';
import { MessageType, SendMessage } from './api/sendMessage';
import { Contest, GetDiv2Contests } from './contest/Contest';
import { ParseEvent } from './parse/parse';

export const ws = new WebSocket('ws://localhost:57943/');

ws.on('message', function message(data) {
    console.log("received:" + data);
    ParseEvent(data.toString('utf-8'));
});
export function NodifyContest() {
    GetDiv2Contests().then((recentContests) => {
        if (!recentContests) return;
        let nodifyContests: Array<Contest> = [];
        for (const contest of recentContests) {
            let contestDate = new Date(contest.startTime * 1000);
            let nowTime = new Date();
            if (contestDate.getDate() == nowTime.getDate()) {
                nodifyContests.push(contest);
            }
        }
        if (nodifyContests.length > 0) {
            let message = "[CQ:at,qq=all] 今日比赛为：\n";
            for (const contest of nodifyContests) {
                message += contest.toString();
            }
            SendMessage(MessageType.GROUP, 773682417, message);
        } else {
            let message = "今日无比赛：）";
            SendMessage(MessageType.GROUP, 773682417, message);
        }
    })
}
const job = scheduleJob('0 0 19 * * *', NodifyContest);