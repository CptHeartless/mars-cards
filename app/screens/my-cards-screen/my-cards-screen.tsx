import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "../../components/screen"
import { Header } from "../../components/header"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { CardList } from "../../components/card-list"

export interface MyCardsScreenProps extends NavigationScreenProps<{}> {
}

const FULL: ViewStyle = {
  flex: 1,
}

const SCREEN: ViewStyle = {
  height: "100%",
  width: "100%",
  flex: 1,
  flexDirection: "column"
}

const TITLE_STYLE: TextStyle = {
  color: color.palette.gableGreen,
  fontWeight: "500",
  fontSize: 18,
}

const HEADER_STYLE: ViewStyle = {
  paddingTop: spacing[0],
}

const UNDO_TEXT_STYLE: TextStyle = {
  color: color.palette.geyser,
  fontWeight: "500",
  fontSize: 16,
}

export const MyCardsScreen: React.FunctionComponent<MyCardsScreenProps> = observer(() => {
  const { photoStore } = useStores()
  useEffect(() => {
    photoStore.fetchPhotos()
  }, [])

  return (
    <View style={FULL}>
      <Screen style={SCREEN} backgroundColor={color.palette.alabaster} preset="scroll">
        <Header
          headerTx="myCardsScreen.headerText"
          style={HEADER_STYLE}
          titleStyle={TITLE_STYLE}
          leftTx="myCardsScreen.headerUndoButton"
          leftTxStyle={UNDO_TEXT_STYLE}
          rightIcon="heart"
        />
        {photoStore.status === "done" &&
          <CardList
            photos={photoStore.photos.slice(0, 4).reverse()}
            onSwipeLeft={photoStore.dislikePhoto}
            onSwipeRight={photoStore.likePhoto}
            visibleCards={3}
          />
        }
      </Screen>
    </View>
  )
})
