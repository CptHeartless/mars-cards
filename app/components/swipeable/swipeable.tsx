import React, { ReactNode } from "react"
import { Animated, ViewStyle } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from "react-native-gesture-handler"

export interface SwipeableProps {
  threshold: number,
  children: ReactNode,
  isGestureEnabled?: boolean,
  successfulSwipeHandler?: (translationX: number) => void,
  canceledSwipeHandler?: (translationX: number) => void,
  style?: ViewStyle,
  translateX?: Animated.Value,
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Swipeable(props: SwipeableProps) {
  const {
    threshold,
    children,
    isGestureEnabled = true,
    successfulSwipeHandler = () => void 0,
    canceledSwipeHandler = () => void 0,
    style = {},
    translateX = new Animated.Value(0),
  } = props
  const swipeEvent = Animated.event(
    [
      {
        nativeEvent: { translationX: translateX, },
      },
    ],
    { useNativeDriver: isGestureEnabled }
  )

  let offsetX = 0
  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    offsetX += event.nativeEvent.translationX

    if (State.END !== event.nativeEvent.state) {
      translateX.setOffset(offsetX)
      translateX.extractOffset()
      return
    }

    if (Math.abs(offsetX) >= threshold) {
      if (successfulSwipeHandler) successfulSwipeHandler(offsetX)
    } else {
      offsetX = 0
      if (canceledSwipeHandler) canceledSwipeHandler(offsetX)
    }
  }

  return (
    <PanGestureHandler
      enabled={isGestureEnabled}
      onGestureEvent={swipeEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          ...style,
          transform: [{ translateX: isGestureEnabled ? translateX as any : 0 }]
        }}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  )
}
