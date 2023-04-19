// Search模块api
import axios from "~/api/http"

// Search 属性list
export function reqGetAttributeList() {
    return axios.post('/searchBrowse/listAttributeCount')
}

// Search 属性详情list
export function reqGetListByAttribute(attrName) {
    return axios.get(`/searchBrowse/listByAttribute?name=${attrName}`)
}

//Search 根据属性和属性详情获取的基因list
export function reqGetListByAttrAndName(data) {
    return axios.post('/searchBrowse/listByAttributeAndName',data)
}

// search 模糊查询
export function reqGetFuzzySearchList(searchContent) {
    return axios.post(`/searchBrowse/searchTips?searchContent=${searchContent}`)
}

// search 根据模糊查询结果获取数据
export function reqGetListBySearchRes(data) {
    return axios.post('/searchBrowse/search',data)
}

// search MenuList -- Species
export function reqPostMenuSpeciesList() {
    return axios.post('searchBrowse/MenuSpecies')
}

// search MenuList -- StressType
export function reqPostMenuStressTypeList() {
    return axios.post('searchBrowse/menuStressType')
}

// search MenuList -- GeneFamily
export function reqPostMenuGeneFamilyList() {
    return axios.post('searchBrowse/menuGeneFamily')
}

// search MenuList -- PhenotypeGroup
export function reqPostMenuPhenotypeGroupList() {
    return axios.post('searchBrowse/menuPhenotypeGroup')
}

// search MenuList -- ExpressionOrgans
export function reqPostExpressionOrgansList() {
    return axios.post('searchBrowse/menuExpressionOrgans')
}

// search MenuList -- SubCellular
export function reqPostMenuSubCellularList() {
    return axios.post('searchBrowse/menuSubCellular')
}

// search -- multipleChoice
export function reqPostMultipleChoiceList(data) {
    return axios.post('searchBrowse/listByMultipleChoice',data)
}