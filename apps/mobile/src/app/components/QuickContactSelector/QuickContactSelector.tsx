import { useCallback } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { BookTile } from '../../screens/main/books'
import { useAddContactToBook } from '../../model/native-contacts/hooks/useAddContactToBook'
import { useUnassignedContacts } from '../../model/native-contacts/hooks/useUnassignedContats'
import ContactsList from '../ContactsList/ContactsList'
import useBoolean from '../lib/useBoolean'
import BottomSheet from '../ui/BottomSheet/BottomSheet'
import Title from '../ui/Text/Title'

export default function QuickContactSelector({
  bookId,
  active,
  onClose,
}: {
  bookId: number
  active: boolean
  onClose: () => void
}) {
  const loading = useBoolean(false)
  const { mutateAsync: addContactsToBook } = useAddContactToBook()
  const height = useWindowDimensions().height / 1.5
  const unassignedContacts = useUnassignedContacts()

  const onSelectMany = useCallback(async (ids: string[]) => {
    loading.setTrue()
    console.log({ ids })
    await addContactsToBook({
      bookId,
      contactIds: ids,
    })
    loading.setFalse()
    onClose()
  }, [])

  const onSelectOne = useCallback(
    async (id: string) => {
      loading.setTrue()
      await addContactsToBook({ bookId, contactIds: [id] })
      loading.setFalse()
      onClose()
    },
    [bookId]
  )

  return (
    <BottomSheet active={active} onClose={onClose}>
      <View
        style={{ height, gap: 16, opacity: loading.value ? 0.5 : 1 }}
        pointerEvents={loading.value ? 'none' : 'auto'}
      >
        <Title>Quick add</Title>
        <BookTile bookId={bookId} reduced />
        <View style={{ borderTopWidth: 1, borderTopColor: '#f0f0f0', flex: 1 }}>
          <ContactsList
            contacts={unassignedContacts ?? []}
            onSelectMany={onSelectMany}
            onSelectOne={onSelectOne}
          />
        </View>
      </View>
    </BottomSheet>
  )
}
