import { createTheme } from "@mui/material";
import colors from './_colors.module.scss';

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        color: "success"
      }
    }
  },
  palette: {
    mode: "dark",
    primary: {
      main: colors.primaryColor,
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

export default theme;