import { useDatabase } from '../../Provider'

export const getContactBooks = async (
  db: ReturnType<typeof useDatabase>,
  contactId: string
) => {
  return new Promise<number[]>((resolve, reject) => {
    return db.execute(
      `select group_id from contacts_groups where contact_id = ${contactId}`,
      [contactId],
    ).rows._array.map((e) => e.group_id)
  })
}
