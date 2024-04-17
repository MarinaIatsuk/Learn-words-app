import React, { useState, useEffect } from "react";
import style from "./Line.module.scss";
import { useDispatch } from "react-redux";
import { deleteWord, getWordServer,updateWord } from "../../store/slice/wordReduser";

const Line = ({ id, english, transcription, russian, saveChanges }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEnglish, setEditedEnglish] = useState(english);
  const [editedTranscription, setEditedTranscription] = useState(transcription);
  const [editedRussian, setEditedRussian] = useState(russian);
  const dispatch = useDispatch();

  //Обработчик для нажания на кнопку редактирования. Переводит состояние редактирования в true
  const editLine = () => {
    setIsEditing(true);
  };

  //Обработчик для нажания на кнопку отмены редактирования.  Возвоащает состояние редактирования в false
  const cancelEdit = () => {
    setIsEditing(false);
    setEditedEnglish(english);
    setEditedTranscription(transcription);
    setEditedRussian(russian);
  };

  //Слушатель на кнопку сохранения
  const saveEdit = () => {
    //проверка полей перед сохранением (не знаю, на какие ошибки проверять)
    //trim() удаляет пробельные символы с начала и конца строки
    if (
      editedEnglish.trim() === "" ||
      editedTranscription.trim() === "" ||
      editedRussian.trim() === ""
    ) {
      alert("Пожалуйста, заполните все поля перед сохранением.");
      return;
    }
    setIsEditing(false);
    updateWordOnServer()
  };

  function deleteLine() {
    dispatch(deleteWord(id))
    .then(() => {
      dispatch(getWordServer());
    });
  }
  const updateWordOnServer = async () => {
    try {
      await dispatch(updateWord({ 
        id: id,
        englishValue: editedEnglish,
        transcriptionValue: editedTranscription,
        russianValue: editedRussian 
      }));
      dispatch(getWordServer()); // После успешного обновления слова загрузить обновленные данные
    } catch (error) {
      console.error("Ошибка при обновлении слова:", error);
      // Обработка ошибок при обновлении слова
    }
  };
  
  return (
    <div className={style.table__line}>
      {isEditing ? (
        //если поле находится в режиме редактирования(пользователь нажал на кнопку и  setIsEditing перешло в true), то отрисовываем инпуты вместо слов
        <>
          <input
            className={style.table__english}
            value={editedEnglish}
            onChange={(e) => setEditedEnglish(e.target.value)}
          />
          <input
            className={style.table__transcription}
            value={editedTranscription}
            onChange={(e) => setEditedTranscription(e.target.value)}
          />
          <input
            className={style.table__russian}
            value={editedRussian}
            onChange={(e) => setEditedRussian(e.target.value)}
          />
          <div className={style.table__buttons}>
            <button onClick={saveEdit}>Сохранить</button>
            <button onClick={cancelEdit}>Отменить</button>
          </div>
        </>
      ) : (
        <>
          <div className={style.table__english}>{english}</div>
          <div className={style.table__transcription}>{transcription}</div>
          <div className={style.table__russian}>{russian}</div>
          <div className={style.table__buttons}>
            <button onClick={editLine}>Редактировать</button>/
            <button onClick={deleteLine}>Удалить</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Line;
