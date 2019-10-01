import React, { ReactNode } from "react"
import { ImageBackground, ImageStyle, View, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"

export interface CardBackgroundProps {
  src: string,
  children: ReactNode,
}

const CARD_IMAGE: ImageStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  resizeMode: "cover",
  zIndex: 0,
}

const CARD_GRADIENT: ViewStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: 1,
}

const CARD_SHADOW: ViewStyle = {
  shadowColor: "#102027",
  shadowOffset: {
    width: 0,
    height: 16,
  },
  shadowOpacity: 0.16,
  shadowRadius: 24,
}

const CARD_WRAPPER: ViewStyle = {
  borderRadius: 8,
  overflow: "hidden",
}

const CARD_CONTENT: ViewStyle = {
  width: "100%",
  position: "relative",
  height: "100%",
  flexDirection: "column",
  zIndex: 10
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function CardBackground(props: CardBackgroundProps) {
  // grab the props
  const { src, children } = props

  return (
    <View style={CARD_SHADOW}>
      <View style={CARD_WRAPPER}>
        <ImageBackground source={{ uri: src }} style={CARD_IMAGE} />
        <LinearGradient colors={["#00000050", "#00000000"]} style={CARD_GRADIENT}/>
        <View style={CARD_CONTENT}>
          { children }
        </View>
      </View>
    </View>
  )
}
