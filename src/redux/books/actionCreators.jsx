import * as actionsTypes from './actionsTypes'

export const addBook = (newBook) => {
    return {
        type: actionsTypes.ADD_BOOK,
        payload: newBook
    }
    
}