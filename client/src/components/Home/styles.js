import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  containerNavButtons: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
    "& a": {
      textDecoration: "none",
    },
  },
  navButton: {
    margin: "10px 10px 0",
  },
}));
