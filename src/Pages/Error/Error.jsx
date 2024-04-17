import style from "./Error.module.scss";
import img from "../../images/404-error.png";

export default function Error() {
  return (
    <div className={style.error}>
      <h1 className={style.error__title}>Такой страницы не существует</h1>
      <img src={img} alt="cat" className={style.error__image} />
    </div>
  );
}
