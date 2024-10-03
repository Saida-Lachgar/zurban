export const primary = '#0076FF'
export const placeholder = 'rgba(60, 60, 67, 0.29)'
export const surtitle = 'rgba(60, 60, 67, 0.6)'

export const palette = {
  yellow: {
    color: 'rgba(255, 195, 0, 0.2)',
    foreground: 'rgba(255, 195, 0, 0.5)',
  },
  red: {
    color: 'rgba(255, 87, 51, 0.2)',
    foreground: 'rgba(255, 87, 51, 0.5)',
  },
  pink: {
    color: 'rgba(255, 0, 102, 0.2)',
    foreground: 'rgba(255, 0, 102, 0.5)',
  },
  purple: {
    color: 'rgba(213, 0, 249, 0.2)',
    foreground: 'rgba(213, 0, 249, 0.5)',
  },
  deepPurple: {
    color: 'rgba(156, 39, 176, 0.2)',
    foreground: 'rgba(156, 39, 176, 0.5)',
  },
  cyan: {
    color: 'rgba(0, 188, 212, 0.2)',
    foreground: 'rgba(0, 188, 212, 0.5)',
  },
  teal: {
    color: 'rgba(0, 150, 136, 0.2)',
    foreground: 'rgba(0, 150, 136, 0.5)',
  },
  green: {
    color: 'rgba(76, 175, 80, 0.2)',
    foreground: 'rgba(76, 175, 80, 0.5)',
  },
  orange: {
    color: 'rgba(255, 152, 0, 0.2)',
    foreground: 'rgba(255, 152, 0, 0.5)',
  },
  deepOrange: {
    color: 'rgba(255, 61, 0, 0.2)',
    foreground: 'rgba(255, 61, 0, 0.5)',
  },
  amber: {
    color: 'rgba(255, 193, 7, 0.2)',
    foreground: 'rgba(255, 193, 7, 0.5)',
  },
  lightGreen: {
    color: 'rgba(139, 195, 74, 0.2)',
    foreground: 'rgba(139, 195, 74, 0.5)',
  },
  deepYellow: {
    color: 'rgba(255, 235, 59, 0.2)',
    foreground: 'rgba(255, 235, 59, 0.5)',
  },
  darkYellow: {
    color: 'rgba(255, 152, 0, 0.2)',
    foreground: 'rgba(255, 152, 0, 0.5)',
  },
  deepRed: {
    color: 'rgba(244, 67, 54, 0.2)',
    foreground: 'rgba(244, 67, 54, 0.5)',
  },
  darkPurple: {
    color: 'rgba(123, 31, 162, 0.2)',
    foreground: 'rgba(123, 31, 162, 0.5)',
  },
  indigo: {
    color: 'rgba(63, 81, 181, 0.2)',
    foreground: 'rgba(63, 81, 181, 0.5)',
  },
  blue: {
    color: 'rgba(33, 150, 243, 0.2)',
    foreground: 'rgba(33, 150, 243, 0.5)',
  },
  lightBlue: {
    color: 'rgba(0, 188, 212, 0.2)',
    foreground: 'rgba(0, 188, 212, 0.5)',
  },
  lime: {
    color: 'rgba(205, 220, 57, 0.2)',
    foreground: 'rgba(205, 220, 57, 0.5)',
  },
} as const

export const randomBookColor = (): keyof typeof palette => {
  const colors = Object.keys(palette)
  return colors[
    Math.floor(Math.random() * colors.length)
  ] as keyof typeof palette
}
