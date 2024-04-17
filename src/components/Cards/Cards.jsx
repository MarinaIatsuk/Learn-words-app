import React, { useState } from "react";
import style from "./Cards.module.scss";

const Cards = ({ id, english, transcription, russian, addWord }) => {
    const [translation, setTranslation] = useState(false);
    const [isAdded,setIsAdded]=useState(false)//выставляем значение false(слово не добавлено в счетчик)

    function showTranslation() {
    setTranslation(!translation);
    if (!isAdded) {//если на слове стоит false, то:
        addWord() //перенесли сюда ф-цию добавления слова в счетчик
        setIsAdded(true)//поменяли флаг на true, таким образом счетчик на этом слове срабатывать уже не будет
    }
    }

  //прим для меня: в onClick нельзя поместить две функции отдельно, но можно одну функцию, в которой их две upd:уже убрала вторую ф-цию
    return (
    <React.Fragment>
        <div
        className={style.card}
        onClick={showTranslation}
        >
        <div className={style.card__word}>{english}</div>
        <div className={style.card__transcription}>{transcription}</div>
        {translation ? (
            <div className={style.card__translation}>{russian}</div>
        ) : (
            <div className={style.card__button}>
            Нажмите, чтобы проверить себя
            </div>
        )}
        </div>
    </React.Fragment>
    );
};

export default Cards;
