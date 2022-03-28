import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    direction: "rtl",
    textAlign: "right",
    fontFamily: "IRANSans",
    overflow: "auto",
    minHeight: "100vh",
    padding: "10px",
  },
  appBar: {
    minHeight: "30px",
    justifyContent: "center",
    textAlign: "center",
  },
  containerNavButtons: {
    "& a": {
      textDecoration: "none",
    },
  },
  navButton: {
    margin: "10px 2% 0",
    width: "45%",
    maxWidth: "150px",
  },
}));
