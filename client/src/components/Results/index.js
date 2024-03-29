import React, { useEffect, useState } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";

const Results = () => {
  //   const classes = useStyles();
  const [lists, setLists] = useState([{}, {}, {}, {}, {}, {}]);
  const [listsResults, setListsResults] = useState([]);
  const [minPercentage, setMinPercentage] = useState(8);
  const [totalVotes, setTotalVotes] = useState(0);
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    setLists(
      lists.map((list, index) => {
        list.id = index + 1;
        list.name = "القائمة " + (index + 1);
        list.votes = 0;
        list.percentage = 0;
        return list;
      })
    );
  }, []);
  return (
    <Container
      maxWidth="lg"
      style={{
        padding: "0px",
      }}
      // className={classes.container}
    >
      <h1>النتائج</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   height: "100vh",
          width: "fit-content",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              type="number"
              autoComplete="off"
              //   key={item}
              //   id={item}
              label={`القائمة ${item}`}
              // className={classes.textField}
              margin="dense"
              variant="outlined"
              value={item?.votes}
              onChange={(e) => {
                setLists(
                  lists.map((list, index) => {
                    if (index === item - 1) {
                      list.votes = e.target.value;
                    }
                    return list;
                  })
                );
              }}
            />
            {showResult && (
              <h4
                style={{
                  padding: "0 25px 0 0",
                  whiteSpace: "nowrap",
                }}
              >
                عدد المقاعد:
                {listsResults?.reduce((acc, curr) => {
                  return curr?.listId === item ? acc + 1 : acc;
                }, 0)}
              </h4>
            )}
            {showResult && (
              <h4
                style={{
                  padding: "0 25px 0 0",
                  whiteSpace: "nowrap",
                }}
              >
                نسبة الأصوات:
                {lists[item - 1]?.percentage}%
              </h4>
            )}
          </div>
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ height: "50px" }}
          onClick={(events) => {
            events.preventDefault();
            setShowResult(true);
            const newListsResults = [];
            const sum = lists.reduce((acc, curr) => {
              return Number(acc) + Number(curr.votes);
            }, 0);
            setTotalVotes(sum);
            const newLists = lists.map((list) => {
              list.percentage = ((list.votes / sum) * 100).toFixed(2);
              return list;
            });

            // setLists(
            //   lists
            //     .map((list) => {
            //       list.percentage = (list.votes / sum) * 100;
            //       return list;
            //     })
            //     .filter((list) => list.percentage * 100 >= minPercentage)
            // );

            newLists
              ?.filter((list) => list.percentage >= minPercentage)
              ?.forEach((list) => {
                [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29].map(
                  (item) => {
                    newListsResults.push({
                      listId: list.id,
                      name: list.name,
                      candidateId: item,
                      votes: (list.votes / item).toFixed(1),
                    });
                  }
                );
              });

            setListsResults(
              newListsResults
                .sort((a, b) => {
                  return b.votes - a.votes;
                })
                .slice(0, 15)
            );
            // setLists(
            //   lists.map((list, index) => {
            //     list.id = index + 1;
            //     list.name = "القائمة " + (index + 1);
            //     list.votes = 0;
            //     list.percentage = 0;
            //     return list;
            //   })
            // );
          }}

          // className={classes.navButton}
        >
          احسب النتيجة
        </Button>
      </form>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "center",
          // height: "100vh",
          // maxWidth: "300px",
        }}
      >
        <br />
        {listsResults.map((list, i) => (
          <>
            <Typography>
              {i + 1 + ")"} {list.name} : {list.votes}
            </Typography>
            <br />
          </>
        ))}
      </Grid>
    </Container>
  );
};

export default Results;
