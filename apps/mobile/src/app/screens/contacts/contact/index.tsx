import { useRoute } from '@react-navigation/native'
import { useSetAtom } from 'jotai'
import { DateTime } from 'luxon'
import { Pressable, ScrollView, View } from 'react-native'
import { BookTile } from '../../main/books/root'
import useEffectOnce from '../../../components/lib/useEffectOnce'
import { lastViewedContactAtom } from '../../../components/RecentlyViewed/state'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import Instagram from '../../../components/ui/Apps/Instagram'
import LinkedIn from '../../../components/ui/Apps/LinkedIn'
import Twitter from '../../../components/ui/Apps/Twitter'
import Whatsapp from '../../../components/ui/Apps/Whatsapp'
import { Avatar } from '../../../components/ui/Avatar/Avatar'
import { primary } from '../../../components/ui/colors'
import { ScreenRow } from '../../../components/ui/ScreenContainer'
import TabHeader from '../../../components/ui/TabHeader/TabHeader'
import Label, { MiniLabel } from '../../../components/ui/Text/Label'
import { Typography } from '../../../components/ui/Text/Text'
import TextLink from '../../../components/ui/Text/TextLink'
import Title from '../../../components/ui/Text/Title'
import UpcommingEvent from '../../../components/UpcommingEvent/UpcommingEvent'
import { useContactBooksIds } from '../../../model/native-contacts/hooks/useContactBooks'
import { useContactDetails } from '../../../model/native-contacts/hooks/useContactDetails'
import { useEditContact } from '../../../model/native-contacts/hooks/useEditContact'

export function ContactInformationLine({
                                         label,
                                         content,
                                         contactId,
                                       }: {
  label: string
  content?: string
  contactId: string
}) {
  const {mutate: editContact} = useEditContact()

  return (
    <Pressable onPress={() => editContact({contactId})}>
      <View style={{gap: 5}}>
        <MiniLabel>{label}</MiniLabel>
        {content?.length ? (
          <Typography style={{fontFamily: 'Inter_700Bold'}}>
            {content}
          </Typography>
        ) : (
          <TextLink>Tap to add a value</TextLink>
        )}
      </View>
    </Pressable>
  )
}

export default function ContactDetailPage() {
  // TODO: Fix typescript
  // const { id } = useSearchParams<{ id: string }>()
  const {id} = useRoute().params;
  const {data: contact} = useContactDetails(id)
  const {data: books} = useContactBooksIds(id)
  const {mutate: editContact} = useEditContact()

  useNavigationBar({
    title: contact?.name ?? 'Contact',
    canGoBack: true,
    link: {
      label: 'Edit',
      onClick: () => {
        if (!id) return
        editContact({contactId: id})
      },
    },
  })

  const setLastViewdContact = useSetAtom(lastViewedContactAtom)
  useEffectOnce(() => {
    if (!contact) return
    setLastViewdContact(contact.id)
  })

  if (!contact) return null

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 24,
        paddingBottom: 32,
      }}
    >
      <View style={{alignItems: 'center', justifyContent: 'center', gap: 16}}>
        <Avatar color={primary} name={contact.name} size={80}/>
        <View style={{gap: 4}}>
          <Title style={{textAlign: 'center', alignSelf: 'center'}}>
            {contact.name}
          </Title>
          <Typography
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              opacity: 0.7,
              fontSize: 14,
            }}
          >
            {contact.phoneNumbers?.map((p) => p.number).join(', ')}
          </Typography>
        </View>
      </View>

      <ScreenRow style={{marginTop: 32, gap: 10}}>
        <UpcommingEvent
          event={{
            color: 'blue',
            date: DateTime.now(),
            href: '/event/1',
            title: 'Daily Meeting',
          }}
        />
        <UpcommingEvent
          event={{
            color: 'green',
            date: DateTime.now(),
            href: '/event/1',
            title: 'Tech Interview',
          }}
        />
      </ScreenRow>

      <View style={{paddingBottom: 16, paddingTop: 32}}>
        <TabHeader/>
      </View>

      <View style={{gap: 24}}>
        <ScreenRow
          style={{
            marginTop: 32,
          }}
        >
          <Label>Personal informatinos</Label>
          <View style={{gap: 24, marginVertical: 24}}>
            <ContactInformationLine
              contactId={id!}
              label="Emails"
              content={contact.emails?.map((e) => e.email).join(', ')}
            />
            <ContactInformationLine
              contactId={id!}
              label="Address"
              content={contact.addresses
                ?.map((a) => `${a.street ?? ''} ${a.city ?? ''}`)
                .join(', ')}
            />
          </View>
        </ScreenRow>

        <ScreenRow style={{gap: 10}}>
          <Label>Apps</Label>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
            <Whatsapp onPress={() => void 0}/>
            <Twitter onPress={() => void 0}/>
            <Instagram onPress={() => void 0}/>
            <LinkedIn onPress={() => void 0}/>
          </View>
        </ScreenRow>

        <ScreenRow style={{gap: 10}}>
          <Label>Books</Label>
          <ScrollView horizontal contentContainerStyle={{gap: 16}}>
            {books?.map((id) => (
              <BookTile key={id} mini bookId={id}/>
            ))}
          </ScrollView>
        </ScreenRow>
      </View>
    </ScrollView>
  )
}
