export function GetLocalTime(n: number) {
    let date = new Date(n);
    let timeMessage = (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + (date.getMinutes() == 0 ? "00" : date.getMinutes());
    return timeMessage;
}  