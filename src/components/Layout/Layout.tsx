import { Grid, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import theme from "../../styles/materialTheme";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidenav from "../Sidenav/Sidenav";

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction={"column"}
        justifyContent={"space-between"}
        columns={100}
        sx={{ height: "100%" }}
      >
        <Grid item xs={10}>
          <Header />
        </Grid>
        <Grid item container direction={"row"} xs={80}>
          <Grid item xs={10} bgcolor={theme.palette.primary.main}>
            <Sidenav />
          </Grid>
          <Grid item xs={90}>
            <Outlet />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Footer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Layout;
