import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export interface Camera {
  name: string,
  full_name: string // eslint-disable-line camelcase
}

export interface RoverPhoto {
  camera: Camera & { rover_id: string, id: string } // eslint-disable-line camelcase
  rover: {
    cameras: Camera[]
    id: number
    landing_date: string // eslint-disable-line camelcase
    launch_date: string // eslint-disable-line camelcase
    max_date: string // eslint-disable-line camelcase
    max_sol: number // eslint-disable-line camelcase
    name: string
    status: string
    total_photos: number, // eslint-disable-line camelcase
  }
  earth_date: string // eslint-disable-line camelcase
  id: number
  img_src: string // eslint-disable-line camelcase
  sol: number
}

export interface Photo {
  description: string,
  title: string,
  earthDate: string,
  id: number,
  src: string,
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetMarsPhotosResult = { kind: "ok", photos: Photo[] } | GeneralApiProblem
