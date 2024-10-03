import { QuickSQLiteConnection } from 'react-native-quick-sqlite'

export const deleteBookQuery =
  (id: number) => (db: QuickSQLiteConnection) => {
    return db.execute(`delete
                from books
                where id = ${id};`, [id])
  }
