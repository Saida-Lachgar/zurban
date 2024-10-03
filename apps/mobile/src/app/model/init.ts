import { useCallback } from 'react'
import useBoolean from '../components/lib/useBoolean'
import useEffectOnce from '../components/lib/useEffectOnce'
import { db } from './db'

/**
  id: string
  contactType: ContactType
  name: string
  firstName?: string
  middleName?: string
  lastName?: string
  maidenName?: string
  namePrefix?: string
  nameSuffix?: string
  nickname?: string
  phoneticFirstName?: string
  phoneticMiddleName?: string
  phoneticLastName?: string
  company?: string
  jobTitle?: string
  department?: string
  note?: string
  imageAvailable?: boolean
  image?: Image
  rawImage?: Image
  birthday?: Date
  dates?: Date[]
  relationships?: Relationship[]
  emails?: Email[]
  phoneNumbers?: PhoneNumber[]
  addresses?: Address[]
  instantMessageAddresses?: InstantMessageAddress[]
  urlAddresses?: UrlAddress[]
  nonGregorianBirthday?: Date
  socialProfiles?: SocialProfile[]
*/

enum SQLiteType {
  'INTEGER' = 'INTEGER',
  'PRIMARY_KEY' = 'PRIMARY KEY',
  'NOT_NULL' = 'NOT NULL',
  'TEXT' = 'TEXT'
}

export interface Contact {
  id: string;
  native_id: number;
  name: string;
  type: string;
  phone_number: string;
  email: string;
  address: string;
  birthday: string;
  note: string;
  book_id: number;
  color: string;
}

export type ContactProperty = keyof Contact

type SQLSchema = { [key in ContactProperty]: SQLiteType[] }

const schema: SQLSchema = {
  id: [ SQLiteType.TEXT, SQLiteType.PRIMARY_KEY, SQLiteType.NOT_NULL ],
  native_id: [SQLiteType.INTEGER],
  name: [SQLiteType.TEXT],
  type: [SQLiteType.TEXT],
  phone_number: [SQLiteType.TEXT],
  email: [SQLiteType.TEXT],
  address: [SQLiteType.TEXT],
  birthday: [SQLiteType.TEXT],
  note: [SQLiteType.TEXT],
  book_id: [SQLiteType.INTEGER],
  color: [SQLiteType.TEXT],
}

function createTableQuery(table: string, schema: SQLSchema) {
  const string = Object.entries(schema)
    .map(([property, types]) => `${property} ${types.join(' ')}`)
    .join(',')

  return `create table if not exists ${table} (${string})`
}

export type ContactsBooks = {
  id: number
  contact_id: number
  book_id: number
}

export function useInitDatabase() {
  const ready = useBoolean(false)

  const init = useCallback(async () => {
    console.log(
      'Initializing database. This should only happen once per app install.'
    )

    try {
      db.transaction(
        (tx) => {
          tx.execute(
            `create table if not exists
                books (
                  id integer primary key not null,
                  name text not null,
                  description text,
                  color text,
                  count integer default 0
                );
            create index if not exists books_index on books (name);
            `
          )
          tx.execute(
            `create table if not exists
                profile_cards (
                  id integer primary key not null,
                  name text not null,
                  description text,
                  color text,
                  data text default '{}'
                );
            `
          )

          tx.execute(createTableQuery('contacts', schema))

          tx.execute(
            `create table if not exists
                contacts_groups (
                  id integer primary key not null,
                  contact_id text not null,
                  group_id integer not null
                );`
          )

          return ready.setTrue()
        },
      )
    } catch (e) {
      return ready.setFalse()
    }
  }, [])

  useEffectOnce(() => {
    init()
  })

  return {
    db,
    ready: ready.value,
  }
}
