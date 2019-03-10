import { createStyles, mediaStyle } from '../..'
import { theme, toStyles } from '../../../test-helpers'

test('return style', () => {
  const style = createStyles({
    hideOn: mediaStyle({ display: 'none' })
  })

  const expected = {
    '@media (max-width: 600px)': {
      display: 'none'
    }
  }

  expect(toStyles(style({ theme, hideOn: 'M' }))).toEqual(expected)
  expect(toStyles(style({ theme, hideOn: { M: true } }))).toEqual(expected)
})

test('multiple media', () => {
  const style = createStyles({
    hideOn: mediaStyle({ display: 'none' })
  })

  const expected = {
    '@media (max-width: 600px)': {
      display: 'none'
    },
    '@media (min-width: 601px)': {
      display: 'none'
    }
  }

  expect(toStyles(style({ theme, hideOn: { M: true, D: true } }))).toEqual(expected)
})

test('return nothing', () => {
  const style = createStyles({
    hideOn: mediaStyle({ display: 'none' })
  })

  expect(toStyles(style({ theme, hideOn: 'default' }))).toEqual({})
  expect(toStyles(style({ theme, hideOn: true }))).toEqual({ display: 'none' })
  expect(toStyles(style({ theme, hideOn: 'wrong' }))).toEqual({})
  expect(toStyles(style({ theme, hideOn: false }))).toEqual({})
  expect(toStyles(style({ theme, hideOn: null }))).toEqual({})
})