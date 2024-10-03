import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native'
import books, { BookTile } from '../../screens/main/books'
import { Book } from '../../model/books/shema'
import { useBooks } from '../../model/books/hooks/useBooks'
import { useBookDetails } from '../../model/books/hooks/useBookDetails'
import { plural } from '../../lib/plural'
import BottomSheet from '../ui/BottomSheet/BottomSheet'
import Button from '../ui/Button/Button'
import { palette } from '../ui/colors'
import Loader from '../ui/Loader/Loader'
import ScalePressable from '../ui/ScalePressable/ScalePressable'
import { ScreenRow } from '../ui/ScreenContainer'
import { Typography } from '../ui/Text/Text'
import Title from '../ui/Text/Title'
import { DEFAULT_BOOK_ID } from '../../constants/ids'
import { useCountBookContacts } from '../../model/native-contacts/hooks/useCountBookContacts'

export type BookSelectorTriggerProps = {
  bookId?: Book['id']
  onPress?: () => void
}

export function BookSelectorTrigger({
                                      bookId,
                                      onPress,
                                    }: BookSelectorTriggerProps) {
  const {data: book} = useBookDetails(bookId)
  const {data: count} = useCountBookContacts(bookId)
  if (!book) return null
  return (
    <View
      style={{
        backgroundColor: palette[book?.color].color,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}
    >
      <ScreenRow>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ScalePressable onPress={onPress}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', gap: 10}}
            >
              {!books?.name && <Loader/>}
              <Title>{book?.name}</Title>
              <Ionicons name="chevron-down" size={16}/>
            </View>
          </ScalePressable>
          {Boolean(count) && (
            <Typography>
              {count} {plural('contact', count ?? 0)}
            </Typography>
          )}
        </View>
      </ScreenRow>
    </View>
  )
}

export type BookSelectorSheetProps = {
  active: boolean
  onClose: () => void
  selected?: number
  onSelect?: (id: number) => void
  canCreate?: boolean
  loading?: boolean
}

export default function BookSelectorSheet({
                                            active,
                                            onClose,
                                            selected,
                                            onSelect,
                                            canCreate = true,
                                            loading,
                                          }: BookSelectorSheetProps) {
  const height = useWindowDimensions().height / 2.8
  const {data: books} = useBooks()

  return (
    <BottomSheet active={active} onClose={onClose}>
      {loading && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Loader/>
        </View>
      )}
      <View
        style={{
          opacity: loading ? 0.2 : 1,
          width: '100%',
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            paddingTop: 16,
            paddingBottom: 32,
            gap: 16,
          }}
          style={{
            flex: 1,
            height,
            borderBottomColor: '#f0f0f0',
            borderBottomWidth: 1,
            marginBottom: 10,
          }}
        >
          {books
            ?.filter((b) => b.id !== DEFAULT_BOOK_ID)
            .map((book) => (
              <BookTile
                key={book.id}
                selected={selected === book.id}
                routerLinkBehavior="replace"
                onSelect={onSelect ? () => onSelect(book.id) : undefined}
                bookId={book.id}
              />
            ))}
        </ScrollView>
        {canCreate && (
          // TODO: Fix this line
          <Pressable onPress={() => {
            if (onClose) onClose()
          }}>
            <Button>Create a new Book</Button>
          </Pressable>
          // <Link
          //   href="/books/add"
          //   onPress={() => {
          //     if (onClose) onClose()
          //   }}
          //   asChild
          // >
          //   <Button>Create a new Book</Button>
          // </Link>
        )}
      </View>
    </BottomSheet>
  )
}
