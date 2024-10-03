import { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useSelectionSet } from '../lib/useSet'
import { ContactLine } from '../ui/ContactLine/ContactLine'
import { ScreenRow } from '../ui/ScreenContainer'
import StickyToast from '../ui/StickyToast/StickyToast'
import { Contact } from "../../model/init";

export default function ContactsList({
  contacts,
  onSelectOne,
  onSelectMany,
}: {
  contacts: Contact[]
  onSelectOne?: (id: string) => void
  onSelectMany?: (ids: string[]) => void
}) {
  const selection = useSelectionSet<string>()
  const [mode, setMode] = useState<'select' | 'normal'>()

  useEffect(() => {
    if (!selection.length) setMode('normal')
  }, [selection.length])

  const onStickyToastPress = useCallback(() => {
    onSelectMany?.(selection.values)
    setMode('normal')
    selection.reset()
  }, [selection])

  const onLongPress = useCallback(
    (id: string) => {
      if (!onSelectMany) return
      if (mode === 'normal') {
        setMode('select')
        selection.add(id)
      } else {
        selection.reset()
        setMode('normal')
      }
    },
    [mode]
  )

  const onPress = useCallback(
    (id: string) => {
      if (mode === 'select') {
        selection.toggle(id)
      } else {
        onSelectOne?.(id)
      }
    },
    [mode]
  )

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => (
      <ScreenRow>
        <ContactLine
          contactId={item.id}
          onPress={onPress}
          onLongPress={onLongPress}
          mode={
            mode === 'select'
              ? selection.has(item.id)
                ? 'selected'
                : 'unselected'
              : 'normal'
          }
        />
      </ScreenRow>
    ),
    [mode, selection]
  )

  return (
    <>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />
      <StickyToast
        active={mode !== 'normal'}
        content="Move items"
        onPress={onStickyToastPress}
      />
    </>
  )
}
