import { MessageType, SendMessage } from "../api/sendMessage";
import { GetData } from "./Data";

export async function SendRankList(data: any) {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const link = GetData()["contests"][dateString]["rankLink"];
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
    SendMessage(messageType, qq, "外榜链接为：" + link);
}