import { createStyles, rule } from '../core'
import { colorValue } from '../values'

/**
 * ```js
 * import { colors } from 'pss'
 * ```
 *
 * Prop styles for getting current `palette` or `color` value from `theme`. Created with {@link colorValue}.
 *
 * Result can be changed in nested components with setting other key in `theme.default.palette`.
 *
 * **Component props:**
 *
 * - `fg` → `color`
 * - `bg` → `background-color`
 * - `tm` → `color`, `background-color`
 *
 * **`String` values:**
 *
 * - Valid color: `#f00`, `rgba(255, 255, 0, 0.2)`, `hsl(0, 100%, 50%)`
 * - Key in `theme.color` or `theme.palette[theme.default.palette]`
 *   + `black` → `theme.color.black`
 *   + `accent` → `theme.palette.default.accent`
 *
 * **Default value with `auto` or `true`:**
 *
 * - Different in each prop (take value from `theme.palette[theme.default.palette]`)
 *   - `bg` → `theme.palette.default.bg`
 *   - `fg` → `theme.palette.default.fg`
 *   - `tm` → `theme.palette.default.fg`, `theme.palette.default.bg`
 *
 * Related: {@link colorValue}, {@link rule}.
 *
 * Examples use this `theme`:
 *
 * ```js
 * const theme = {
 *   default: {
 *     palette: 'default' // this can be changed
 *   },
 *   color: {
 *     red: '#ff0000',
 *     black: '#222222',
 *     white: '#ffffff'
 *   },
 *   palette: {
 *     default: { // currently active
 *       bg: '#ffffff',
 *       fg: '#222222',
 *       accent: '#ff0000'
 *     },
 *     inverted: {
 *       bg: '#222222',
 *       fg: '#ffffff',
 *       accent: '#ff0000'
 *     }
 *   }
 * }
 * ```
 *
 * @param {Object} props
 *
 * @example
 * import { colors } from 'pss'
 *
 * const Box = styled.div`
 *   ${colors}
 * `
 *
 * @example
 * // theme.palette.default.bg
 * <Box bg /> // background-color: #ffffff
 * <Box bg='auto' /> // background-color: #ffffff
 *
 * // theme.colors.black
 * <Box fg='black' /> // color: #222222
 *
 * // theme.palette.default.accent
 * <Box fg='accent' /> // color: #ff0000
 *
 * // theme.palette.default.bg, theme.palette.default.fg
 * <Box tm /> // background-color: #ffffff; color: #222222
 * <Box tm='auto' /> // background-color: #ffffff; color: #222222
 *
 * // theme.palette.inverted.bg, theme.palette.inverted.fg
 * <Box tm='inverted' /> // background-color: #222222; color: #fffffff
 *
 * // Valid color value
 * <Box bg="#ffff00" /> // background-color: #ffff00
 */

const colors = createStyles({
  tm: [
    rule('backgroundColor', colorValue('bg')),
    rule('color', colorValue('fg'))
  ],
  bg: rule('backgroundColor', colorValue('bg')),
  fg: rule('color', colorValue('fg'))
})

export {
  colors
}
