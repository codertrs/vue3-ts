import { computed } from "vue"
import { useStore } from "vuex"

export function useMapper(mapper: any, mapFn: any) {
  // 拿到store独享
  const store = useStore()

  //获取到对应的对象的functions
  const storeStateFns = mapFn(mapper)

  // 对数据进行转换
  const storeState: any = {}

  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({
      $store: store
    })
    storeState[fnKey] = computed(fn)
  })

  return storeState
}
