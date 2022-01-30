import classes from './Footer.module.scss';

interface IProps {

}

const Footer = (props: IProps) => {
  return (
    <div className={classes.footer}>
      <span>FOOTER</span>
    </div>
  )
};

export default Footer;