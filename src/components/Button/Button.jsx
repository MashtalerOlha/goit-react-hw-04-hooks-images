import s from './Button.module.css';

export const LoadMore = ({ onClick }) => {
  return (
    <div className={s.ButtonCard}>
      <button className={s.Button} type="button" onClick={onClick}>
        LoadMore
      </button>
    </div>
  );
};
