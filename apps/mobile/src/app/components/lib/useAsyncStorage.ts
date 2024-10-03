import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAsyncStorageValue = <T>(key: string) => {
  return useQuery<T>(['async-storage', key], async () => {
    const value = await AsyncStorage.getItem(key)
    return value ? JSON.parse(value) : null
  })
}

export const useAsyncStorageSetValue = (key: string) => {
  const client = useQueryClient()
  return useMutation(
    (value: string) => AsyncStorage.setItem(key, JSON.stringify(value)),
    { onSuccess: () => client.invalidateQueries(['async-storage', key]) }
  )
}

export const useAsyncStorageRemoveValue = (key: string) => {
  const client = useQueryClient()
  return useMutation<void>(() => AsyncStorage.removeItem(key), {
    onSuccess: () => {
      client.invalidateQueries(['async-storage', key])
    },
  })
}
