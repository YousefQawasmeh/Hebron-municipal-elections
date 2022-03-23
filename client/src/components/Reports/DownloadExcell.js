import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "@material-ui/core";

const DownloadExcell = ({ csvHeaders, csvData, fileName }) => (
  <CSVLink
    headers={
      csvHeaders || [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "email" },
      ]
    }
    data={
      csvData || [
        { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
        { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
        { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
      ]
    }
    filename={fileName || "00.csv"}
  >
    <Button variant="contained">Export CSV</Button>
  </CSVLink>
);

export default DownloadExcell;

// import React from "react";
// import ReactExport from "react-export-excel";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// // const dataSet1 = [
// //     {
// //         name: "Johson",
// //         amount: 30000,
// //         sex: 'M',
// //         is_married: true
// //     },
// //     {
// //         name: "Monika",
// //         amount: 355000,
// //         sex: 'F',
// //         is_married: false
// //     },
// //     {
// //         name: "John",
// //         amount: 250000,
// //         sex: 'M',
// //         is_married: false
// //     },
// //     {
// //         name: "Josef",
// //         amount: 450500,
// //         sex: 'M',
// //         is_married: true
// //     }
// // ];

// // const dataSet2 = [
// //     {
// //         name: "Johnson",
// //         total: 25,
// //         remainig: 16
// //     },
// //     {
// //         name: "Josef",
// //         total: 25,
// //         remainig: 7
// //     }
// // ];

// const DownloadExcell = ({ voters = [
//     {
//         "_id": "622d9e82aadc3b6ff40d768e",
//         "no": 11882,
//         "school": "مدرسة إبراهيم أبو الضبعات الثانوية للبنات",
//         "voterID": "91877013",
//         "firstName": "يوسف",
//         "secondName": "خالد",
//         "thirdName": "حسن",
//         "familyName": "قواسمه",
//         "isVoted": true,
//         "voteCount": 55,
//         "updatedAt": "2022-03-15T21:05:20.839Z",
//         "votedBy": "unknown"
//     }
// ] }) => {

//     return (
//         <ExcelFile>
//             {/* <ExcelSheet data={dataSet1} name="Employees">
//                 <ExcelColumn label="Name" value="name" />
//                 <ExcelColumn label="Wallet Money" value="amount" />
//                 <ExcelColumn label="Gender" value="sex" />
//                 <ExcelColumn label="Marital Status"
//                     value={(col) => col.is_married ? "Married" : "Single"} />
//             </ExcelSheet>
//             <ExcelSheet data={dataSet2} name="Leaves">
//                 <ExcelColumn label="Name" value="name" />
//                 <ExcelColumn label="Total Leaves" value="total" />
//                 <ExcelColumn label="Remaining Leaves" value="remaining" />
//             </ExcelSheet> */}
//             <ExcelSheet data={voters} name="تقرير">
//                 <ExcelColumn label="الاسم الاول" value="firstName" />
//                 <ExcelColumn label="الاسم الثاني" value="secondName" />
//                 <ExcelColumn label="الاسم الثالث" value="thirdName" />
//                 <ExcelColumn label="اسم العائلة" value="familyName" />
//                 <ExcelColumn label="الرمز الانتخابي" value="voterID" />
//                 <ExcelColumn label="اسم المدرسة" value="school" />
//                 <ExcelColumn label="قام بالانتخاب" value="isVoted" />
//                 <ExcelColumn label="عدد مرات الانتخاب" value="votingsCount" />
//                 <ExcelColumn label="وقت الانتخاب" value="updatedAt" />
//                 <ExcelColumn label="المسؤول عن الصندوق" value="votedBy" />
//             </ExcelSheet>
//         </ExcelFile>
//     );
// }

// export default DownloadExcell;
