import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  inputField: {
    width: "100%",
    fontFamily: "IRANSans",
  },

  table: {
    fontFamily: "arial, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
    minWidth: "500px",
    " & td, th": {
      border: "1px solid #dddddd",
      textAlign: "right",
      padding: "3px",
      whiteSpace: "nowrap",
    },
    "& tr:nth-child(even)": {
      backgroundColor: "#dddddd",
    },
  },
}));
