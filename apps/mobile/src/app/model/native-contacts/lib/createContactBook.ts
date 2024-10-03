import { useDatabase } from '../../Provider'

export const createContactsGroups = (
  db: ReturnType<typeof useDatabase>,
  bookId: number,
  contactIds: string[]
) => {
  const placeholders = contactIds.map(() => '(?, ?)').join(',')
  const values = contactIds.flatMap((contactId) => [bookId, contactId])
  return db.execute(
    `insert into contacts_groups (group_id, contact_id)
     values ${placeholders}`,
    values,
  ).rowsAffected
}
