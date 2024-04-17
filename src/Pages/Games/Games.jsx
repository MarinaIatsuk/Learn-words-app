import Cards from "../../components/Cards/Cards";
import React, { useState, useEffect } from "react";
import style from "./Games.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getWordServer } from "../../store/slice/wordReduser";

export default function Games() {
  const data = useSelector((state) => state.word);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWordServer());
  }, []);

  console.log(data);

  const [currentIndex, setCurrentIndex] = useState(0); 
  function goToPreviousCard() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function goToNextCard() {
    if (data.data && currentIndex < data.data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  const [learnedWords, setCount] = useState(0);
  const addWord = () => {
    setCount(learnedWords + 1);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.cards}>
        <button onClick={goToPreviousCard} className={style.cards__button}>
          ←
        </button>
        {data.data && data.data[currentIndex] && (
          <Cards
            key={data.data[currentIndex].id}
            english={data.data[currentIndex].english}
            transcription={data.data[currentIndex].transcription}
            russian={data.data[currentIndex].russian}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            addWord={() => addWord()}
          />
        )}
        <button onClick={goToNextCard} className={style.cards__button}>
          →
        </button>
      </div>
      <div className={style.cards__counter}>Изучено {learnedWords} слов </div>
    </div>
  );
}
