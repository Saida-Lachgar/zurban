import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Contacts from 'react-native-contacts'

export const useNeedsContactsPermissions = () => {
  return useQuery(['permissions', 'contacts'], async () => {
    const status = await Contacts.requestPermission()
    return status !== 'authorized'
  })
}

export const useRequestContactsPermissions = () => {
  const client = useQueryClient()
  return useMutation(
    ['permissions', 'contacts'],
    async () => {
      const status = await Contacts.requestPermission()
      if (status === 'authorized') return true
      throw new Error('Permission not granted')
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['permissions', 'contacts'])
      },
    }
  )
}
