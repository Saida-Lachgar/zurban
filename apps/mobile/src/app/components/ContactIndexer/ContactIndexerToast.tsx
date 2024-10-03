// import { useCallback } from 'react'
// import { ActivityIndicator } from 'react-native'
// import { syncContacts } from '../../model/contacts/lib/syncContacts'
// import { useDatabase } from '../../model/Provider'
// import useBoolean from '../lib/useBoolean'
// import useEffectOnce from '../lib/useEffectOnce'
// import StickyToast from '../ui/StickyToast/StickyToast'

// export default function ContactIndexerToast() {
//   const db = useDatabase()
//   const active = useBoolean(false)

//   const sync = useCallback(async () => {
//     active.setTrue()
//     await syncContacts(db)
//     active.setFalse()
//   }, [])

//   useEffectOnce(() => void sync())

//   return (
//     <StickyToast
//       active={active.value}
//       content="Syncronizing"
//       variant="light"
//       offsetBottom={70}
//       renderIcon={() => <ActivityIndicator size="small" color="black" />}
//     />
//   )
// }
