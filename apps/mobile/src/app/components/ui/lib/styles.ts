import { StyleProp } from 'react-native'

export function concatStyles<T>(...args: StyleProp<T>[]): StyleProp<T>[] {
  return args
    .reduce((acc, val) => {
      if (Array.isArray(val)) {
        return acc.concat(val)
      } else {
        return acc.concat([val])
      }
    }, [] as any[])
    .filter((val) => val !== undefined)
}
