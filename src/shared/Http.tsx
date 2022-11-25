import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { Toast } from "vant"

type GetConfig = Omit<AxiosRequestConfig, "params" | "url" | "method">
type PostConfig = Omit<AxiosRequestConfig, "url" | "data" | "method">
type PatchConfig = Omit<AxiosRequestConfig, "url" | "data">
type DeleteConfig = Omit<AxiosRequestConfig, "params">

export class Http {
  instance: AxiosInstance //实例
  constructor(baseURL: string) {
    //构造
    this.instance = axios.create({
      //初始化
      baseURL,
    })
  }

  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: "get" })
  }
  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: "post" })
  }
  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: "patch" })
  }
  // destroy
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: "delete" })
  }
}

//选择后端的数据接口

export const http = new Http(DEBUG ? "api/v1" : "http://121.196.236.94:3000/api/v1")

//config 请求相关的配置
http.instance.interceptors.request.use((config) => {
  //请求拦截，登录成功后跳转
  const jwt = localStorage.getItem("jwt")
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}` //http请求头里都有jwt
  }
  if (config._autoLoading === true) {
    //添加loading
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    })
  }
  return config
})

http.instance.interceptors.response.use(
  (response) => {
    if (response.config._autoLoading === true) {
      Toast.clear()
    }
    return response
  },
  (error: AxiosError) => {
    if (error.response?.config._autoLoading === true) {
      Toast.clear()
    }
    throw error
  }
)

if (DEBUG) {
  import("../mock/mock").then(
    ({
      mockItemCreate,
      mockItemIndex,
      mockItemIndexBalance,
      mockItemSummary,
      mockSession,
      mockTagEdit,
      mockTagIndex,
      mockTagShow,
    }) => {
      const mock = (response: AxiosResponse) => {
        switch (response.config?._mock) {
          case "tagIndex":
            ;[response.status, response.data] = mockTagIndex(response.config)
            return true
          case "itemCreate":
            ;[response.status, response.data] = mockItemCreate(response.config)
            return true
          case "tagShow":
            ;[response.status, response.data] = mockTagShow(response.config)
            return true
          case "tagEdit":
            ;[response.status, response.data] = mockTagEdit(response.config)
            return true
          case "itemIndex":
            ;[response.status, response.data] = mockItemIndex(response.config)
            return true
          case "itemIndexBalance":
            ;[response.status, response.data] = mockItemIndexBalance(response.config)
            return true
          case "session":
            ;[response.status, response.data] = mockSession(response.config)
            return true
          case "itemSummary":
            ;[response.status, response.data] = mockItemSummary(response.config)
            return true
        }
        return false
      }

      //mock对response进行篡改
      http.instance.interceptors.response.use(
        (response) => {
          mock(response)
          if (response.status >= 400) {
            throw { response }
          } else {
            return response
          }
        },
        (error) => {
          mock(error.response)
          if (error.response.status >= 400) {
            throw error
          } else {
            return error.response
          }
        }
      )

      http.instance.interceptors.response.use(
        (response) => {
          return response
        },
        (error) => {
          if (error.response) {
            const axiosError = error as AxiosError
            if (axiosError.response?.status === 429) {
              alert("你太频繁了")
            }
          }
          throw error
        }
      )
    }
  )
}
