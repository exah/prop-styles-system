// @flow

import type {
  CSSProp,
  CSSVal,
  PropStyleFn
} from '../types'

import { isStr, curryN } from '@exah/utils'
import { getSize, themePath } from '../utils/getters'
import { sizeValue, toCssRule } from '../utils/helpers'
import { everyMediaValue } from './every-media'

/**
 * ```js
 * import { createSizeProp } from 'pss'
 * ```
 *
 * @param [cssProp] — Any CSS prop like `width`, `height`, `left`, ...
 * @param [toPx = true] — Add `px` unit to `number` result
 *
 * @example
 * import styled from 'react-emotion'
 * import { createSizeProp, createPropStyles } from 'pss'
 *
 * const mySizes = createPropStyles({
 *   w: createSizeProp('width', '100%', 0, true), // this is default
 *   h: createSizeProp('height'), // same as above
 *   l: createSizeProp('left', 0, 'auto'),
 *   r: createSizeProp('right', 0, 'auto')
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

const createSizeProp = (
  cssProp: CSSProp,
  trueVal?: CSSVal = '100%',
  falseVal?: CSSVal = 0,
  toPx?: boolean = true
): PropStyleFn => curryN(2, (propValue, { theme }, mediaKey, isRawValue) => {
  const cssRule = toCssRule(cssProp, toPx)

  if (isRawValue === true) {
    return cssRule(propValue)
  }

  if (isStr(propValue)) {
    const customPathValue = themePath(propValue, null)(theme)
    if (customPathValue !== null) return cssRule(customPathValue)
  }

  const size = sizeValue(propValue, trueVal, falseVal)

  if (size !== propValue) {
    return cssRule(size)
  }

  const themeSize = getSize(theme, propValue)

  if (themeSize == null) {
    return cssRule(propValue)
  }

  return everyMediaValue(
    theme,
    mediaKey,
    themeSize,
    cssRule
  )
})

const createSizeStyle = (cssProp: CSSProp, ...sizeValueArgs?: [ CSSVal, CSSVal ]): PropStyleFn =>
  (val = true, ...args) => createSizeProp(cssProp, ...sizeValueArgs)(val, ...args)

export {
  createSizeStyle,
  createSizeProp
}
