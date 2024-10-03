import { useCallback, useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import ContactsList from '../../../components/ContactsList/ContactsList'
import RecentlyViewedContact from '../../../components/RecentlyViewed/RecentlyViewedContact'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import { ScreenRow } from '../../../components/ui/ScreenContainer'
import { SearchBar } from '../../../components/ui/SearchBar/SearchBar'
import { useSearchableContacts } from '../../../model/native-contacts/hooks/useSearchableContacts'

export default function SearchPage() {
  // const router = useRouter()
  const height = useWindowDimensions().height

  useNavigationBar({
    title: 'Search',
    canGoBack: true,
    link: {
      label: 'Cancel',
      href: '/(main)/books',
    },
  })

  const onSelectOne = useCallback((id: string) => {
    // TODO: Fix this line
    // router.push(`/contact/${id}`)
  }, [])

  const [search, setSearch] = useState('')
  const { data: contacts } = useSearchableContacts(search)

  return (
    <View style={{ backgroundColor: 'white', minHeight: height, gap: 16 }}>
      <ScreenRow>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search for contacts"
        />
      </ScreenRow>

      {search.length === 0 ? (
        <ScreenRow>
          <RecentlyViewedContact />
        </ScreenRow>
      ) : null}

      {Boolean(search.length) && (
        <ContactsList contacts={contacts ?? []} onSelectOne={onSelectOne} />
      )}
    </View>
  )
}
