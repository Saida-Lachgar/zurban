import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import ColorsSelector from '../../../components/ColorsSelector/ColorsSelector'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import Button from '../../../components/ui/Button/Button'
import { palette } from '../../../components/ui/colors'
import Input from '../../../components/ui/Input/Input'
import Reveal from '../../../components/ui/Reveal/Reveal'
import ScreenContainer, {
  ScreenRow,
} from '../../../components/ui/ScreenContainer'
import TextualBlock from '../../../components/ui/TextualBlock/TextualBlock'
import { useInsertBook } from '../../../model/books/hooks/useInsertBook'
import { CreateBookInputType } from '../../../model/books/shema'

export default function BooksFormScreen() {
  // const router = useRouter()

  useNavigationBar({
    title: 'Add a book',
    canGoBack: true,
    link: {
      label: 'Cancel',
      href: '/books',
    },
  })

  const {control, handleSubmit} = useForm({
    defaultValues: {
      name: '',
      description: '',
      color: Object.keys(palette)[0],
    },
  })

  const {mutateAsync: insertBook} = useInsertBook()

  const onSubmit = useCallback(async (data: CreateBookInputType) => {
    const id = await insertBook(data)
    // TODO: Fix this line
    // router.replace(`/books`)
  }, [])

  return (
    <>
      <ScreenContainer>
        <TextualBlock
          title="Create a book"
          description="Books are the best way to organize your groups of contacts."
        />
        <View style={{paddingVertical: 32, gap: 16}}>
          <Reveal delay={300}>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Name"
                  autoFocus
                  placeholderTextColor="#424242"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Reveal>
          <Reveal delay={600}>
            <Controller
              control={control}
              name="description"
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Description"
                  autoFocus
                  placeholderTextColor="#424242"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Reveal>
          <Reveal delay={900}>
            <Controller
              control={control}
              name="color"
              render={({field: {onChange, value}}) => (
                <ColorsSelector
                  label="Color"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Reveal>
        </View>

        <ScreenRow
          style={{
            position: 'absolute',
            bottom: 24,
            left: 0,
            right: 0,
            gap: 8,
          }}
        >
          <Button onPress={handleSubmit(onSubmit)}>Next</Button>
        </ScreenRow>
      </ScreenContainer>
    </>
  )
}
