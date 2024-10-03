import { useDatabase } from '../../Provider'
import { insertBooksQuery } from '../queries/insertBooksQuery'
import { CreateBookInputType } from '../shema'

export const insertBook = async (
  db: ReturnType<typeof useDatabase>,
  payload: CreateBookInputType
) => insertBooksQuery(payload)(db)
