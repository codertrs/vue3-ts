import { Module } from "vuex"
import { IRootState } from "@/store/types"
import { ISystemState } from "./types"

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/main/system/system"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      categoryList: [],
      categoryCount: 0,
      departmentList: [],
      departmentCount: 0,
      storyList: [],
      storyCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },

    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    },

    changeCategoryList(state, list: any[]) {
      state.categoryList = list
    },
    changeCategoryCount(state, count: number) {
      state.categoryCount = count
    },
    changeDepartmentList(state, list: any[]) {
      state.departmentList = list
    },
    changeDepartmentCount(state, count: number) {
      state.departmentCount = count
    },
    changeStoryList(state, list: any[]) {
      state.storyList = list
    },
    changeStoryCount(state, count: number) {
      state.storyCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.??????pageUrl
      debugger
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      console.log("pageName", pageName)

      console.log("pageUrl", pageUrl)

      //???????????? ??????????????????
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      //??????????????????????????????mutationss
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    // ????????????
    async deletePageDataAction({ dispatch }, payload: any) {
      //  1. ?????????pageName???id
      //  pageName-> /users
      //  id -> /users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 2.????????????????????????
      await deletePageData(pageUrl)

      // 3.???????????????????????????
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    //????????????
    async createPageDataAction({ dispatch }, payload: any) {
      // ?????????????????????
      debugger
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // ??????????????????
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // ????????????
    async editPageDataAction({ dispatch }, payload: any) {
      debugger
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      //??????????????????
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default systemModule
