import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { View } from 'react-native'
import { ContactLine } from '../ui/ContactLine/ContactLine'
import { MiniLabel } from '../ui/Text/Label'
import { lastViewedContactAtom } from './state'

export default function RecentlyViewedContact() {
  const recentlyViewedContact = useAtomValue(lastViewedContactAtom)
  // const router = useRouter()

  if (!recentlyViewedContact) {
    return null
  }

  const onSelect = useCallback(() => {
    if (!recentlyViewedContact) return
    // TODO: Fix navigation
    // router.push(`/contact/${recentlyViewedContact}`)
  }, [recentlyViewedContact])

  return (
    <View>
      <MiniLabel>Recently viewed</MiniLabel>
      <ContactLine onPress={onSelect} contactId={recentlyViewedContact} />
    </View>
  )
}
