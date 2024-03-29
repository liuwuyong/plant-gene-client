<template>
    <Title :page-title="pageTitle" />
    <div class="container">
        <!-- 搜索框 -->
        <el-row>
            <el-input v-model="searchContent" class="w-50  mb-4 " size="large" placeholder="Search"
                :suffix-icon="Search" @input="change" />
        </el-row>

        <!-- 基因列表 -->
        <el-row>
            <!-- table -->
            <el-table :data="stressTypeGeneList" style="width: 100%" height="80vh" stripe>
                <el-table-column fixed prop="gene" label="Gene" fit>
                    <template v-slot="{ row }">
                        <a href="" @click.prevent="goGeneDetail(row)" class="underline">{{row.gene}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="Species" type="name" fit />
                <el-table-column prop="product" label="Gene Product">
                  <template v-slot="{ row }">
                    <span class="table-content">{{ row.product }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="localization" label="Subcellular Localization" type="localization" fit />
                <el-table-column prop="organs" label="Expression Organs" type="organs" fit>
                    <!-- tag -->
                    <template v-slot="scope">
                        <el-tag class="ml-2 mt-1" effect="dark" :type="tagType[index%4]"
                            v-for="(item,index) in scope.row.organs" :key="index">
                            {{item}}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <!-- pagination -->
            <div style="margin-top: 16px;width: 100%;">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    layout="prev, pager, next, jumper" :total="pageTotal" @current-change="handleCurrentChange" />
            </div>
        </el-row>
    </div>
</template>

<script setup>
    import Title from '~/components/PageCenterTitle.vue'
    import { ref, reactive, computed } from 'vue'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import router from "~/router"
    import { useRoute } from 'vue-router'
    import { Search } from '@element-plus/icons-vue'

    const store = useBrowseStore()
    const route = useRoute()

    const pageTitle = "List of " + route.query.stressName + " Genes"

    // 搜索框内容
    const searchContent = ref('')

    // 基因列表
    const stressTypeGeneList = computed(() => store.stressTypeItemDataList)

    // pagination 数据
    const pageTotal = computed(() => store.itemPageTotal)
    const currentPage = ref(1)
    const pageSize = ref(15)

    const tagType = reactive(['success', 'info', 'warning', 'danger'])

    //  获取基因列表
    let getStressTypeItemData = () => store.getStressTypeListItemData({
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        searchContent: searchContent.value,
        stressName: route.query.stressName
    })

    getStressTypeItemData()

    // 搜索框内容值改变时触发
    let change = () => {
        getStressTypeItemData()
    }

    // currentPage改变时触发，重新获取table数据
    const handleCurrentChange = () => {
        getStressTypeItemData()

    }

    // 路由跳转-->基因概述
    let goGeneDetail = (row) => {
        router.push({
            name: 'geneoverview',
            query: {
                geneName: row.id
            }
        })
    }


</script>

<style scoped>
    @media screen and (min-width: 992px) {
        .container {
            max-width: 70%;
            margin: 0 auto;
        }
    }

    /* 手机端 */
    @media screen and (max-width: 993px) {
        .container {
            max-width: 100%;
        }
    }

    .el-pagination {
        margin-top: 10px;
        justify-content: center;
    }
    .table-content {
      word-break: keep-all;
      text-align: justify
    }
</style>