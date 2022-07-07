import { ParseMessage } from "./parseMessage";

export function ParseEvent(data: string) {
    const dataJson = JSON.parse(data);
    switch (dataJson["post_type"]) {
        case "message": ParseMessage(dataJson).then();
    }
}