import { QuickSQLiteConnection } from 'react-native-quick-sqlite'
import { Book } from '../shema'

export const listBooksQuery =
  () => (db: QuickSQLiteConnection) =>
    db.execute(`select * from books`, []).rows._array as Book[]
