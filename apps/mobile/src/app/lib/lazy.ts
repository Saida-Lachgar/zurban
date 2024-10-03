export type Lazy<T> = (() => T | Promise<T>) | T

export const isCallable = <T>(l: Lazy<T>): l is () => T =>
  typeof l === 'function'

export const resolveLazy = async <T>(lazy: Lazy<T>) => {
  if (isCallable(lazy)) return lazy()
  return lazy as T
}
