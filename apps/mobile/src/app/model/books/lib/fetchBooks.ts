import { useDatabase } from '../../Provider'
import { listBooksQuery } from '../queries/listBooksQuery'

export const fetchBooks = async (db: ReturnType<typeof useDatabase>) => listBooksQuery()(db)
