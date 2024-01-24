import { read } from 'xlsx/xlsx.mjs';
import * as XLSX from 'xlsx';
import { readFileSync } from "fs";
import { resolve } from 'path';


export const readExcel = async (req, res) => {
    let wb;
    let ws;
    try {
        // const buf = readFileSync("hebron.xlsx");
        let workBook = XLSX.read(readFileSync("hebron.xlsx"))
        // console.log(workBook.Sheets["Sheet1"], "\n\n")
        // const workSheets = {};
        // workSheets["Sheet1"] = XLSX.utils.sheet_to_json(workBook.Sheets["Sheet1"])
        // console.log(workBook.Sheets["Sheet1"], "\n\n")
        // console.log(JSON.stringify(workBook.Sheets["Sheet1"]))

        let workSheets = {};
        for (const sheetName of workBook.SheetNames) {
            workSheets[sheetName] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
        }
        // console.log(workSheets)
        // const buf = readFileSync("hebron.xlsx");
        // wb = read(buf);
        // ws = wb.Sheets[wb.SheetNames[0]];
        // console.log(wb, ws[0], ws[1], ws[2]);
        return res.send(JSON.stringify(workSheets.Sheet1));
    } catch (e) {
        return res.status(500).json({ err: "err can't read Excel file." });
    }
}