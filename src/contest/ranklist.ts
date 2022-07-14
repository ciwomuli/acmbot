import { MessageType, SendMessage, SendMessageBack } from "../api/sendMessage";
import { GetData } from "./Data";

export function SendRankList(data: any) {
    let message: string;
    try {
        const date = new Date();
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const link = GetData()["contests"][dateString]["rankLink"];
        message = "今日外榜链接为:" + link;
    } catch {
        message = "获取失败";
    }
    SendMessageBack(data, message);
}
