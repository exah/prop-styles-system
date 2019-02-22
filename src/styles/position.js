import { createStyles, rule } from '../core'

/**
 * ```js
 * import { position } from 'pss'
 * ```
 *
 * prop       | css                        | type      | value | true    | false
 * :----------|:---------------------------|:----------|:------|:--------|:--------
 * `position` | [`position`][position-url] | `String`  | ✓     | —       | —
 *
 * [position-url]: https://developer.mozilla.org/en-US/docs/Web/CSS/position
 *
 * Related: {@link rule}, {@link direction}.
 *
 * @param {Object} props
 *
 * @example
 * import { position, direction } from 'pss'
 *
 * const Box = styled.div`
 *   ${position}
 *   ${direction}
 * `
 *
 * @example
 * <Box position='absolute' top={0.2} left={0} /> // position: absolute; top: 20%; left: 0
 */

const position = createStyles({
  position: rule('position')
})

export {
  position
}
