import { async } from "@kangc/v-md-editor"
import { defineStore } from "pinia"
import { reqGetBrowseList, reqGetStressTypeList, reqGetStressTypeItemList, reqGetGeneOverview, reqGetSpeciesList, reqGetGeneListBySciName } from "~/api/index.js"

export const useBrowseStore = defineStore('browseStore', {
    state: () => {
        return {
            browseDataList: [], // 首页列表
            stressTypeDataList: [], // stress type详情页list
            stressTypeItemDataList: [], // stress type详情页各项基因list
            itemPageTotal: 1,
            geneOverviewDataList: {}, // 基因概述列表
            speciesDataList: [], // 物种名列表
            geneDataList: [] //基因列表
        }
    },
    actions: {
        // browse -- 首页数据
        getBrowseListData() {
            reqGetBrowseList().then(res => {
                this.browseDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- street type详情数据
        getStressTypeListData() {
            reqGetStressTypeList().then(res => {
                this.stressTypeDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- stress type详情页各项基因list
        getStressTypeListItemData(data) {
            reqGetStressTypeItemList(data).then(res => {
                this.stressTypeItemDataList = res.data.records
                this.itemPageTotal = res.data.total
                console.log(res)
            }).catch(err => Promise.reject(err))
        },

        // browse -- 根据基因名获取基因概述
        getGeneOverviewData(geneName) {
            reqGetGeneOverview(geneName).then(res => {
                this.geneOverviewDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- species获取物种名称
        getSpeciesListData() {
            reqGetSpeciesList().then(res => {
                this.speciesDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- species获取基因名称
        getGeneListDataBySciName(scientificName) {
            reqGetGeneListBySciName(scientificName).then(res => {
                this.geneDataList = res.data
            })
        }

    }
})