import * as actionsTypes from './actionsTypes'

export const addBook = (newBook) => {
    return {
        type: actionsTypes.ADD_BOOK,
        payload: newBook
    } 
}

export const deleteBook = (id) => {
    return {
        type: actionsTypes.DELETE_BOOK,
        payload: id
    }  
}