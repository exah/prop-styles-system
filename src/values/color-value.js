import { identity, fallbackTo, isStr, path } from '@exah/utils'
import { themePath, getDefault, getFirst } from '../utils'

export function createColorValue ({
  themeColorKey = 'color',
  themePaletteKey = 'palette',
  colorsScale = {},
  paletteScale = {},
  colorsGetter = themePath(themeColorKey, colorsScale),
  paletteGetter = themePath(themePaletteKey, paletteScale),
  defaultKeyword = 'auto'
} = {}) {
  const getColor = (defaultColorName) => (colorName, props) => {
    const colors = colorsGetter(props)
    const palettes = paletteGetter(props)
    const defaultPaletteName = getDefault(themePaletteKey)(props)

    const activeColors = {
      ...path(defaultPaletteName)(palettes),
      ...colors
    }

    const color = colorName === true || colorName === defaultKeyword
      ? path(defaultColorName)(activeColors)
      : isStr(colorName) ? path(colorName)(activeColors) : null

    if (colorName == null) {
      return color
    }

    return fallbackTo(
      color,
      path(defaultColorName)(path(colorName)(palettes))
    )
  }

  return (key, transformValue = identity, defaultValue) => {
    const getValue = getColor(key)

    return (input, props) => {
      const color = getFirst(getValue(input, props))

      return fallbackTo(
        isStr(color) ? transformValue(color, props) : color,
        defaultValue
      )
    }
  }
}

/**
 * ```js
 * import { colorValue } from 'pss'
 * ```
 *
 * Get color from theme and apply it to css prop. Must be used with {@link rule}.
 *
 * @param {string} key — Key in `theme.color` or in `theme.palette[theme.default.palette]`
 * @param {Function} [transformValue = identity] — Return customized CSS prop value (i.e. `box-shadow`, gradients)
 *
 * @return {Function}
 *
 * @example
 * import pss, { rule, colorValue } from 'pss'
 *
 * const colors = pss({
 *   fg: rule('color', colorValue('fg')),
 *   bg: rule('backgroundColor', colorValue('bg')),
 *   shadow: rule('boxShadow', colorValue('shadow', (color) => `0 0 20px 0 ${color}`)),
 *   tm: [
 *      rule('color', colorValue('fg')),
 *      rule('backgroundColor', colorValue('bg'))
 *   ]
 * })
 *
 * // Add to component
 * const Box = styled.div`
 *   ${colors}
 * `
 *
 * @example
 * // theme.palette.default.fg
 * <Box fg='auto' /> // background-color: #222222
 * <Box fg /> // background-color: #222222
 *
 * // theme.colors.black
 * <Box fg='black' /> // color: #222222
 *
 * // theme.palette.default.accent
 * <Box fg='accent' /> // color: #ff0000
 *
 * // theme.palette.default.shadow
 * <Box shadow='auto' /> // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2)
 * <Box shadow /> // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2)
 *
 * // theme.palette.default.fg, theme.palette.default.bg
 * <Box tm='default' /> // color: #222222; background-color: #ffffff
 */

export const colorValue = createColorValue()
