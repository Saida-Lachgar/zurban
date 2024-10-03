import { useQuery } from '@tanstack/react-query'
import { useDatabase } from '../../Provider'
import { countBookContacts } from '../lib/countBookContacts'

export const useCountBookContacts = (bookId?: number) => {
  const db = useDatabase()
  return useQuery(['books', bookId, 'contacts', 'count'], () => {
    return countBookContacts(db, bookId!)
  })
}
