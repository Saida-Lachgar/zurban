import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { View } from 'react-native'
import { useDatabase } from '../../model/Provider'
import Button from '../ui/Button/Button'
import { ScreenRow } from '../ui/ScreenContainer'
import { syncContacts } from "../../model/contacts/lib/syncContacts";
import { db } from "../../model/db";
import Contacts from "react-native-contacts";
import { listContactsQuery } from "../../model/contacts/queries/listContactsQuery";

/**
 * drops the database and clears asyncStorage
 */
export default function DevResetButton() {
  const database = useDatabase()

  const {mutate: reset} = useMutation(['reset'], async () => {
    await AsyncStorage.clear()
    database.close()
    database.delete()
  })

  const client = useQueryClient()
  const sync = useCallback(async () => {
    console.log('Contacts', Contacts);
    const status = await Contacts.requestPermission()
    if (status === 'authorized') await syncContacts(db)

    const res = listContactsQuery()(db)

    // await client.refetchQueries(['contacts'])
    // await client.refetchQueries(['books'])
  }, [])

  // return null

  return (
    <ScreenRow>
      <View style={{gap: 64}}>
        <Button onPress={reset}>Reset</Button>
        <Button onPress={sync}>Sync</Button>
      </View>
    </ScreenRow>
  )
}
