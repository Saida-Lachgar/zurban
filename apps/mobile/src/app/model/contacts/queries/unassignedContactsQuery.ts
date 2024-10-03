// import { SQLTransaction } from 'expo-sqlite'
// import { ZurbanContact } from '../schema'

// export const unassignedContactsQuery =
//   (resolve: (t: ZurbanContact[]) => void) => (tx: SQLTransaction) =>
//     tx.executeSql(
//       `select * from contacts where book_id is 1;`,
//       [],
//       (_, { rows: { _array } }) => resolve(_array as ZurbanContact[])
//     )
