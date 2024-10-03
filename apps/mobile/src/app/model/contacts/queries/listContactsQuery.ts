import { QuickSQLiteConnection } from 'react-native-quick-sqlite'
// import { ZurbanContact } from '../schema'

export const listContactsQuery =
  () => (db: QuickSQLiteConnection) =>
    db.execute(`select * from contacts;`, []).rows._array
