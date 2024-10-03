import { QuickSQLiteConnection } from 'react-native-quick-sqlite'

export const changeBookQuery =
  (bookId: number, contactIds: number[]) =>
    (db: QuickSQLiteConnection) => {
      db.execute(
        `update contacts
         set book_id = ${bookId}
         where id in (${contactIds.join(',')});`,
        [bookId],
      )
    }
