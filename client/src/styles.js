import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  // "*": {
  //     direction: "rtl",
  //     textAlign: "right",
  //     fontFamily: "IRANSans",
  // },

  container: {
    display: "flex",
    flexDirection: "column",
    direction: "rtl",
    textAlign: "right",
    fontFamily: "IRANSans",
    // background: "aquamarine",
    overflow: "auto",
    minHeight: "100vh",
    padding: "0px",
  },
  containerNavButtons: {
    // display: "flex",
    // flexDirection: "row",
    padding: "10px",
    // backgroundColor: "#f5f5f5",
    "& a": {
      textDecoration: "none",
    },
  },
  navButton: {
    // margin: "10px 10px 0",
    margin: "10px 2% 0",
    width: "45%",
    maxWidth: "150px",
  },

  // container: {
  //     maxWidth: "800px",
  //     margin: "0 auto",
  //     direction: "rtl",
  //     boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  //     minHeight: "100vh",
  // },
  // appBar: {
  //     borderRadius: 15,
  //     margin: '30px 0',
  //     display: 'flex',
  //     flexDirection: 'row',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  // },
  // heading: {
  //     color: 'rgba(0,183,255, 1)',
  // },
  // image: {
  //     marginLeft: '15px',
  // },
}));
