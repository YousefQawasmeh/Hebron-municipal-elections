import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  // container: {
  //     maxWidth: "800px",
  //     margin: "0 auto",
  //     direction: "rtl",
  //     boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  //     minHeight: "100vh",
  // },
  //   "th, td": {
  //     padding: "5px 15px",
  //   },
  inputField: {
    marginLeft: "32px",
    fontFamily: "IRANSans",
  },

  table: {
    fontFamily: "arial, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
    minWidth: "500px",
    // width: "90vw",

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
