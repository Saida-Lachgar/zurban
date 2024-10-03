import { useQuery } from '@tanstack/react-query'
import { useDatabase } from '../../Provider'
import { fetchContactsFromBook } from '../lib/fetchContactsFromBook'

export const useBookContactsIds = (bookId?: number) => {
  const database = useDatabase()
  return useQuery(
    ['contacts', { bookId }],
    async () => fetchContactsFromBook(database, Number(bookId)),
    { enabled: typeof bookId === 'number' }
  )
}
