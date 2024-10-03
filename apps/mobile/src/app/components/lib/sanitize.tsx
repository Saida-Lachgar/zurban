/**
 * compares string ignoring whitespaces
 */
export function compareString(a: string, b: string) {
  return (
    a.toLowerCase().replace(/\s/g, '') === b.toLowerCase().replace(/\s/g, '')
  )
}
