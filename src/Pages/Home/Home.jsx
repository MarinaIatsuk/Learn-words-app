import style from "./Home.module.scss";
import AddWord from "../../components/AddWord/AddWord";
import Line from "../../components/Line/Line";
import { useDispatch, useSelector } from "react-redux";
import { getWordServer } from "../../store/slice/wordReduser";
import React, { useEffect } from "react";

const Home = () => {
  const data = useSelector((state) => state.word);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWordServer());
  }, []);


  return (
    <>
      <div className={style.table}>
        <div className={style.table__head}>
          <div className={style.table__english}>Слово на английском</div>
          <div className={style.table__transcription}>Транскрипция</div>
          <div className={style.table__russian}>Слово на русском</div>
          <div className={style.table__buttons}></div>
        </div>

        <AddWord />

        {data.data && //отображаем данные только в том случае, когда они загрузились с апи, чтобы не пыталось отрисоваться без данных
          data.data.map((item) => (
            <Line
              key={item.id}
              id={item.id}
              english={item.english}
              transcription={item.transcription}
              russian={item.russian}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
