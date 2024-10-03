import { useCallback, useEffect } from 'react'
import useBoolean from '../../../components/lib/useBoolean'
import { randomBookColor } from '../../../components/ui/colors'
import { useDatabase } from '../../Provider'
import { insertBook } from '../lib/insertBook'
import { fetchBooks } from '../lib/fetchBooks'

export const useInsertDefaultBook = (
  db: ReturnType<typeof useDatabase>,
  { enabled = true }: { enabled?: boolean }
) => {
  const ready = useBoolean(false)

  const init = useCallback(async () => {
    console.log('Inserting default book')
    const books = await fetchBooks(db)
    const needsToInsert = books.length === 0

    if (needsToInsert) {
      await insertBook(db, {
        name: 'All contacts',
        description: 'Unassigned contacts will go here',
        color: randomBookColor(),
      })
    }
    ready.setTrue()
  }, [])

  useEffect(() => {
    if (enabled && !ready.value) init()
  }, [enabled])

  return { ready: ready.value }
}
