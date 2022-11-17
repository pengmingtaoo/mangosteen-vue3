import { defineComponent, PropType, reactive, ref, watch } from "vue"
import { RouterLink } from "vue-router"
import { userAfterMe } from "../../hooks/useAfterMe"
import { Button } from "../../shared/Button"
import { Center } from "../../shared/Center"
import { DateTime } from "../../shared/DateTime"
import { FloatButton } from "../../shared/FloatButton"
import { http } from "../../shared/Http"
import { Icon } from "../../shared/Icon"
import { Money } from "../../shared/Money"
import { useItemStroe } from "../../store/useItemStore"
import s from "./ItemSummary.module.scss"
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    if (!props.startDate || !props.endDate) {
      return () => <div>请选择时间范围</div>
    }
    const itemStore = useItemStroe(["items", props.startDate, props.endDate])()

    userAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate))
    //自定义时间 items
    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.reset()
        itemStore.fetchItems()
      }
    )
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    })
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) {
        return
      }
      const response = await http.get(
        "/items/balance",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
        },
        {
          _mock: "itemIndexBalance",
        }
      )
      Object.assign(itemsBalance, response.data)
    }
    userAfterMe(fetchItemsBalance)
    //自定义时间 Balance
    watch(
      () => [props.startDate, props.endDate],
      () => {
        Object.assign(itemsBalance, {
          expenses: 0,
          income: 0,
          balance: 0,
        })
        fetchItemsBalance()
      }
    )

    return () => (
      <div class={s.wrapper}>
        {itemStore.items && itemStore.items.length > 0 ? (
          <>
            <ul class={s.total}>
              <li>
                <span>收入</span>
                <span>
                  <Money value={itemsBalance.income} />
                </span>
              </li>
              <li>
                <span>支出</span>
                <span>
                  <Money value={itemsBalance.expenses} />
                </span>
              </li>
              <li>
                <span>净收入</span>
                <span>
                  <Money value={itemsBalance.balance} />
                </span>
              </li>
            </ul>
            <ol class={s.list}>
              {itemStore.items.map((item) => (
                <li>
                  <div class={s.sign}>
                    <span>{item.tags![0].sign}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{item.tags![0].name}</span>
                      <span class={s.amount}>
                        ￥<Money value={item.amount} />
                      </span>
                    </div>
                    <div class={s.time}>
                      <DateTime value={item.happen_at} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div class={s.more}>
              {itemStore.hasMore ? (
                <Button onClick={() => itemStore.fetchNextPage(props.startDate, props.endDate)}>加载更多</Button>
              ) : (
                <span>没有更多</span>
              )}
            </div>
          </>
        ) : (
          <>
            <Center class={s.pig_wrapper}>
              <Icon
                name="pig"
                class={s.pig}
              />
            </Center>
            <div class={s.button_wrapper}>
              <RouterLink to="/items/create">
                <Button class={s.button}>开始记账</Button>
              </RouterLink>
            </div>
          </>
        )}
        <RouterLink to="/items/create">
          <FloatButton iconName="add" />
        </RouterLink>
      </div>
    )
  },
})
