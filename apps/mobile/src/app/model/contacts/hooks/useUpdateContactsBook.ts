// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { changeBookQuery } from '../queries/changeBookQuery'
// import { useDatabase } from '../../Provider'

// export const useUpdateContactsBook = () => {
//   const client = useQueryClient()
//   const db = useDatabase()
//   return useMutation(
//     ['contacts', 'update', 'book'],
//     ([bookId, contactIds]: [number, number[]]) =>
//       new Promise<void>((resolve, reject) =>
//         db.transaction(changeBookQuery(bookId, contactIds, resolve), reject)
//       ),
//     {
//       onSuccess: () => {
//         client.invalidateQueries(['contacts'])
//         client.invalidateQueries(['contacts', 'books'])
//         client.invalidateQueries(['books'])
//       },
//     }
//   )
// }
