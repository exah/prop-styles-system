import { variant } from '../core'

/**
 * ```js
 * import { boxStyle } from 'pss'
 * ```
 *
 * Global box styles system, like in [Sketch](https://sketchapp.com/docs/styling/shared-styles/).
 *
 * Related: {@link variant}.
 *
 * Add `boxStyle` to `theme`:
 *
 * ```js
 * const theme = {
 *   boxStyle: {
 *     red: {
 *       backgroundColor: 'red',
 *       color: 'white'
 *     },
 *     shadow: {
 *       boxShadow: '0 0 20px 0 rgba(0, 0, 0, .3)'
 *     }
 *   }
 * }
 * ```
 *
 * @param {Object} props
 *
 * @example
 * import { boxStyle } from 'pss'
 *
 * const Box = styled.div`
 *   ${boxStyle}
 * `
 *
 * @example
 * <Box boxStyle='red' /> // → background-color: red; color: white;
 * <Box boxStyle='shadow' /> // → box-shadow: 0 0 20px 0 rgba(0, 0, 0, .3);
 *
 * @example
 * const Box = styled.div`
 *   ${boxStyle.variant}
 * `
 *
 * <Box variant='red' /> // → background-color: red; color: white;
 * <Box variant='shadow'  /> // → box-shadow: 0 0 20px 0 rgba(0, 0,
 */

const boxStyle = variant({
  themeKey: 'boxStyle',
  prop: 'boxStyle'
})

export {
  boxStyle
}
