import { ViewStyle, TextStyle } from "react-native"
import { IconTypes } from "../icon"

export interface HeaderProps {
  /**
   * Main header, e.g. POWERED BY BOWSER
   */
  headerTx?: string

  /**
   * header non-i18n
   */
  headerText?: string

  /**
   * Icon that should appear on the left
   */
  leftIcon?: IconTypes

  /**
   * Text that should appear instead of left icon
   */
  leftTx?: string,
  leftTxStyle?: TextStyle,

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * Icon that should appear on the right
   */
  rightIcon?: IconTypes

  /**
   * Text that should appear instead of right icon
   */
  rightTx?: string,
  rightTxStyle?: TextStyle,

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * Container style overrides.
   */
  style?: ViewStyle

  /**
   * Title style overrides.
   */
  titleStyle?: TextStyle
}
