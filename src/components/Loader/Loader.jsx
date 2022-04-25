import { Triangle } from 'react-loader-spinner';

export const Spiner = () => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    aligniitems: 'center',
  };
  return (
    <div style={style}>
      <Triangle color="#00BFFF" height={100} width={100} />
    </div>
  );
};
