import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PhotoModel = types
  .model()
  .props({
    title: types.string,
    description: types.string,
    id: types.number,
    earthDate: types.string,
    src: types.string,
  })
  .views(self => ({
    get date() {
      return new Date(self.earthDate)
    },
  }))
  .views(self => ({
    get formattedDate() {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]

      return `${monthNames[self.date.getMonth()]} ${self.date.getDay()}, ${self.date.getFullYear()}`
    },
  }))

type PhotoType = Instance<typeof PhotoModel>
export interface Photo extends PhotoType {}
type PhotoSnapshotType = SnapshotOut<typeof PhotoModel>
export interface PhotoSnapshot extends PhotoSnapshotType {
  date: Date,
  formattedDate: string,
}
