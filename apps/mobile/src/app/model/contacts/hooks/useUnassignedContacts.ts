// import { useQuery } from '@tanstack/react-query'
// import { useDatabase } from '../../Provider'
// import { unassignedContactsQuery } from '../queries/unassignedContactsQuery'
// import { ZurbanContact } from '../schema'

// export const useUnassignedContacts = () => {
//   const db = useDatabase()
//   return useQuery<ZurbanContact[]>(
//     ['contacts', 'unassigned'],
//     () =>
//       new Promise<ZurbanContact[]>((resolve, reject) =>
//         db.transaction(unassignedContactsQuery(resolve), reject)
//       )
//   )
// }
