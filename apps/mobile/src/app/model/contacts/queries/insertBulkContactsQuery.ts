import { Contact } from 'react-native-contacts'
import { QuickSQLiteConnection } from 'react-native-quick-sqlite'
import { randomBookColor } from '../../../components/ui/colors'

export const insertBulkContactsQuery =
  (contacts: Contact[]) =>
    async (db: QuickSQLiteConnection) => {
      const placeholders = contacts
        .map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
        .join(',')

      const values = contacts.flatMap((contact, index) => [
        index.toString(),
        `native-${contact.recordID}`,
        contact.displayName,
        contact.company ? 'company' : 'person',
        contact.phoneNumbers[0]?.number ?? null,
        contact.emailAddresses[0]?.email ?? null,
        contact.postalAddresses[0]?.street ?? null,
        contact.birthday?.day,
        contact.note ?? null,
        1,
        randomBookColor(),
      ])

      db.execute(
        `insert into contacts (id, native_id, name, type, phone_number, email, address, birthday, note, book_id, color)
         values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        values,
      )
}
