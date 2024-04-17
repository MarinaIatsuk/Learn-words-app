import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewWord, getWordServer } from '../../store/slice/wordReduser';
import style from "./AddWord.module.scss";

export default function AddWord() {
  const dispatch = useDispatch();
  const [englishValue, setEnglishValue] = useState('');
  const [transcriptionValue, setTranscriptionValue] = useState('');
  const [russianValue, setRussianValue] = useState('');

  const isLatin = (text) => /^[a-zA-Z\s]+$/.test(text);
  const isCyrillic = (text) => /^[а-яА-Я\s]+$/.test(text);

  function sendWord() {
    if (
      englishValue.trim() === "" ||
      transcriptionValue.trim() === "" ||
      russianValue.trim() === ""
    ) {
      // Если какое-то из полей пустое, не отправляем слово
      return;
    }
    if (!isLatin(englishValue)) {
      // Если в полях не только латинские буквы, не отправляем слово
    alert('в поле "Слово на английском" должны быть латинские буквы')
      return;
    }
    if (!isCyrillic(russianValue)) {
      // Если в поле с русским словом не только кириллица, не отправляем слово
      alert('в поле "Слово на русском" должны быть буквы на кириллице')
      return;
    }

    // Отправляем слово
    dispatch(addNewWord({ englishValue, transcriptionValue, russianValue }))
      .then(() => {
        // После успешной отправки обновляем список слов
        dispatch(getWordServer());
        // Очищаем поля ввода
        setEnglishValue('');
        setTranscriptionValue('');
        setRussianValue('');
      });
  }

  return (
    <div className={style.table__add}>
      <input
        className={`${style.table__english} ${isLatin(englishValue) ? '' : style.invalid}`}
        value={englishValue}
        onChange={(e) => setEnglishValue(e.target.value)}
      />
      <input
        className={style.table__transcription} 
        value={transcriptionValue}
        onChange={(e) => setTranscriptionValue(e.target.value)}
      />
      <input
        className={`${style.table__russian} ${isCyrillic(russianValue) ? '' : style.invalid}`}
        value={russianValue}
        onChange={(e) => setRussianValue(e.target.value)}
      />
      <div className={style.table__buttons}>
        <button onClick={sendWord}>Добавить слово</button>
      </div>
    </div>
  );
}
