import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import * as colors from '../colors'

interface SearchBarProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F4F5',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        height: 50,
      }}
    >
      <Icon name="search" size={20} color={colors.placeholder} />
      <TextInput
        autoFocus
        style={{ marginLeft: 10, flex: 1, fontFamily: 'Inter_500Medium' }}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  )
}
