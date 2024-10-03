// import { useQuery } from '@tanstack/react-query'
// import { useDatabase } from '../../Provider'
// import { listBookContactsQuery } from '../queries/listBookContactsQuery'

// // export const useBookContacts = (bookId?: number | string) => {
// //   const db = useDatabase()
// //   return useQuery<ZurbanContact[]>(
// //     ['contacts', 'book', bookId],
// //     () =>
// //       new Promise<ZurbanContact[]>((resolve, reject) =>
// //         db.transaction(listBookContactsQuery(+bookId!, resolve), reject)
// //       ),
// //     { enabled: !!bookId }
// //   )
// // }
