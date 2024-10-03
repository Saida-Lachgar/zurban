import { useDatabase } from '../../Provider'
import { Book } from "../../books/shema";

export const countBookContacts = (
  db: ReturnType<typeof useDatabase>,
  bookId: number
) => {
  return db.execute(
    `select count(*) as count from contacts_groups where group_id = ${bookId}`,
    [bookId],
  ).rows._array[0].count as Book['count']
}
