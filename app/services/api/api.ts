import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getPhotos(page: number, sol: number): Promise<Types.GetMarsPhotosResult> {
    const response: ApiResponse<{ photos: Types.RoverPhoto[] }> = await this.apisauce.get('mars-photos/api/v1/rovers/curiosity/photos', {
      api_key: this.config.apiKey, // eslint-disable-line @typescript-eslint/camelcase
      page,
      sol
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) throw new Error(problem.kind)
    }

    const convertPhotos = (raw: Types.RoverPhoto): Types.Photo => ({
      src: raw.img_src,
      earthDate: raw.earth_date,
      description: raw.camera.full_name,
      title: raw.rover.name,
      id: raw.id,
    })

    try {
      const photos: Types.Photo[] = response.data.photos.map(convertPhotos)
      return { kind: "ok", photos }
    } catch {
      throw new Error("bad-data")
    }
  }
}
