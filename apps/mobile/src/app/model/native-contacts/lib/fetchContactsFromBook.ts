import { useDatabase } from '../../Provider'

export const fetchContactsFromBook = (
  db: ReturnType<typeof useDatabase>,
  bookId: number
) => {
  return db.execute(
    `select contact_id
       from contacts_groups
       where group_id = ${bookId}`,
    [bookId],
  ).rows._array.map((c) => c.contact_id) as string[]
}
