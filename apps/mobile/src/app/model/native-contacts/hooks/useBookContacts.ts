import { DEFAULT_BOOK_ID } from '../../../constants/ids'
import { useBookContactsIds } from './useBookContactsIds'
import { useContacts } from './useContacts'

export const useBookContacts = (bookId?: number) => {
  return useContacts({book_id: bookId})
}
