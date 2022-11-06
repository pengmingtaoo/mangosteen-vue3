import { ref } from "vue"
//重复点击按钮发验证码
export const useBool = (initialValue: boolean) => {
  const bool = ref(initialValue)
  return {
    ref: bool,
    toggle: () => bool.value != bool.value,
    on: () => bool.value = true,
    off:() => bool.value = false

  }
}