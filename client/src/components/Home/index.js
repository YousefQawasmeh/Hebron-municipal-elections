import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  return (
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
  );
};

export default Home;
