import * as Contacts from 'react-native-contacts'
import { useDatabase } from '../../Provider'
import { insertBulkContactsQuery } from '../queries/insertBulkContactsQuery'
import { fetchContactsNativeIds } from './fetchContactsNativeIds'

export const syncContacts = async (db: ReturnType<typeof useDatabase>) => {
  const nativeContacts = await Contacts.getAll()
  // const existingContactsNativeIds = fetchContactsNativeIds(db)
  // const contactsToIndex = nativeContacts.filter(
  //   (c) => !existingContactsNativeIds.includes(c.recordID)
  // )

  console.log('nativeContacts', nativeContacts)

  return insertBulkContactsQuery(nativeContacts)(db)
}
