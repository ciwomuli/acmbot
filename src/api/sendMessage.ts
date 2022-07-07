import { ws } from "..";

export enum MessageType {
    PRIVATE,
    GROUP
};
export function SendMessage(type: MessageType, qq: number, message: string) {
    let data = { "action": "send_msg", "params": { "message_type": "", "message": message, "user_id": 0, "group_id": 0 } };
    if (type == MessageType.PRIVATE) {
        data.params["user_id"] = qq;
        data.params["message_type"] = "private";
    } else {
        data.params["group_id"] = qq;
        data.params["message_type"] = "group";
    }
    ws.send(JSON.stringify(data));
    console.log("send:" + JSON.stringify(data));
}