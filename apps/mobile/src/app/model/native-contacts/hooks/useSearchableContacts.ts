import { useContacts } from './useContacts'

export const useSearchableContacts = (search: string) => {
  return [];

  // return useContacts({
  //   all: true,
  //   queryKey: ['search', search],
  //   select: (contacts) => {
  //     return contacts.filter((contact) => {
  //       const name = contact.displayName ?? ''
  //       const lowerSearch = search.toLowerCase()
  //       const lowerName = name.toLowerCase()
  //       return lowerName.includes(lowerSearch)
  //     })
  //   },
  // })
}
