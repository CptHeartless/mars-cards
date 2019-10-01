import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text"
import { color, spacing } from "../../theme"

export interface CardHeaderProps {
  title: string,
  description: string,
  date: string,
}

const CARD_HEADER_WRAPPER: ViewStyle = {
  flex: 1,
  flexWrap: "wrap",
  padding: spacing[5],
}

const CARD_TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: "500",
  lineHeight: 28,
  color: color.palette.white,
}

const CARD_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "400",
  lineHeight: 20,
  color: color.palette.white,
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function CardHeader(props: CardHeaderProps) {
  // grab the props
  const { title, description, date } = props

  return (
    <View style={CARD_HEADER_WRAPPER}>
      <Text text={title} style={CARD_TITLE}/>
      <Text text={description} style={CARD_TEXT}/>
      <Text text={date} style={CARD_TEXT}/>
    </View>
  )
}
