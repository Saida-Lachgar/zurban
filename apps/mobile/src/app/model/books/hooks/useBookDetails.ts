import { useDatabase } from '../../Provider'
import { Book } from '../shema'
import { fetchBookDetails } from '../lib/fetchBookDetails'

export const useBookDetails = (bookId?: number) => {
  const db = useDatabase()
  return fetchBookDetails(db, bookId) as Book
}
