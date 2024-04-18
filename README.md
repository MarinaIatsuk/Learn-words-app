# Приложение для изучения слов

## Функции приложения

Данное приложение по изучению слов было разработано в рамках проектной работы.

✨Основная функциональность:

- Отображение списка слов, записанных пользователем;
- Возможность редактирования/удаление/добавления слова;
- Изчучение слов по карточкам.

## Подробное описание проекта

<img src="https://img.shields.io/badge/javascript-323330?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript"/>  <img src="https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge" alt="ReactJs"/> <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="redux-toolkit"/>
 <img src="https://img.shields.io/badge/sass-CF649A?style=for-the-badge&logo=Sass&logoColor=white" alt="SASS"/> 
<img src="https://img.shields.io/badge/vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white" alt="Vite"/>

Загрузка/изменение/добавлени/удаление слов реализованы через API

**установка:**
```sh
npm install
npm run dev
```

### Header

Header содержит:
Лого (при нажатии пользователь попадает на домашнюю страницу), ссылки на домашнюю страницу и страницу с игрой (обучение по карточкам)

### Home page

На домашней странице находится таблица с изучаемыми словами

- Первая строчка представляет собой поле для добавления нового слова. Реализована проверка на корректность вводимых пользоватем слов;

- Строчки со словами, где в каждой строчке есть возможность удаления и редактирования слова.


### Game page

На этой странице пользователь видит карточки из таблицы со словами без перевода. 

При нажатии на карточку, открывается перевод слова и оно добавляется в счетчик изученных слов за "сессию".
 
Переключение карточек осуществляется по стрелочкам.

