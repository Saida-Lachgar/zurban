import { useMemo } from 'react'
import { useRoute } from "@react-navigation/native";
import useBoolean from '../lib/useBoolean'
import {
  BookSelectorSheetProps,
  BookSelectorTriggerProps,
} from './BookSelector'

export function useBookSelector() {
  // TODO: Fix typescript
  const {id: selectedBookId} = useRoute().params;
  const active = useBoolean(false)

  return useMemo(
    () => ({
      sheetProps: {
        active: active.value,
        onClose: active.setFalse,
        selected: +(selectedBookId ?? 0),
      } as BookSelectorSheetProps,
      tiggerProps: {
        onPress: active.setTrue,
        bookId: +(selectedBookId ?? 0),
      } as BookSelectorTriggerProps,
    }),
    [active]
  )
}
