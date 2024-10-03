import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QuickSQLiteConnection, Transaction } from 'react-native-quick-sqlite'
import { palette, randomBookColor } from '../components/ui/colors'
import { useDatabase } from './Provider'

export type CreateProfileCardInputType = {
  id?: number
  name: string
  description: string
  color: string
  data: object | string
}

export type ProfileCard = {
  id: number
  name: string
  description: string
  color: keyof typeof palette
  data: object
}

export const listProfileCardsQuery =
  () => (db: QuickSQLiteConnection) =>
    db.execute(
      `select *
       from profile_cards;`,
      [],
    ).rows._array as ProfileCard[]

export const insertProfileCardQuery =
  (book: CreateProfileCardInputType) =>
    (db: QuickSQLiteConnection | Transaction) => {
      return db.execute(
        `insert into profile_cards (name, description, color, data)
         values (?, ?, ?, ?);`,
        [book.name, book.description, book.color],
      ).insertId
    }

export const deleteProfileCardQuery =
  (id: number) => (db: QuickSQLiteConnection | Transaction) => {
    return db.execute(`delete
                       from profile_cards
                       where id = ${id};`, [id])
  }

export const profileCardDetailsQuery =
  (id: number) =>
    (db: QuickSQLiteConnection | Transaction) =>
      db.execute(
        `select *
         from profile_cards
         where id = ?;`,
        [id],
      ).rows._array[0] as ProfileCard | null

export const useDeleteProfileCard = () => {
  const db = useDatabase()
  const client = useQueryClient()
  return useMutation(
    ['profileCard', 'delete'],
    (id: number) =>
      db.transaction((tx) => {
        deleteProfileCardQuery(id)(db)
      }),
    {
      onSuccess: () => {
        client.invalidateQueries(['books'])
      },
    }
  )
}

export const useInsertProfileCard = () => {
  const db = useDatabase()
  const client = useQueryClient()

  return useMutation(
    ['profileCards', 'insert'],
    (card: CreateProfileCardInputType) => {
      return db.transaction(
        (tx) => {
          insertProfileCardQuery(
            {...card, data: JSON.stringify(card.data)}
          )(tx)
        }
      )
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['profileCards'])
      },
    }
  )
}

export const fetchProfileCardDetails = async (
  db: ReturnType<typeof useDatabase>,
  id: number
) => {
  await db.transaction((tx) => {
    profileCardDetailsQuery(id)(tx)
  })
}

export const useProfileCardDetails = (id: number) => {
  const db = useDatabase()
  return useQuery<ProfileCard | null>(['profileCards', id], () =>
    profileCardDetailsQuery(id)(db)
  )
}

export const useInsertDefaultProfileCard = () => {
  const db = useDatabase()
  const client = useQueryClient()
  const {mutateAsync: insert} = useInsertProfileCard()

  return useMutation(
    async () => {
      const existingProfileCard = await fetchProfileCardDetails(db, 1)

      if (existingProfileCard !== null) {
        console.log('Default profile card already exists', existingProfileCard)
        return 0
      }
      console.log('Inserting default profile card')
      return insert({
        id: 0,
        name: 'Default',
        description: 'This is my personal profile card.',
        color: randomBookColor(),
        data: {},
      })
    },
    {onSuccess: () => client.invalidateQueries(['profileCards'])}
  )
}

export const useProfileCards = () => {
  const db = useDatabase()
  return useQuery<ProfileCard[]>(['profileCards'], () => {
    return new Promise<ProfileCard[]>(() =>
      listProfileCardsQuery()(db)
    )
  })
}
