import { useState } from 'react'

export type UseSetOutput<T extends string | number> = {
  add: (value: T) => void
  remove: (value: T) => void
  reset: () => void
  toggle: (value: T) => void
  has: (value: T) => boolean
  length: number
  get values(): T[]
}

/**
 *
 */

export function useSelectionSet<T extends string | number>(): UseSetOutput<T> {
  const [set, setSet] = useState<Set<T>>(new Set())

  const add = (value: T) =>
    setSet((prev) => new Set([...Array.from(prev), value]))

  const remove = (value: T) =>
    setSet((prev) => new Set(Array.from(prev).filter((x) => x !== value)))

  const reset = () => setSet(new Set())

  const toggle = (value: T) =>
    setSet((prev) =>
      prev.has(value)
        ? new Set(Array.from(prev).filter((x) => x !== value))
        : new Set([...Array.from(prev), value])
    )

  return {
    add,
    remove,
    reset,
    toggle,
    has: set.has.bind(set),
    length: Object.values(set).filter(Boolean).length,
    get values() {
      return Array.from(set)
    },
  }
}
