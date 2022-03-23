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
    // width: "90vw",

    " & td, th": {
      border: "1px solid #dddddd",
      //   textAlign: "left",
      padding: "8px",
    },

    "& tr:nth-child(even)": {
      backgroundColor: "#dddddd",
    },
  },
}));
