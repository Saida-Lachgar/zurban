import { QuickSQLiteConnection } from 'react-native-quick-sqlite'
// import { ZurbanContact } from '../schema'

export const contactDetailsQuery =
  (id: string) =>
  (db: QuickSQLiteConnection) =>
    db.execute(
      `select * from contacts where id = ?;`,
      [id],
    ).rows._array[0]
