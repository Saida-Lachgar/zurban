import { useDatabase } from '../../Provider'
import { bookDetailsQuery } from '../queries/bookDetailsQuery'
import { Book } from '../shema'

export const fetchBookDetails = (
  db: ReturnType<typeof useDatabase>,
  id: number
) => bookDetailsQuery(id)(db) as Book | null
