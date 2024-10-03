import { useDatabase } from '../../Provider'

/**
 * Fetch the contacts that exist in the database
 */

export const fetchAssoc = async (db: ReturnType<typeof useDatabase>) => {
  return db.execute(
    `select contact_id from contacts_groups`,
    [],
    // (_, { rows }) =>
    //   resolve(rows._array.map((c) => c.contact_id) as string[])
  ).rows._array.map((c) => c.contact_id) as string[]
}
