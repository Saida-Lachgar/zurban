import { QuickSQLiteConnection } from 'react-native-quick-sqlite'
import { CreateBookInputType } from '../shema'

export const insertBooksQuery =
  (book: CreateBookInputType) =>
    (db: QuickSQLiteConnection) => {
      return db.execute(
        `insert into books (name, description, color)
         values (?, ?, ?);`,
        [book.name, book.description, book.color],
      ).insertId
    }
