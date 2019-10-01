import React, { useState } from "react"
import { Animated, Dimensions, View, ViewStyle } from "react-native"
import { PhotoSnapshot } from "../../models/photo"
import { spacing } from "../../theme"
import { Card } from "../card"
import { Swipeable } from "../swipeable"

export interface CardListProps {
  photos: PhotoSnapshot[],
  /**
   * Supposed to pass here the value that will be lower on 1 than photos.length,
   * to preload image before showing
   */
  visibleCards: number,
  onSwipeRight?: () => void,
  onSwipeLeft?: () => void,
}

const CONTAINER: ViewStyle = {
  position: "relative",
}

const CARD: ViewStyle = {
  position: "absolute",
}

const PAD_HORIZONTAL = spacing[4]

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function CardList(props: CardListProps) {
  const { photos, onSwipeLeft, onSwipeRight, visibleCards } = props
  const { width } = Dimensions.get("window")
  const [translateX] = useState(new Animated.Value(0))
  const [dynamicOffset] = useState(new Animated.Value(PAD_HORIZONTAL))
  const threshold = (width - spacing[4] * 2) / 2
  const finishOffset = width - spacing[4]

  const onSuccessfulSwipe = (offsetX: number) => {
    const isRight = offsetX > 0
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: isRight ? finishOffset : -finishOffset,
        useNativeDriver: true,
        isInteraction: true,
      }),
      Animated.timing(dynamicOffset, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        isInteraction: true,
      })
    ]).start()

    setTimeout(() => {
      (isRight ? onSwipeRight : onSwipeLeft)()
      translateX.flattenOffset()
      translateX.setValue(0)
      dynamicOffset.setValue(PAD_HORIZONTAL)
    }, 300)
  }

  const onCanceledSwipe = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start()

    setTimeout(() => {
      translateX.flattenOffset()
      translateX.setValue(0)
    }, 250)
  }

  return (
    <View style={CONTAINER}>
      {photos.map((item, index) => {
        const cardPlace = index + visibleCards - photos.length
        const isLast = cardPlace === visibleCards - 1
        const isVisible = cardPlace >= 0
        const animatedViewStyles = {
          paddingHorizontal: isLast
            ? PAD_HORIZONTAL
            : dynamicOffset.interpolate({
              inputRange: [0, PAD_HORIZONTAL],
              outputRange: [
                PAD_HORIZONTAL * (visibleCards - cardPlace - 1),
                PAD_HORIZONTAL * (visibleCards - cardPlace),
              ],
            }) as any,
          paddingVertical: isLast
            ? PAD_HORIZONTAL * visibleCards
            : dynamicOffset.interpolate({
              inputRange: [0, PAD_HORIZONTAL],
              outputRange: [
                PAD_HORIZONTAL * (cardPlace + 2),
                PAD_HORIZONTAL * (cardPlace + 1),
              ],
            }) as any,
          opacity: isVisible
            ? 1
            : dynamicOffset.interpolate({
              inputRange: [0, PAD_HORIZONTAL],
              outputRange: [1, 0],
            }) as any
        }

        return (
          <View key={item.id} style={CARD}>
            <Swipeable
              isGestureEnabled={isLast}
              successfulSwipeHandler={onSuccessfulSwipe}
              canceledSwipeHandler={onCanceledSwipe}
              threshold={threshold}
              translateX={translateX}
              style={animatedViewStyles}
            >
              <Card photo={item} />
            </Swipeable>
          </View>
        )
      })
      }
    </View>
  )
}
