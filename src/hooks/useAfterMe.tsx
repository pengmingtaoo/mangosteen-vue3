import { onMounted } from "vue"
import { useMeStore } from "../store/useMeStore"

export const userAfterMe = (fn: () => void) => {
  const MeStore = useMeStore()
  onMounted(async () => {
    try {
      await MeStore.mePromise
    } catch {
      return
    }

    fn()
  })
}
