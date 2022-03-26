import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
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

const Voting = ({}) => {
  // const [persons, setPersons] = useState([]);
  const [schools, setSchools] = useState(["لا يوجد اي مدرسة"]);

  // const [person, setPerson] = useState({});
  const [voters, setVoters] = useState([]);
  const [voter, setVoter] = useState({});
  // const [value, setValue] = useState('');
  const [voterID, setVoterID] = useState("");
  const [votingDone, setVotingDone] = useState(null);
  const [fullName, setFullName] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [lastVoters, setLastVoters] = useState([
    { fullName: "يوسف خالد حسن قواسمة" },
  ]);
  // const handleChange = (event) => {
  // setValue(event.target.value);
  // }

  useEffect(() => {
    if (
      localStorage.getItem("selectedSchool") ||
      localStorage.getItem("shcools")
    ) {
      setSelectedSchool(localStorage.getItem("selectedSchool") || "");
      setVoters(JSON.parse(localStorage.getItem("voters")) || []);
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
  const getVotersBySchool = (school = selectedSchool) => {
    if (!school) return;
    api
      .getVotersBySchool(school)
      .then((res) => {
        const newVoters = res.data.map((v) => {
          v.fullName = `${v.firstName} ${v.secondName} ${v.thirdName} ${v.familyName}`;
          v.fullNameWithoutSpace = v.fullName.replaceAll(" ", "");
          return v;
        });
        setVoters(newVoters);
        localStorage.setItem("voters", JSON.stringify(newVoters));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Grid item xs={12}>
        <h1>تصويت جديد</h1>
        <Autocomplete
          dir="rtl"
          style={{ maxWidth: 350 }}
          options={schools}
          // getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="اسم المدرسة"
              variant="outlined"
              margin="normal"
            />
          )}
          onChange={(event, value) => {
            console.log("value", value || "");
            getVotersBySchool(value || "");
            setSelectedSchool(value || "");
            localStorage.setItem("selectedSchool", value || "");
          }}
          value={selectedSchool}
        />
      </Grid>
      <Grid item xs={12}>
        <form>
          <TextField
            label="الرمز الانتخابي"
            variant="outlined"
            type="number"
            style={{ width: "100%", maxWidth: "350px" }}
            margin="normal"
            value={voterID}
            onChange={({ target: { value } }) => {
              setVoterID(value);
              const voter = voters.find((voter) => voter?.voterID === value);
              console.log(voter);
              if (voter) setFullName(voter.fullName);
              else setFullName("");
              // setFullName(
              //   voter.firstName +
              //     " " +
              //     voter.secondName +
              //     " " +
              //     voter.thirdName +
              //     " " +
              //     voter.familyName
              // );
            }}
          />
          <br />
          <TextField
            disabled
            style={{ width: "100%", maxWidth: "350px" }}
            label="اسم المنتخب"
            variant="outlined"
            margin="normal"
            value={fullName}
            onChange={({ target: { value } }) => {
              setFullName(value);
            }}
          />
          <br />
          <Button
            style={{ width: "100%", maxWidth: "350px", height: "50px" }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              const voter = voters.find((voter) => voter?.voterID === voterID);
              if (voter) {
                api
                  .createVoting({
                    _id: voter._id,
                    votedBy: localStorage.getItem("user_id") || "unknown",
                  })
                  .then((res) => {
                    setVotingDone(true);
                    console.log(res);
                    setFullName("");
                    setVoterID("");
                    setLastVoters([...lastVoters, voter].slice(-10));
                  })
                  .catch((err) => {
                    setVotingDone(false);
                    console.log(err);
                  });
              }
            }}
          >
            تصويت
          </Button>

          {votingDone !== null && (
            <Typography variant="h6" color={votingDone ? "primary" : "error"}>
              {votingDone ? "تم التصويت بنجاح" : "لم يتم التصويت"}
            </Typography>
          )}
        </form>
      </Grid>
      {/* <Grid
        item
        xs={4}
        style={{
          position: "absolute",
          left: "150px",
          top: "100px",
        }}
      >
        <h3>اخر 10 منتخبين</h3>
        {lastVoters.map((voter, i) => {
          return (
            <h4>
              {i} - {voter.fullName}
            </h4>
          );
        })}
      </Grid> */}
    </Container>
  );
};
export default Voting;
