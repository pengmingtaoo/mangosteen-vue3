/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type User = {
  id: number;
  email: string;
}

type Tag = {
  id: number
  user_id: number
  name: string
  sign: string
  kind: "expenses" | "income"
}

type Resources<T = any> = {
  //T从这里传，T不传就=any
  resources: T[] //接收一个数组，现不知道类型，现在用T占位
  pager: {
    page: number
    per_page: number
    count: number
  }
}

type Resource<T> = {
  resource: T
}

type ResourceError = {
  errors: Record<string, string[]>
}

type Item = {
  //记录
  id: number
  user_id: number
  amount: number
  tag_ids: number[]
  tags?: Tag[]
  happen_at: string
  kind: "expenses" | "income"
}

type FormErrors<T> = { [K in keyof typeof T]: string[] }