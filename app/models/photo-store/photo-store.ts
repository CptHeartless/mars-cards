import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { PhotoModel, PhotoSnapshot } from "../photo"
import { withEnvironment, withStatus } from "../extensions"

/**
 * Model description here for TypeScript hints.
 */
export const PhotoStoreModel = types
  .model("PhotoStore")
  .extend(withEnvironment)
  .extend(withStatus)
  .props({
    photos: types.optional(types.array(PhotoModel), []),
    page: types.optional(types.number, 0)
  })
  .views(self => ({
    get nextPage() {
      return self.page + 1
    },
  }))
  .actions(self => ({
    load: (photos: PhotoSnapshot[]) => {
      self.photos.replace(photos as any)
    },
    likePhoto: () => {
      self.photos.shift()
    },
    dislikePhoto: () => {
      self.photos.shift()
    },
  }))
  .actions(self => ({
    fetchPhotos: flow(function * () {
      self.status = "pending"
      try {
        const response = yield self.environment.api.getPhotos(self.nextPage, 0)
        self.load(response.photos)
        self.status = "done"
        self.page = self.nextPage
      } catch (e) {
        console.tron.trace(e)
        self.status = "error"
      }
    })
  }))

type PhotoStoreType = Instance<typeof PhotoStoreModel>
export interface PhotoStore extends PhotoStoreType {}
type PhotoStoreSnapshotType = SnapshotOut<typeof PhotoStoreModel>
export interface PhotoStoreSnapshot extends PhotoStoreSnapshotType {
  nextPage: number,
  load: (photos: PhotoSnapshot[]) => void,
  likePhoto: () => void,
  dislikePhoto: () => void,
  fetchPhotos: () => Promise<void>,
}
