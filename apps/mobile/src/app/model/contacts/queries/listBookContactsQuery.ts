import { QuickSQLiteConnection } from 'react-native-quick-sqlite'
import { Contact } from "../../init";
import { db } from "../../db";

// import { ZurbanContact } from '../schema'

export function createSelectQuery<T>(table: string, fields: Partial<T>) {
  const searchCondition = Object.entries(fields).map(([k, v]) => `${k} = ${v};`).join(' AND ')

  console.log("HELLO", `SELECT *
          FROM ${table}
          WHERE ${searchCondition};`)

  return `SELECT *
          FROM ${table}
          WHERE ${searchCondition};`
}

export const listBookContactsQuery =
  (fields: Partial<Contact>) =>
    db.execute(
      createSelectQuery<Contact>('contacts', fields),
    ).rows._array as Contact[]
