import { AxiosError } from "axios"
//含有语义错误，无法响应。
export const onFormError =  (error:AxiosError<ResourceError>,fn:(errors:ResourceError)=>void) => {
      if (error.response?.status === 422) {
        fn(error.response.data)
      }
      throw error
    }
