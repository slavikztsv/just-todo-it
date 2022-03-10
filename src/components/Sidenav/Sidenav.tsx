import { useNavigate } from "react-router-dom";
import classes from "./Sidenav.module.scss";

interface IProps {}

const Sidenav = (props: IProps) => {
  const navigate = useNavigate();
  const onBoardsClick = () => navigate("/");

  return (
    <div className={classes.sidenav}>
      <span>SIDENAV</span>
      <h3 onClick={onBoardsClick} className={classes.sidenav_nav_item}>
        BOARDS
      </h3>
    </div>
  );
};

export default Sidenav;
