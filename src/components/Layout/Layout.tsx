import { Grid } from "@mui/material";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidenav from "../Sidenav/Sidenav";

const Layout = () => {
  return (
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
        <Grid item xs={10}>
          <Sidenav />
        </Grid>
        <Grid item xs={90}>
          <span>CONTENT</span>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Layout;
