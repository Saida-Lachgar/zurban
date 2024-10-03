import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { DateTime } from 'luxon'
import { Pressable, View } from 'react-native'
import { Avatar } from '../ui/Avatar/Avatar'
import { palette } from '../ui/colors'
import { Typography } from '../ui/Text/Text'

export type Event = {
  color: keyof typeof palette
  title: string
  href: string
  date: DateTime
}

export default function UpcommingEvent({ event }: { event: Event }) {
  return (
    <View
      style={{
        height: 60,
        borderRadius: 30,
        backgroundColor: palette[event.color].color,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 6,
        paddingRight: 16,
        gap: 10,
      }}
    >
      <View
        style={{
          gap: -30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar name={event.title} color={palette[event.color].foreground} />
      </View>
      <View style={{ flex: 1 }}>
        <Typography style={{ fontFamily: 'Inter_700Bold' }}>
          {event.title}
        </Typography>
        <Typography style={{ fontSize: 12, opacity: 0.7 }}>
          {event.date.toLocaleString(DateTime.DATETIME_MED)}
        </Typography>
      </View>
      <Pressable>
        <View
          style={{
            alignContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.1)',
            width: 34,
            height: 34,
            borderRadius: 34 / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="arrow-forward" color="rgba(0,0,0,0.5)" size={20} />
        </View>
      </Pressable>
    </View>
  )
}
