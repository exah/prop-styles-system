import { createPropStyles, rule } from '../core'
import { boolValue } from '../values'

/**
 * ```js
 * import { opacity } from 'pss'
 * ```
 *
 * prop         | css             | type                 | value | true       | false
 * :------------|:----------------|:---------------------|:------|:-----------|:--------
 * `opacity`    | `opacity`       | `0...1`, `Boolean`   | ✓     | `1`        | `0`
 *
 * ⚠️ This prop may not be filtered by CSS-in-JS libraries, so you may need to provide custom prop filtering.
 *
 * @example
 * import { opacity } from 'pss'
 *
 * const Box = styled.div`
 *   ${opacity}
 * `
 *
 * @example
 * <Box opacity='1' /> // → opacity: 1
 * <Box opacity={0.5} /> // → opacity: 0.5
 * <Box opacity={true} /> // → opacity: 1
 * <Box opacity={false} /> // → opacity: 0
 */

export const opacity = createPropStyles({
  opacity: rule('opacity', boolValue(1, 0))
})
