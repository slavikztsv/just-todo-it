import { Grid, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import theme from "../../styles/materialTheme";
import classes from "./Layout.module.scss";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidenav from "../Sidenav/Sidenav";
import DialogProvider, { DialogContext } from "../../contexts/DialogContext";
import { useContext } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import enLocale from "date-fns/locale/en-US";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <DialogProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
          <Grid
            container
            direction={"column"}
            justifyContent={"space-between"}
            columns={100}
            className={classes.layout}
            wrap={"nowrap"}
          >
            <Grid item xs={10}>
              <Header />
            </Grid>
            <Grid
              item
              container
              direction={"row"}
              xs={80}
              className={classes.layout_middle_container}
            >
              <Grid item xs={10} bgcolor={theme.palette.primary.main}>
                <Sidenav />
              </Grid>
              <Grid
                item
                xs={90}
                className={classes.layout_middle_container_content}
              >
                <Outlet />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Footer />
            </Grid>
          </Grid>
          <CustomDialog />
        </LocalizationProvider>
      </DialogProvider>
    </ThemeProvider>
  );
};

export default Layout;
