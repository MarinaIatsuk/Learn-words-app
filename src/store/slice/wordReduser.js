import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getWordServer = createAsyncThunk(
  "getWordServer", async () => {
  try {
    //const response = await fetch("https://itgirlschool.justmakeit.ru/api/words");
    const response = await fetch("/api/words", {
      headers: {
        "X-Forwarded-Host": "itgirlschool.justmakeit.ru"
      }
    });
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addNewWord = createAsyncThunk(
  "addNewWord",
  async ({ englishValue, transcriptionValue, russianValue }, { dispatch }) => {
    const newWord = {
      english: englishValue,
      transcription: `[${transcriptionValue}]`,
      russian: russianValue,
    };

    try {
      const response = await fetch(`/api/words/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      });

      if (!response.ok) {
        throw new Error("Ошибка сервера");
      }
      const data = await response.json();
      console.log("Данные с сервера:", data);
      dispatch(addWord(data));
    } catch (error) {
      console.error("Ошибка при добавлении слова:", error);
      throw error;
    }
  }
);

export const deleteWord = createAsyncThunk(
  "deleteWord",
  async (id, { dispatch }) => {
    try {
      const response = await fetch(`api/words/${id}/delete`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Ошибка сервера");
      }

      dispatch(removeWord(id));
    } catch (error) {
      console.error("Ошибка при удалении слова:", error);
      throw error;
    }
  }
);

export const updateWord = createAsyncThunk(
  "updateWord",
  async (
    { id, englishValue, transcriptionValue, russianValue },
    { dispatch }
  ) => {
    const updatedWord = {
      id: id,
      english: englishValue,
      transcription: transcriptionValue,
      russian: russianValue,
      tags: "",
      tags_json: "",
    };
    console.log(updatedWord);

    try {
      const response = await fetch(`/api/words/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWord),
      });

      if (!response.ok) {
        throw new Error("Ошибка сервера");
      }
      const data = await response.json();
      console.log("Данные с сервера:", data);

      dispatch(updateWordSuccess(data));
      return data;
    } catch (error) {
      console.error("Ошибка при обновлении слова:", error);
      throw error;
    }
  }
);

const wordSlice = createSlice({
  name: "word",
  initialState: {
    words: [],
    isLoading: false,
    data: null,
    error: false,
  },
  reducers: {
    donloadWords(state, action) {
      state.words.push(action.payload);
    },
    addWord(state, action) {
      state.words.push(action.payload);
    },
    removeWord(state, action) {
      state.words.filter((item) => item.id !== action.payload.id);
    },
    updateWordSuccess(state, action) {
      const index = state.words.findIndex(
        (word) => word.id === action.payload.id
      );
      if (index !== -1) {
        state.words[index] = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getWordServer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWordServer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getWordServer.rejected, (state) => {
      state.error = true;
    });
  },
});
export const { donloadWords, addWord, removeWord, updateWordSuccess } =
  wordSlice.actions;
export default wordSlice.reducer;
