import React, { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import * as api from "../../api/index.js";
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
} from "@material-ui/core";
import moment from "moment";
import useStyles from "./styles.js";
const Counts = ({}) => {
  const [votings, setVotings] = useState([]);
  const [voters, setVoters] = useState([]);
  const [schools, setSchools] = useState([]);
  const [allSchools, setAllSchools] = useState([]);
  const [counts, setCounts] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [voter, setVoter] = useState({});
  const classes = useStyles();
  const totalVotings = 105372;
  //   const counts = {};
  let countsNo = 0;
  useEffect(() => {
    if (localStorage.getItem("schools")) {
      setSchools(JSON.parse(localStorage.getItem("schools")));
      //   getCountsForAllSchools();
    } else {
      api.getSchools().then((res) => {
        setSchools(res.data);
        localStorage.setItem("schools", JSON.stringify(res.data));
        // getCountsForAllSchools();
      });
    }
  }, []);
  useEffect(() => {
    if (Object.keys(counts).length > 0)
      localStorage.setItem(
        "counts",
        JSON.stringify({ counts, updatedAt: moment.now() })
      );
  }, [counts]);
  useEffect(() => {
    const oldCounts = JSON.parse(localStorage.getItem("counts"));
    console.log(
      moment.now() - oldCounts.updatedAt,
      ":::",
      Object.keys(oldCounts.counts).length
    );
    if (Object.keys(oldCounts.counts).length > 0) {
      console.log("0000000000000000");
      setCounts(oldCounts.counts);
      return;
    }
    // else console.log("1111111111111111");
    else getCountsForAllSchools();
    // getCountsForAllSchools();
  }, [schools]);

  const getCountsForSchool = (school) => {};
  const getCountsForAllSchools = () => {
    if (schools.length < 1) return;
    setAllSchools(
      schools.map((name) => {
        counts[name] = {};
        api
          .getCount(JSON.stringify({ school: name, isVoted: true }))
          .then(({ data }) => {
            counts[name].isVoted = data;
            countsNo++;
            if (74 === countsNo) setCounts({ ...counts });
          })
          .catch((err) => {
            console.log(err);
          });
        api
          .getCount(JSON.stringify({ school: name, isVoted: false }))
          .then(({ data }) => {
            counts[name].isNotVoted = data;
            countsNo++;
            if (74 === countsNo) setCounts({ ...counts });
          })
          .catch((err) => {
            console.log(err);
          });
        return { name };
      })
    );
  };
  return (
    <div>
      {/* <Autocomplete
        options={schools}
        value={selectedSchool}
        getOptionLabel={(option) => option}
        style={{ minWidth: 450 }}
        renderInput={(params) => (
          <TextField
            className={classes.inputField}
            margin="normal"
            {...params}
            label="اسم المدرسة"
            variant="outlined"
          />
        )}
        onChange={(event, value) => {
          //   handelChange("school", value);
          setSelectedSchool(value);
        }}
      />
      <br /> */}
      <h1>احصائيات المدارس</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>المدرسة</th>
            <th>عدد المنتخبين</th>
            <th>عدد غير المنتخبين</th>
            <th>المجموع</th>
            <th>نسبة المنتخبين</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
                <td>{counts.school.isVoted}</td>
                <td>{counts.school.isNotVoted}</td>
                <td>{counts.school.isVoted}</td>
                <td>{counts.school.isNotVoted}</td>
            </tr> */}
          {Object.entries(counts).map(([key, value]) => {
            //   return <h4>{key} : </h4>
            return (
              <tr>
                <td>{key}</td>
                <td>{value.isVoted}</td>
                <td>{value.isNotVoted}</td>
                <td>{value.isNotVoted + value.isVoted}</td>
                <td>
                  {(value.isVoted / (value.isNotVoted + value.isVoted)).toFixed(
                    2
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Counts;
