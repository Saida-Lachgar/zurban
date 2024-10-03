// import { useQuery } from '@tanstack/react-query'
// import { useDatabase } from '../../Provider'
// import { ZurbanContact } from '../schema'
// import { contactDetailsQuery } from '../queries/contactDetailsQuery'

// export const useContactDetails = (contactId?: number | string) => {
//   const db = useDatabase()
//   return useQuery<ZurbanContact>(
//     ['contacts', 'details', contactId],
//     () =>
//       new Promise<ZurbanContact>((resolve, reject) =>
//         db.transaction(contactDetailsQuery(+contactId!, resolve), reject)
//       ),
//     { enabled: !!contactId }
//   )
// }
