import { useQuery } from '@tanstack/react-query'
import { Book } from '../../books/shema'
import { useDatabase } from '../../Provider'
import { getContactBooks } from '../lib/getContactBooks'

export const useContactBooksIds = (contactId?: string) => {
  const db = useDatabase()

  return useQuery<number[]>(
    ['contacts', contactId, 'books'],
    () => {
      const result = getContactBooks(db, contactId!)
      console.log({ result })
      return result
    },
    { enabled: !!contactId }
  )
}
