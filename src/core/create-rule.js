// @flow

import type {
  StyleValue,
  PropStyle,
  PropStyleValue,
  Style
} from '../types'

import { isBool } from '@exah/utils'

const createRule = (
  cssProp: string,
  trueVal: StyleValue,
  falseVal: StyleValue
): PropStyle => (val: PropStyleValue | StyleValue): Style => ({
  [cssProp]: isBool(val) ? (val === true ? trueVal : falseVal) : val
})

export {
  createRule
}