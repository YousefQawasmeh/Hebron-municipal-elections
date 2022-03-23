import React, { useEffect, useState } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
} from "@material-ui/core";
import LoadData from "./components/LoadData/LoadData";
import Voting from "./components/Voting/index.js";
import Reports from "./components/Reports/index.js";
import Counts from "./components/Reports/Counts";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import useStyles from "./styles";
const App = () => {
  const [pages, setPages] = useState([]);
  const classes = useStyles();
  return (
    <Router>
      <Container maxWidth="lg" className={classes.container}>
        <AppBar position="static" color="default">
          <Typography variant="h3" color="inherit" style={{ fontSize: "6vw" }}>
            انتخابات مجلس بلدية الخليل للعام 2022
          </Typography>
        </AppBar>
        <Grow in={true}>
          <Grid container>
            <Grid item xs={12} className={classes.containerNavButtons}>
              <Link to="/loadData">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.navButton}
                >
                  صفحة جديدة
                </Button>
              </Link>
              <Link to="/voting">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.navButton}
                >
                  تصويت جديد
                </Button>
              </Link>
              <Link to="/reports">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.navButton}
                >
                  تقارير
                </Button>
              </Link>
              <Link to="/counts">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.navButton}
                >
                  احصائيات
                </Button>
              </Link>
            </Grid>
            <Routes>
              <Route exact path="/" element={<Voting />} />
              <Route exact path="/loadData" element={<LoadData />} />
              <Route exact path="/voting" element={<Voting />} />
              <Route exact path="/reports" element={<Reports />} />
              <Route exact path="/counts" element={<Counts />} />
            </Routes>
          </Grid>
        </Grow>
      </Container>
    </Router>
  );
  // <Container className={classes.container}>
  //     <AppBar position="static" color="default">
  //         <Typography variant="h2" color="inherit">
  //             <img src="https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png" alt="LOGO" width={60} />
  //             LOGO
  //         </Typography>
  //     </AppBar>
  //     <Reports />
  //     <Voting />
  // </Container>
};

export default App;
