import { routes } from "./config/routes"
import { createApp } from "vue"
import { App } from "./App"
import { createRouter } from "vue-router"
import { history } from "./shared/history"
import "@svgstore"
import { createPinia } from "pinia"
import { useMeStore } from "./store/useMeStore"

const router = createRouter({ history, routes })

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount("#app")

const meStore = useMeStore()
meStore.fetchMe()

const whiteList: Record<string, "exact" | "startsWith"> = {
  "/": "exact",
  "/items": "exact",
  "/welcome": "startsWith",
  "/sign_in": "startsWith",
}
//全局没登录都要登录
router.beforeEach((to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === "exact" && to.path === key) {
      return true
    }
    if (value === "startsWith" && to.path.startsWith(key)) {
      return true
    }
  }
  return meStore.mePromise!.then(
    () => true,
    () => "/sign_in?return_to=" + from.path
  )
})

if (DEBUG) {
  console.log("正在调试")
}