import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDatabase } from '../../Provider'
import { createContactsGroups } from '../lib/createContactBook'

export const useAddContactToBook = () => {
  const db = useDatabase()
  const client = useQueryClient()

  return useMutation(
    ['addContactToBook'],
    async ({
      bookId,
      contactIds,
    }: {
      bookId: number
      contactIds: string[]
    }) => {
      return createContactsGroups(db, bookId, contactIds)
    },
    {
      onSuccess: (_, { bookId }) => {
        client.invalidateQueries(['books', bookId, 'contacts', 'count'])
      },
    }
  )
}
