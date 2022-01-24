import classes from "./Test.module.scss";

interface IProps {
  name: string;
  title: string;
  count: number;
}

export const Test = (props: IProps) => {
  return (
    <>
      <div className={classes.test_title}>
        <h1>{`this is: ${props.title}`}</h1>
        <div className={classes.test_title_count}>
          <h2>{`count: ${props.count}`}</h2>
          <div className={classes.test_title_count_name}>
            <h3>{`name: ${props.name}`}</h3>
          </div>
        </div>
      </div>
    </>
  );
};
