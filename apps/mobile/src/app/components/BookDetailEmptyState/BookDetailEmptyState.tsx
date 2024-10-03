import { View } from 'react-native'
import Button from '../ui/Button/Button'
import { ScreenRow } from '../ui/ScreenContainer'
import TextualBlock from '../ui/TextualBlock/TextualBlock'

export default function BookDetailEmptyState() {
  return (
    <ScreenRow>
      <View style={{ marginTop: 32, gap: 32 }}>
        <TextualBlock
          surtitle="Nothing here"
          title="This book is empty"
          description="Add some contacts to this book to see them here"
          animation="fromAbove"
        />
        <Button>Add contacts</Button>
      </View>
    </ScreenRow>
  )
}
