import { useMutation, useQueryClient } from '@tanstack/react-query'
import Contacts from 'react-native-contacts'

export const useEditContact = () => {
  const client = useQueryClient()

  return useMutation(
    ['editContact'],
    async ({ contactId }: { contactId: string }) => {
      return Contacts.updateContact({ recordID: contactId })
    },
    {
      onSuccess: (_, { contactId }) => {
        client.invalidateQueries(['contacts', contactId])
      },
    }
  )
}
