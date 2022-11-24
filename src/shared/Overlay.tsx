import { defineComponent, onMounted, PropType, ref } from "vue";
import s from "./Overlay.module.scss";
import { Icon } from "./Icon";
import { RouterLink, useRoute } from "vue-router"
import { Dialog } from "vant"
import { useMeStore } from "../store/useMeStore"
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup(props, context) {
    const meStore = useMeStore()
    const refSelected = ref(0)
    const close = () => {
      props.onClose?.()
    }
    const route = useRoute()
    const me = ref<User>()
    onMounted(async () => {
      const response = await meStore.mePromise
      me.value = response?.data.resource
    })
    const onSignOut = async () => {
      await Dialog.confirm({
        title: "确认",
        message: "确定要退出登录吗？",
      })

      localStorage.removeItem("jwt")
      window.location.reload() //刷新页面
    }
    return () => (
      <>
        <div
          class={s.mask}
          onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ? (
              <div>
                <h2 class={s.email}>{me.value.email}</h2>
                <p onClick={onSignOut}>点击这里退出登录</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink
                  to="/items/list"
                  active-class={s.selected}
                  class={s.action}>
                  <Icon
                    name="fast"
                    class={s.icon}
                  />
                  <span>返回首页</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/items/create"
                  active-class={s.selected}
                  class={s.action}>
                  <Icon
                    name="pig"
                    class={s.icon}
                  />
                  <span>开始记账</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/statistics"
                  active-class={s.selected}
                  class={s.action}>
                  <Icon
                    name="statistics"
                    class={s.icon}
                  />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/export"
                  active-class={s.selected}
                  class={s.action}>
                  <Icon
                    name="export"
                    class={s.icon}
                  />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/notify"
                  active-class={s.selected}
                  class={s.action}>
                  <Icon
                    name="alarm"
                    class={s.icon}
                  />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    )
  },
})

export const OverlayIcon = defineComponent({
  
  setup(props, context) {
    const refoverlayVisible = ref(false);
    const onClickMenu = () => {
      refoverlayVisible.value = !refoverlayVisible.value;
    };
    return () => 
      <>
        <Icon name="menu" class={s.icon} onClick={onClickMenu} />
        {refoverlayVisible.value && (
          <Overlay onClose={() => (refoverlayVisible.value = false)} />
        )}
      </>
  }
})
