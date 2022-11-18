import { onMounted } from "vue"
import { useMeStore } from "../store/useMeStore"

export const useAfterMe = (fn: () => void) => {
  const MeStore = useMeStore()
  onMounted(() => {
    MeStore.mePromise!.then(fn, () => undefined)
  })
}
