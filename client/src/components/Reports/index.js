import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DownloadExcell from "./DownloadExcell.js";
import { CSVLink } from "react-csv";
import useStyles from "./styles";
import * as api from "../../api/index.js";
import moment from "moment";
// import DataGrid from "./DataGrid.js";
const Report = ({}) => {
  function customersData() {
    const custs = [];
    for (let i = 0; i <= 25; i++) {
      custs[i] = {
        firstName: `firstname${i}`,
        lastName: `lastname${i}`,
        email: `mail${i}@mail.com`,
        address: `#${i}, block name, floor #${i} street name, city name, state name`,
        postcode: `${i}0000`,
      };
    }
    return custs;
  }
  const [isVoted, setIsVoted] = useState("all");
  const [school, setSchool] = useState("");
  const [schools, setSchools] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [searchInfo, setSearchInfo] = useState({});
  const [download, setdownload] = useState(false);
  const [voters, setVoters] = useState([]);
  const [showVoters, setShowVoters] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("shcools")) {
      setSchools(JSON.parse(localStorage.getItem("schools") || []));
    } else
      api
        .getSchools()
        .then((res) => {
          setSchools(res.data);
          localStorage.setItem("schools", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const handelChange = (field, value) => {
    setSearchInfo({ ...searchInfo, [field]: value });
  };
  const csvHeaders = [
    { label: "وقت الانتخاب", key: "updatedAt" },
    { label: "الرمز الانتخابي", key: "voterID" },
    { label: "اسم المدرسة", key: "school" },
    { label: "اسم العائلة", key: "familyName" },
    { label: "الاسم الثالي", key: "thirdName" },
    { label: "الاسم الثاني", key: "secondName" },
    { label: "الاسم الاول", key: "firstName" },
  ];
  const csvHeadersCounts = [
    { label: "اسم المدرسة", key: "school" },
    { label: "عدد المنتخبين", key: "isVotedCount" },
    { label: "عدد غير المنتخبين", key: "isNotVotedCount" },
    { label: "المجموع", key: "total" },
    { label: "نسبة المنتخبين", key: "per" },
  ];
  const csvData = null;
  const fileName = "تقرير.csv";
  return (
    <Container>
      <Grid item xs={12}>
        <h1>تقارير</h1>
        <form>
          <Autocomplete
            options={["all", ...schools]}
            getOptionLabel={(option) =>
              option === "all" ? "جميع المدارس" : option
            }
            style={{ maxWidth: 450 }}
            renderInput={(params) => (
              <TextField
                className={classes.inputField}
                margin="normal"
                {...params}
                label="اسم المدرسة"
                variant="outlined"
              />
            )}
            onChange={(_, value) => {
              handelChange("school", value);
            }}
          />
          <br />
          <Select
            value={
              searchInfo.isVoted === true || searchInfo.isVoted === false
                ? searchInfo.isVoted
                : "all"
            }
            onChange={(e) => {
              handelChange("isVoted", e.target.value);
            }}
          >
            <MenuItem value={"all"}>
              <em>الجميع</em>
            </MenuItem>
            <MenuItem value={true}>انتخب</MenuItem>
            <MenuItem value={false}>لم ينتخب</MenuItem>
          </Select>
          <br />

          <TextField
            className={classes.inputField}
            margin="normal"
            label="الاسم الاول"
            variant="outlined"
            value={searchInfo.firstName || ""}
            onChange={(e) => handelChange("firstName", e.target.value)}
          />
          {/* <br /> */}
          <TextField
            className={classes.inputField}
            margin="normal"
            label="الاسم الثاني"
            variant="outlined"
            value={searchInfo.secondName || ""}
            onChange={(e) => handelChange("secondName", e.target.value)}
          />
          <br />
          <TextField
            className={classes.inputField}
            margin="normal"
            label="الاسم الثالث"
            variant="outlined"
            value={searchInfo.thirdName || ""}
            onChange={(e) => handelChange("thirdName", e.target.value)}
          />
          {/* <br /> */}
          <TextField
            className={classes.inputField}
            margin="normal"
            label="اسم العائلة"
            variant="outlined"
            value={searchInfo.familyName || ""}
            onChange={(e) => handelChange("familyName", e.target.value)}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              // const report = {}
              // [school, firstName, secondName, thirdName, familyName].forEach(e => {
              //     if (e)
              //         report[e] = e;
              // })
              // if (isVoted !== "all")
              //     report.isVoted = isVoted;
              const report = { ...searchInfo };
              //   if (report.isVoted === "all") delete report.isVoted;
              //   console.log(!!report);
              Object.entries(report).forEach(([key, value]) => {
                if (!value.toString() || value === "all") delete report[key];
              });
              if (Object.keys(report).length === 0)
                return alert("يجب اختيار المدرسة");
              //   axios
              // .get(`/api/voters?query=${JSON.stringify(report)}`)
              api.getVoters(JSON.stringify(report)).then((res) => {
                console.log(res.data);
                setVoters(res.data);
                setdownload(true);
              });
            }}
          >
            بحث
          </Button>
          {
            <Button
              style={{ margin: "0 10px" }}
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                setShowVoters(true);
                // const report = { ...searchInfo };
                // if (report.isVoted === "all") delete report.isVoted;
                // console.log(!!report);
                // Object.entries(report).forEach(([key, value]) => {
                //   if (!value.toString() || value === "all") delete report[key];
                // });
                // api
                //   .getCount(JSON.stringify(report))
                //   .then((res) => {
                //     console.log(res.data);

                //     // setVoters(res.data);
                //     // setdownload(true);
                //   })
                //   .catch((err) => {
                //     console.log(err);
                //   });
              }}
            >
              عرض نيجة البحث
            </Button>
          }
          {/* <br /> */}
          {(voters.length || "") && (
            <CSVLink
              onClick={() => {
                setdownload(false);
                setVoters([]);
              }}
              style={{ textDecoration: "none" }}
              headers={csvHeaders || []}
              data={voters || []}
              filename={fileName || "تقرير.csv"}
            >
              <Button
                // onMouseUp={() => {
                //   setTimeout(() => {
                //     setdownload(false);
                //   }, 0);
                // }}
                variant="outlined"
                color="primary"
              >
                تصدير الى اكسل
              </Button>
            </CSVLink>
          )}
        </form>
        <h4>
          عدد الصفوف في اخر عملة بحث: {voters?.length} صف
          {/* {voters.length} */}
        </h4>
        {showVoters && (
          <TableContainer
          // component={Paper}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>الاسم الاول</TableCell>
                  <TableCell>الاسم الثاني</TableCell>
                  <TableCell>الاسم الثالث</TableCell>
                  <TableCell>اسم العائلة</TableCell>
                  <TableCell>المدرسة</TableCell>
                  <TableCell>الرمز الانتخابي</TableCell>
                  <TableCell>وقت الانتخاب</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {voters?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.secondName}</TableCell>
                    <TableCell>{row.thirdName}</TableCell>
                    <TableCell>{row.familyName}</TableCell>
                    <TableCell>{row.school}</TableCell>
                    <TableCell>{row.voterID}</TableCell>
                    <TableCell>
                      {row.updatedAt &&
                        moment(row.updatedAt).format("hh:mm:ss")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      {/* <DownloadExcell voters={voters} download={download} setdownload={setdownload} /> */}
      {/* <DownloadExcell
            headers={[
                { label: "asd", key: "firstName" },
                // { label: "الاسم الاول", key: "firstName" },
                // { label: "الاسم الثاني", key: "secondName" },
                // { label: "الاسم الثالث", key: "thirdName" },
                // { label: "اسم العائلة", key: "familyName" },
                // { label: "الرمز الانتخابي", key: "voterID" },
                // { label: "اسم المدرسة", key: "school" },
                // { label: "قام بالانتخاب", key: "isVoted" },
                // { label: "عدد مرات الانتخاب", key: "votingsCount" },
                // { label: "وقت الانتخاب", key: "updatedAt" },
                // { label: "المسؤول عن الصندوق", key: "votedBy" },
            ]}
            data={customersData()}
            // data={() => [{
            //     _id: "622d9e82aadc3b6ff40d768e",
            //     no: 11882,
            //     school: "مدرسة إبراهيم أبو الضبعات الثانوية للبنات",
            //     voterID: "91877013",
            //     firstName: "يوسف",
            //     secondName: "خالد",
            //     thirdName: "حسن",
            //     familyName: "قواسمه",
            //     isVoted: true,
            //     votingsCount: 55,
            //     updatedAt: "2022-03-15T21:05:20.839Z",
            //     votedBy: "unknown"
            // }]}
            fileName={"123.csv"} /> */}
      {/* <h1>000000000000000000</h1> */}
      {/* <DataGrid/> */}
    </Container>
  );
};

export default Report;
