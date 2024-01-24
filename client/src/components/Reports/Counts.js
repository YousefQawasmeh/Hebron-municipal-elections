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
  const [counts, setCounts] = useState({});
  const [totalVotings, setTotalVotings] = useState({
    total: 1,
    isVoted: 0,
    isNotVoted: 1,
  });
  const noOfSchools = 37;
  const [selectedSchool, setSelectedSchool] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(false);
  const classes = useStyles();

  let countsNo = 0;
  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("schools")) {
      setSchools(JSON.parse(localStorage.getItem("schools")) || []);
      setLoading(false);
    } else {
      api.getSchools().then((res) => {
        setSchools(res.data);
        setLoading(false);
        localStorage.setItem("schools", JSON.stringify(res.data));
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(counts).length > 0) {
      setTotalVotings(totalVotings);
      setCounts({ ...counts });
      localStorage.setItem(
        "counts",
        JSON.stringify({ counts, updatedAt: moment().format("HH:mm:ss") })
      );
      localStorage.setItem("totalVotings", JSON.stringify(totalVotings));
      setUpdatedAt(moment().format("HH:mm:ss"));
    }
  }, [loading]);

  useEffect(() => {
    const oldCounts = JSON.parse(localStorage.getItem("counts")) || {
      updatedAt: "",
      counts: {},
    };
    const oldTotalVotings = JSON.parse(
      localStorage.getItem("totalVotings")
    ) || {
      total: 1,
      isVoted: 0,
      isNotVoted: 1,
    };

    if (Object.keys(oldCounts.counts).length > 0) {
      setTotalVotings(oldTotalVotings);
      setCounts(oldCounts.counts);
      setUpdatedAt(oldCounts.updatedAt);
      return;
    } else getCountsForAllSchools();
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
            totalVotings.isVoted += data;
            countsNo++;
            if (noOfSchools * 2 === countsNo) setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
        api
          .getCount(JSON.stringify({ school: name, isVoted: false }))
          .then(({ data }) => {
            counts[name].isNotVoted = data;
            totalVotings.isNotVoted += data;
            countsNo++;
            if (noOfSchools * 2 === countsNo) setLoading(false);
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
    <div style={{ width: "100%" }}>
      <h1>
        احصائيات المدارس {updatedAt}
        <img
          style={{
            width: "30px",
            verticalAlign: "sub",
            margin: "2px 0",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("counts");
            window.location.reload();
          }}
          src="https://i.imgur.com/imaRn8j.png"
        />
      </h1>
      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table className={classes.table}>
          <thead>
            <tr>
              <th>المدرسة</th>
              <th>المنتخبين</th>
              <th>غير المنتخبين</th>
              <th>المجموع</th>
              <th>نسبة التصويت</th>
            </tr>
          </thead>
          <tbody>
            <tr key={"total"}>
              <td>{"جميع المدارس"}</td>
              <td>{totalVotings.isVoted}</td>
              <td>{totalVotings.isNotVoted}</td>
              <td>{totalVotings.isNotVoted + totalVotings.isVoted}</td>
              <td>
                %
                {(
                  (totalVotings.isVoted /
                    (totalVotings.isNotVoted + totalVotings.isVoted)) *
                  100
                ).toFixed(2)}
              </td>
            </tr>
            {Object.entries(counts).map(([key, value]) => {
              return (
                <tr key={key}>
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
    </div>
  );
};

export default Counts;
