import { style } from '../core'
import { colorValue } from '../values'

/**
 * ```js
 * import { borderColor } from 'pss'
 * ```
 *
 * prop           | css             | theme                | value | default
 * :--------------|:----------------|:---------------------|:------|:-------------------------
 * `borderColor`  | `border-color ` | `color`, `palette.*` | ✓     | `theme.palette.default.border`
 *
 *
 * Related: {@link colorValue}, {@link style},
 *
 * @param {Object} props
 *
 * @example
 * import { borders, borderColor } from 'pss'
 *
 * const Box = styled.div`
 *   ${borders}
 *   ${borderColor}
 * `
 *
 * @example
 * <Box borderBottom='thick' borderColor='red' /> // border-left: 3px solid; border-color: red
 */

const borderColor = style({
  cssProp: 'borderColor',
  getValue: colorValue('border')
})

export {
  borderColor
}
