import { useRoute } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { View } from 'react-native'
import BookDetailEmptyState from '../../../components/BookDetailEmptyState/BookDetailEmptyState'
import BookSelectorSheet, {
  BookSelectorTrigger,
} from '../../../components/BookSelector/BookSelector'
import { useBookSelector } from '../../../components/BookSelector/state'
import ContactsList from '../../../components/ContactsList/ContactsList'
import useBoolean from '../../../components/lib/useBoolean'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import { useBookDetails } from '../../../model/books/hooks/useBookDetails'
import { useAddContactToBook } from '../../../model/native-contacts/hooks/useAddContactToBook'
import { useBookContacts } from '../../../model/native-contacts/hooks/useBookContacts'
import { useContacts } from "../../../model/native-contacts/hooks/useContacts";

export default function BookDetails({navigation}) {
  const {mutateAsync: addContactsToBook} = useAddContactToBook()
  // TODO: Fix typescript
  const {id} = useRoute().params
  const book = useBookDetails(Number(id))
  const contacts = useContacts({book_id: Number(id)})
  const bookSelectorMoveSheetActive = useBoolean(false)
  const bookSelectorLoading = useBoolean(false)

  console.log('book', book)

  const bookSelectorProps = useBookSelector()

  const [selectedContacts, setSelectedContacts] = useState<string[]>([])

  const onBookSelect = useCallback(
    async (id: number) => {
      bookSelectorLoading.setTrue()
      await addContactsToBook({
        bookId: id,
        contactIds: selectedContacts,
      })
      setSelectedContacts([])
      bookSelectorMoveSheetActive.setFalse()
      bookSelectorLoading.setFalse()
    },
    [addContactsToBook, bookSelectorLoading, bookSelectorMoveSheetActive, selectedContacts]
  )

  const onSelectOne = useCallback((id: string) => {
    navigation.navigate(`/contact`)
  }, [navigation])

  const onSelectMany = useCallback((ids: string[]) => {
    setSelectedContacts(ids)
    bookSelectorMoveSheetActive.setTrue()
  }, [bookSelectorMoveSheetActive])

  useNavigationBar({
    title: book?.name ?? 'Book',
    canGoBack: true,
    link: {
      label: 'Edit',
      href: '/books/edit',
    },
  })

  return (
    <>
      <View style={{flex: 1}}>
        {book && <BookSelectorTrigger {...bookSelectorProps.tiggerProps} />}
        {contacts?.length === 0 && <BookDetailEmptyState/>}
        {contacts && contacts.length > 0 && (
          <ContactsList
            contacts={contacts}
            onSelectOne={onSelectOne}
            onSelectMany={onSelectMany}
          />
        )}
      </View>
      <BookSelectorSheet {...bookSelectorProps.sheetProps} />
      <BookSelectorSheet
        active={bookSelectorMoveSheetActive.value}
        onClose={bookSelectorMoveSheetActive.setFalse}
        onSelect={onBookSelect}
        canCreate={false}
        loading={bookSelectorLoading.value}
      />
    </>
  )
}
