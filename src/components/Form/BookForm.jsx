import { useState } from "react"
import { addBook, fetchBook } from "../../redux/slices/bookSlice"
import { useDispatch } from "react-redux"
import createBookWithID from "../../utils/createBookID"
import booksData from "../../data/books.json"
import "./BookForm.css"

const BookForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const dispatch = useDispatch()

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]

    dispatch(addBook(createBookWithID(randomBook, "random")))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author }, "manual")))
      setAuthor("")
      setTitle("")
    }
  }


  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook())
  }

  return (
    <div className="app-block book-form">
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add book</button>
        <button
          type="button"
          onClick={handleAddRandomBook}
        >
          Add random book
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
        >
          Add Random via API
        </button>
      </form>
    </div>
  )
}

export default BookForm
