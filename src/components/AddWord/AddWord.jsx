import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewWord, getWordServer } from "../../store/slice/wordReduser";
import style from "./AddWord.module.scss";

export default function AddWord() {
  const dispatch = useDispatch();
  const [englishValue, setEnglishValue] = useState("");
  const [transcriptionValue, setTranscriptionValue] = useState("");
  const [russianValue, setRussianValue] = useState("");

  const isLatin = (text) => /^[a-zA-Z\s]+$/.test(text);
  const isCyrillic = (text) => /^[а-яА-Я\s]+$/.test(text);

  function sendWord() {
    if (
      englishValue.trim() === "" ||
      transcriptionValue.trim() === "" ||
      russianValue.trim() === ""
    ) {
      return;
    }
    if (!isLatin(englishValue)) {
      alert('в поле "Слово на английском" должны быть латинские буквы');
      return;
    }
    if (!isCyrillic(russianValue)) {
      alert('в поле "Слово на русском" должны быть буквы на кириллице');
      return;
    }

    dispatch(
      addNewWord({ englishValue, transcriptionValue, russianValue })
    ).then(() => {
      dispatch(getWordServer());
      setEnglishValue("");
      setTranscriptionValue("");
      setRussianValue("");
    });
  }

  return (
    <div className={style.table__add}>
      <input
        className={`${style.table__english} ${
          isLatin(englishValue) ? "" : style.invalid
        }`}
        value={englishValue}
        onChange={(e) => setEnglishValue(e.target.value)}
      />
      <input
        className={style.table__transcription}
        value={transcriptionValue}
        onChange={(e) => setTranscriptionValue(e.target.value)}
      />
      <input
        className={`${style.table__russian} ${
          isCyrillic(russianValue) ? "" : style.invalid
        }`}
        value={russianValue}
        onChange={(e) => setRussianValue(e.target.value)}
      />
      <div className={style.table__buttons}>
        <button onClick={sendWord}>Добавить слово</button>
      </div>
    </div>
  );
}
