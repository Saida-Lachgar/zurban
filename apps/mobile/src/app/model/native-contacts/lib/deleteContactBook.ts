import { useDatabase } from '../../Provider'

export const deleteContactBook = (
  db: ReturnType<typeof useDatabase>,
  bookId: number,
  contactId: string
) => {
  return db.execute(
    `delete from book_contacts where book_id = ${bookId} and contact_id = ${contactId}`,
    [bookId, contactId],
  ).rowsAffected
}
