import classes from './Sidenav.module.scss';


interface IProps {

}

const Sidenav = (props: IProps) => {
  return (
    <div className={classes.sidenav}>
      <span>SIDENAV</span>
    </div>
  )
};

export default Sidenav;