import { useDatabase } from '../../Provider'
import { insertBooksQuery } from '../queries/insertBooksQuery'
import { CreateBookInputType } from '../shema'

export const useInsertBook = (book: CreateBookInputType) => {
  const db = useDatabase()
  return insertBooksQuery(book)(db);
}
