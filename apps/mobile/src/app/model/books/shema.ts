import { palette } from '../../components/ui/colors'

export type CreateBookInputType = {
  id?: number
  name: string
  description: string
  color: string
}

export type Book = {
  id: number
  name: string
  description: string
  color: keyof typeof palette
  count: number
}
