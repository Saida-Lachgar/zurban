import { useCallback, useState } from 'react'
import { View } from 'react-native'
import { useRequestContactsPermissions } from '../../lib/useContactsPermissions'
import BottomSheet from '../ui/BottomSheet/BottomSheet'
import Button from '../ui/Button/Button'
import Paragraph from '../ui/Text/Paragraph'
import { Typography } from '../ui/Text/Text'
import Title from '../ui/Text/Title'

export type ContactPermissionSheetProps = {
  active: boolean
  skip: () => void
}

export default function ContactPermissionSheet({
  active,
  skip,
}: ContactPermissionSheetProps) {
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync: requestPermissions } = useRequestContactsPermissions()

  const grant = useCallback(async () => {
    try {
      await requestPermissions()
      skip()
    } catch (e) {
      setError('Something went wrong, please try again later')
      console.error(e)
    }
  }, [])

  return (
    <BottomSheet active={active}>
      <Title style={{ textAlign: 'center', alignSelf: 'center' }}>
        Authorize contacts access
      </Title>
      <Paragraph
        style={{
          textAlign: 'center',
          marginTop: 16,
          marginBottom: 32,
          alignSelf: 'center',
        }}
      >
        We need access to your contacts. We will never share them with anyone.
        Please grant access to continue.
      </Paragraph>
      {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
      <View style={{ gap: 8 }}>
        <Button onPress={grant}>Let's do it</Button>
        <Button
          onPress={skip}
          containerStyle={{ backgroundColor: 'transparent' }}
          textStyle={{
            color: 'gray',
          }}
        >
          Skip (not recommended)
        </Button>
      </View>
    </BottomSheet>
  )
}
