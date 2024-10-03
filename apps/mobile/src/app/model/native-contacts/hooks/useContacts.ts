import { useQuery } from '@tanstack/react-query'
import Contacts from 'react-native-contacts'
import { listBookContactsQuery } from "../../contacts/queries/listBookContactsQuery";
import { Contact } from "../../init";

/**
 * NOTE:
 *  By default the contact API does not support
 * querying a list of contacts by their ids.
 * A temporary workaround is to query all contacts
 * and then filter them by their ids.
 *
 * TODO: refacto
 */

export type UseContactsOptions<T = Contacts.Contact[]> = {
  queryKey: (string | number | undefined | null)[]
  query?: { ids: Contacts.Contact['recordID'][] },
  select?: (data: Contacts.Contact[]) => T
  enabled?: boolean
  all?: boolean
}

export const useContacts = (fields: Partial<Contact>) => {
  return listBookContactsQuery(fields)
}
