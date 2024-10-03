// import { useQuery } from '@tanstack/react-query'
// import { useDatabase } from '../../Provider'
// import { listContactsQuery } from '../queries/listContactsQuery'
// import { ZurbanContact } from '../schema'
//
// export type UseContactsOptions<T> = {
//   select?: (contacts: ZurbanContact[]) => T
// }
//
// export const useContacts = <T = ZurbanContact[]>({
//   select = (contacts: ZurbanContact[]) => contacts as T,
// }: UseContactsOptions<T> = {}) => {
//   const db = useDatabase()
//   return useQuery<ZurbanContact[], void, T>(
//     ['contacts'],
//     () => {
//       return new Promise<ZurbanContact[]>((resolve, reject) =>
//         db.transaction(listContactsQuery(resolve), reject)
//       )
//     },
//     { select }
//   )
// }
