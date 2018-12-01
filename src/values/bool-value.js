// @flow

import type { StyleValue, PropStyleValue } from '../types'
import { isBool } from '@exah/utils'

/**
 * ```js
 * import { boolValue } from 'pss'
 * ```
 *
 * Get value for rule based boolean condition, other values passed without modification.
 * Must be used with {@link createRule}.
 *
 * @example
 * import pss, { createRule, boolValue } from 'pss'
 * import styled from 'react-emotion'
 *
 * const Box = styled.div(pss({
 *   opacity: createRule('opacity', boolValue(1, 0))
 * }))
 *
 * @example
 * <Box opacity={true} /> // → { opacity: 1 }
 * <Box opacity={false} /> // → { opacity: 0 }
 * <Box opacity={0.5} /> // → { opacity: 0.5 }
 */

const boolValue = (trueVal: ? StyleValue, falseVal: ? StyleValue) => (
  input: PropStyleValue
) => isBool(input) ? (input === true ? trueVal : falseVal) : input

export {
  boolValue
}
