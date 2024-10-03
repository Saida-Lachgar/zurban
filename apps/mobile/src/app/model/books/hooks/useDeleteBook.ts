import { useDatabase } from '../../Provider'
import { deleteBookQuery } from '../queries/deleteBookQuery'

export const useDeleteBook = (id: number) => {
  const db = useDatabase()
  return deleteBookQuery(id)(db)
}
