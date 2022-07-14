import { readFile, readJSONSync } from "fs-extra";


let data: any;
export function GetData() {
    if (data) return data;
    data = readJSONSync('data.json');
    return data;
}
export function UpdateData(){
    data = readJSONSync('data.json');
}
