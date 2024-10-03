import { TextInput } from 'react-native'

export default function Input(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      style={{
        borderWidth: 1,
        borderColor: '#E3E5E6',
        borderRadius: 8,
        padding: 10,
      }}
      {...props}
    />
  )
}
