export function GetLocalTime(n: number) {
    return new Date(n).toLocaleString().replace(/:\d{1,2}$/, ' ');
}  