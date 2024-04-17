import { configureStore } from "@reduxjs/toolkit";
import wordReduser from "./slice/wordReduser";

export const store = configureStore({
reducer:{
    word:wordReduser
}
})