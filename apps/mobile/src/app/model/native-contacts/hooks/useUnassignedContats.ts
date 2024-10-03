import { useContacts } from './useContacts'
import { useContactsAsoc } from './useContactsAsoc'

export type UseUnassignedContactsOptions = {
  query?: Parameters<typeof useContacts>[0]['query']
  select?: Parameters<typeof useContacts>[0]['select']
}

export const useUnassignedContacts = ({
  query,
  select,
}: UseUnassignedContactsOptions = {}) => {
  const asocs = useContactsAsoc()

  return [];

  // return useContacts({
  //   all: true,
  //   queryKey: ['unassigned'],
  //   enabled: asocs.isSuccess,
  //   query,
  //   select: (contacts) => {
  //     // only contacts that are not in the assoc
  //     // Not ideal but it will do for now
  //     const res = contacts.filter((c) => !asocs.data?.includes(c.id))
  //     return select?.(res) ?? res
  //   },
  // })
}
