import React, { useState } from "react";
import style from "./Cards.module.scss";

const Cards = ({ id, english, transcription, russian, addWord }) => {
    const [translation, setTranslation] = useState(false);
    const [isAdded,setIsAdded]=useState(false)

    function showTranslation() {
    setTranslation(!translation);
    if (!isAdded) {
        addWord() 
        setIsAdded(true)
    }
    }

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
