import { useDatabase } from '../../Provider'

export const fetchContactsNativeIds = (db: ReturnType<typeof useDatabase>) => {
  return db.execute(
    `select native_id from contacts`,
    [],
  ).rows._array.map((c) => c.native_id.replace('native-', ''))
}
