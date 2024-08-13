import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import createBookWithID from "../../utils/createBookID"
import { setError } from "./errorSlice"

const initialState = {
  books: [],
  isLoadingViaAPI: false,
}

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      thunkAPI.dispatch(setError(error.message))
      throw error
    }
  }
)

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload)
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      }
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, "API"))
      }
    })
  },
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = (state) => state.books.books

export default booksSlice.reducer
