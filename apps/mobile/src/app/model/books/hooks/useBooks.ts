import { useQuery } from '@tanstack/react-query'
import { useDatabase } from '../../Provider'
import { listBooksQuery } from '../queries/listBooksQuery'
import { Book } from '../shema'

export type UseBooksOptions<T> = {
  select?: (data: Book[]) => T
}

export const useBooks = <T = Book[]>({
  select = (data: Book[]) => data as unknown as T,
}: UseBooksOptions<T> = {}) => {
  const db = useDatabase()

  return useQuery<Book[], void, T>(
    ['books'],
    () => {
      return listBooksQuery()(db)
    },
    { select }
  )
}
