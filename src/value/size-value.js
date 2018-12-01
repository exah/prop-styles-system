// @flow

import type { PropStyleValue, StyleValue } from '../types'
import { isNum, isFn } from '@exah/utils'
import { SIZES_KEY } from '../constants'
import { getThemeMediaValue } from '../getters'
import { percentage, px } from '../utils'
import { boolValue } from './bool-value'

type Options = {
  transformValue: Function,
  getter: Function,
  themeKey: string
}

function createSizeValue ({
  transformValue = px,
  themeKey = SIZES_KEY,
  getter = getThemeMediaValue(themeKey, transformValue)
}: Options = {}): (defaultValue: Function | StyleValue) => Function {
  return (defaultValue = boolValue('100%', 0)) => (
    input: PropStyleValue,
    props,
    mediaKey
  ) => {
    const value = isNum(input)
      ? percentage(input)
      : isFn(defaultValue)
        ? defaultValue(input)
        : defaultValue

    return getter(input, value, mediaKey)
  }
}

/**
 * ```js
 * import { sizeValue } from 'pss'
 * ```
 * Must be used with {@link createRule}. See {@see sizes}.
 *
 * @param [transformValue = boolValue('100%', 0)]
 *
 * @example
 * import styled from 'react-emotion'
 * import pss, { createRule, sizeValue, boolValue } from 'pss'
 *
 * const mySizes = pss({
 *   h: createRule('height', sizeValue())
 *   w: createRule('width', sizeValue(boolValue('100%', 0))), // this is default - same as above
 *   l: createRule('left', sizeValue(boolValue(0, 'auto'))),
 *   r: createRule('right', sizeValue(boolValue(0, 'auto')))
 * })
 *
 * const Box = styled.div(mySizes)
 *
 * @example
 * <Box w /> // width: 100%
 * <Box w={false} /> // width: 0
 * <Box wM={(1 / 2)} /> // @media (max-width: 600px) { width: 50% }
 * <Box h='300px' /> // height: 300px
 * <Box l lM='auto' /> // left: 0; @media (max-width: 600px) { left: auto }
 * <Box l={20} r={10} /> // left: 20px; right: 10px
 */

const sizeValue: (transformValue: Function | StyleValue) => Function = createSizeValue()

export {
  createSizeValue,
  sizeValue
}
