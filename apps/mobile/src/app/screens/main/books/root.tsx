import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import React, { useCallback } from 'react'
import { Pressable, useWindowDimensions, View } from 'react-native'
import Animated, {
  FadeInUp,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated'
import DevResetButton from '../../../components/DevResetButton/DevResetButton'
import useBoolean from '../../../components/lib/useBoolean'
import QuickContactSelector from '../../../components/QuickContactSelector/QuickContactSelector'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import { palette, primary } from '../../../components/ui/colors'
import { ScreenRow } from '../../../components/ui/ScreenContainer'
import { Typography } from '../../../components/ui/Text/Text'
import TextualBlock from '../../../components/ui/TextualBlock/TextualBlock'
import { useBooks } from '../../../model/books/hooks/useBooks'
import { useBookDetails } from '../../../model/books/hooks/useBookDetails'
import { plural } from '../../../lib/plural'
import { useCountBookContacts } from '../../../model/native-contacts/hooks/useCountBookContacts'
import { DEFAULT_BOOK_ID } from '../../../constants/ids'
import { useNavigation } from "@react-navigation/native";

export function BookTile({
  bookId,
  selected = false,
  routerLinkBehavior = 'push',
  onSelect,
  ctaEnabled = false,
  reduced = false,
  mini,
}: {
  bookId: number
  selected?: boolean
  routerLinkBehavior?: 'push' | 'replace'
  onSelect?: () => void
  ctaEnabled?: boolean
  reduced?: boolean
  mini?: boolean
}) {
  const { data: count } = useCountBookContacts(bookId)
  const quickSelectSheet = useBoolean(false)
  const width = useWindowDimensions().width - 48 - 16 // TODO: get rid of magic numbers
  const book = useBookDetails(bookId)
  const navigation = useNavigation()

  const onPress = useCallback(() => {
    if (!book) return
    if (onSelect) return onSelect()
    navigation.navigate('book', { id: book.id })
  }, [book])

  if (!book) return null

  return (
    <Animated.View
      layout={Layout.duration(200).delay(200)}
      entering={FadeInUp}
      exiting={FadeOutDown}
    >
      {ctaEnabled && !reduced && (
        <Pressable
          onPress={quickSelectSheet.setTrue}
          style={{
            position: 'absolute',
            zIndex: 1,
            right: 0,
            top: 0,
            width: 50,
            height: 40,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: palette[book.color].foreground,
          }}
        >
          <View>
            <Ionicons name="add" color="white" size={23} />
          </View>
        </Pressable>
      )}
      <Pressable
        onPress={onPress}
        style={{
          zIndex: 0,
          justifyContent: 'space-between',
          position: 'relative',
          width: width / 2 / (mini ? 1.5 : 1),
          height: reduced ? 'auto' : 180 / (mini ? 1.5 : 1),
          borderRadius: 15,
          backgroundColor: palette[book.color].color,
          padding: 14,
          borderWidth: 3,
          borderColor: selected ? '#525252' : 'transparent',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'white',
            borderStyle: 'dashed',
            borderColor: palette[book.color].foreground,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            display: reduced ? 'none' : 'flex',
          }}
        >
          <Typography
            style={{
              color: palette[book.color].foreground,
              fontSize: 24,
              lineHeight: 28,
              fontWeight: 'bold',
            }}
          >
            {book.name.charAt(0)}
          </Typography>
        </View>
        <View style={{ gap: 2 }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Typography
              style={{ fontSize: 16, fontWeight: 'bold', opacity: 0.9 }}
            >
              {book.name}
            </Typography>
          </View>
          <Typography
            style={{
              fontSize: 12,
              lineHeight: 18,
              opacity: 0.7,
            }}
          >
            {book.description}
          </Typography>
          {book.id !== DEFAULT_BOOK_ID && count !== undefined && !mini && (
            <Typography
              style={{ fontSize: 12, fontWeight: 'bold', opacity: 0.8 }}
            >
              {count} {plural('card', count)}
            </Typography>
          )}
        </View>
      </Pressable>
      <QuickContactSelector
        active={quickSelectSheet.value}
        bookId={bookId}
        onClose={quickSelectSheet.setFalse}
      />
    </Animated.View>
  )
}

export default function BooksScreen({navigation}) {
  const { data: books } = useBooks()

  useNavigationBar({
    title: undefined,
    link: undefined,
  })

  return (
    <>
      <View style={{ gap: 24 }}>
        <ScreenRow
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextualBlock
            title="Hello!"
            description="Today, 230 cards were added"
          />
          <Pressable onPress={() => navigation.navigate('add')}>
            <Ionicons name="add-circle" size={24} color={primary} />
          </Pressable>
        </ScreenRow>

        <ScreenRow
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginVertical: 32,
            gap: 16,
          }}
        >
          {books?.map((book) => (
            <BookTile ctaEnabled key={book.id} bookId={book.id} />
          ))}
        </ScreenRow>
      </View>
      <DevResetButton />
    </>
  )
}
