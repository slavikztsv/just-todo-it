interface IProps {
  id: string;
  name: string;
}

// const defaultProps: IProps = {
//   id: '',
//   name: ''
// }

const Board = (props: Partial<IProps>) => {
  return (
    <>
    <span>{`Board ${props.name}`}</span>
    </>
  )
};

export default Board;