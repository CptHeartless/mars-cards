import * as React from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { PhotoSnapshot } from "../../models/photo"
import { CardHeader } from "./card-header"
import { CardBackground } from "./card-background"

export interface CardProps {
  photo: PhotoSnapshot,
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

const CARD: ViewStyle = {
  position: "relative",
  height: undefined,
  width: "100%",
}

const HEIGHT_OFFSET = 162

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Card(props: CardProps) {
  const { width, height } = Dimensions.get("window")
  const aspectRatio = width / (height - HEIGHT_OFFSET)
  const { photo, style } = props

  return (
    <View style={{ ...CARD, ...style, aspectRatio }}>
      <CardBackground src={photo.src}>
        <CardHeader title={photo.title} description={photo.description} date={photo.formattedDate}/>
      </CardBackground>
    </View>
  )
}
