import { defineStore } from "pinia"

import {
    reqGetDownFiles, reqPostDownFilesByIdAndName, reqPostFilesList, reqPostStaticCount
} from "~/api/file.js";

export const useFileStore = defineStore('file', {
    state: () => {
        return {
            filesList: [],
            itemPageTotal: 1,
            filesCount:{}
        }
    },
    actions: {

        getFilesList(data) {
            reqPostFilesList(data).then(res => {
                this.filesList = res.data.records
                this.itemPageTotal = res.data.total
            }).catch(err => Promise.reject(err))
        },
        async getDownFlies(id) {
            return reqGetDownFiles(id).then(res => {
                return Promise.resolve(res)
            }).catch(err => Promise.reject(err))
        },
        getFilesCount() {
            reqPostStaticCount().then(res => {
                this.filesCount = res.data
            }).catch(err => Promise.reject(err))
        },
        async getFilesByIdAndName(id,name){
            return reqPostDownFilesByIdAndName(id,name).then(res=>{
                return Promise.resolve(res)
                console.log("12312")
            }).catch(err => {
                console.log("asdasdasdasdsa")
                Promise.reject(err)
            })
        },


    }
})