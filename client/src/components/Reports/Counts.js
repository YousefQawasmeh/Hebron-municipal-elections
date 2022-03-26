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
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(false);
  const classes = useStyles();
  const totalVotings = 105372;
  //   const counts = {};
  let countsNo = 0;
  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("schools")) {
      setSchools(JSON.parse(localStorage.getItem("schools")) || []);
      setLoading(false);
      //   getCountsForAllSchools();
    } else {
      api.getSchools().then((res) => {
        setSchools(res.data);
        setLoading(false);
        localStorage.setItem("schools", JSON.stringify(res.data));
        // getCountsForAllSchools();
      });
    }
  }, []);
  useEffect(() => {
    if (Object.keys(counts).length > 0) {
      localStorage.setItem(
        "counts",
        JSON.stringify({ counts, updatedAt: moment().format("HH:mm:ss") })
      );
      setUpdatedAt(moment().format("HH:mm:ss"));
    }
  }, [counts]);
  useEffect(() => {
    const oldCounts = JSON.parse(localStorage.getItem("counts")) || {
      updatedAt: "",
      counts: {},
    };
    console.log(
      moment().format("HH:mm:ss"),
      moment().valueOf(),
      "55555555551111",
      ":::"
    );
    if (Object.keys(oldCounts.counts).length > 0) {
      console.log("0000000000000000");
      setCounts(oldCounts.counts);
      setUpdatedAt(oldCounts.updatedAt);
      return;
    }
    // else console.log("1111111111111111");
    else getCountsForAllSchools();
    // getCountsForAllSchools();
  }, [schools]);

  const getCountsForSchool = (school) => {};
  const getCountsForAllSchools = () => {
    setLoading(true);
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
            if (74 === countsNo) {
              setCounts({ ...counts });
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        return { name };
      })
    );
  };
  return loading ? (
    <img
      style={{ marginRight: "-220px" }}
      src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-19.jpg"
    />
  ) : (
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
      <h1>
        احصائيات المدارس {updatedAt}
        <img
          style={{
            width: "30px",
            verticalAlign: "sub",
          }}
          onClick={() => {
            localStorage.removeItem("counts");
            window.location.reload();
          }}
          src="https://i.imgur.com/imaRn8j.png"
        />
      </h1>
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
                  %
                  {(
                    (value.isVoted / (value.isNotVoted + value.isVoted)) *
                    100
                  ).toFixed(2)}
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
