import { useMutation } from '@tanstack/react-query'
import { useDatabase } from '../../Provider'
import { deleteContactBook } from '../lib/deleteContactBook'

export type DeleteContactBookPayload = {
  bookId: number
  contactId: string
}

export type UseDeleteContactBookOptions = {
  onSuccess?: () => void
  onError?: () => void
}

export const useDeleteContactbook = (options: UseDeleteContactBookOptions) => {
  const db = useDatabase()
  return useMutation(
    ['contacts', 'books', 'delete'],
    (payload: DeleteContactBookPayload) =>
      deleteContactBook(db, payload.bookId, payload.contactId),
    options
  )
}
