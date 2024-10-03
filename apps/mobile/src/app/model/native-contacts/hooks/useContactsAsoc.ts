import { useQuery } from '@tanstack/react-query'
import { useDatabase } from '../../Provider'
import { fetchAssoc } from '../lib/fetchAssoc'

export const useContactsAsoc = () => {
  const db = useDatabase()
  return useQuery(['contacts', 'assoc'], () => fetchAssoc(db))
}
