import test from 'ava'
import { mergeDeepRight } from 'ramda'

import {
  DEFAULT_KEY,
  MEDIA_KEY,
  COLORS_KEY,
  PALETTE_KEY
} from '../src/constants'

import {
  createPropStyles,
  createPaletteProp,
  createColorProp
} from '../src'

import { toStyles } from './_helpers'

const COLOR_WHITE = '#ffffff'
const COLOR_BLACK = '#000000'
const COLOR_YELLOW = '#fff000'

const theme = {
  [MEDIA_KEY]: {
    D: '(min-width: 1025px)',
    M: '(max-width: 600px)'
  },
  [COLORS_KEY]: {
    yellow: COLOR_YELLOW,
    white: COLOR_WHITE,
    black: COLOR_BLACK
  },
  [PALETTE_KEY]: {
    [DEFAULT_KEY]: {
      foreground: COLOR_BLACK,
      background: COLOR_WHITE,
      primary: COLOR_BLACK,
      accent: COLOR_YELLOW
    },
    inverted: {
      foreground: COLOR_WHITE,
      background: COLOR_BLACK,
      primary: COLOR_WHITE,
      accent: COLOR_YELLOW
    }
  }
}

const themeInvertedDefault = mergeDeepRight(theme, {
  [DEFAULT_KEY]: { [PALETTE_KEY]: 'inverted' }
})

const colorsPropStyles = createPropStyles({
  tm: createPaletteProp('background', 'foreground'),
  fg: createColorProp('color', 'foreground'),
  bg: createColorProp('backgroundColor', 'background'),
  bc: createColorProp('borderColor', 'border')
})

test('props -> set theme colors and override text color on mobile', (t) => {
  const result = toStyles(colorsPropStyles({
    theme,
    tm: true,
    fgM: 'accent'
  }))

  t.deepEqual(result, {
    color: COLOR_BLACK,
    backgroundColor: COLOR_WHITE,
    '@media (max-width: 600px)': {
      color: COLOR_YELLOW
    }
  })
})

test('props -> change default theme to "inverted"', (t) => {
  const result = toStyles(colorsPropStyles({
    theme: themeInvertedDefault,
    tm: true
  }))

  t.deepEqual(result, {
    color: COLOR_WHITE,
    backgroundColor: COLOR_BLACK
  })
})

test('props -> reset theme colors on mobile', (t) => {
  const result = toStyles(colorsPropStyles({
    theme: themeInvertedDefault,
    tm: true,
    tmM: false
  }))

  t.deepEqual(result, {
    color: COLOR_WHITE,
    backgroundColor: COLOR_BLACK,
    '@media (max-width: 600px)': {
      color: 'inherit',
      backgroundColor: 'transparent'
    }
  })
})

test('props -> set default foreground color', (t) => {
  const result = toStyles(colorsPropStyles({ theme, fg: true }))

  t.deepEqual(result, {
    color: COLOR_BLACK
  })
})

test('props -> set default "inverted" theme foreground color', (t) => {
  const result = toStyles(colorsPropStyles({ theme, fg: 'inverted' }))

  t.deepEqual(result, {
    color: COLOR_WHITE
  })
})

test('props -> set custom foreground color', (t) => {
  const customColor = 'rgba(255, 0, 255, 0.3)'
  const result = toStyles(colorsPropStyles({ theme, fg: customColor, bg: 'custom-color' }))

  t.deepEqual(result, {
    color: customColor,
    backgroundColor: 'custom-color'
  })
})