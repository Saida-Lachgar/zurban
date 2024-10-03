import { QuickSQLiteConnection } from 'react-native-quick-sqlite'
import { Book } from '../shema'

export const bookDetailsQuery =
  (bookId: number) => (db: QuickSQLiteConnection) =>
    db.execute(
      `select *
       from books
       where id = ${bookId}`,
      [bookId],
    ).rows._array[0] ?? null as Book | null
