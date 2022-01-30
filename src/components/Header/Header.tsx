import classes from './Header.module.scss';

interface IProps {

}

const Header = (props: IProps) => {
  return (
    <div className={classes.header}>
      <span>HEADER</span>
    </div>
  )
};

export default Header;