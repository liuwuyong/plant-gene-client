<template>
  <el-row>
    <el-col :span="24">
      <div class="search-bar">
        <el-select v-model="remoteValue" filterable remote clearable reserve-keyword
          placeholder="Please enter keywords e.g. ZmDREB2.7 --only reference data" :remote-method="remoteMethod" :loading="loading"
          class="w-full rounded-3xl" @change="handleRemoteSearch" size="large"
          @blur="onSelectBlur"
        >
          <el-option v-for="(item,index) in options" :value="item.content" :key="index" @click="goDetailPage(item)">
            <span style="float: left">
              {{ item.content }}
            </span>
            <span style="float: right; color: var(--el-text-color-secondary);font-size: 13px;">
              {{ item.attribute }}
            </span>
          </el-option>
        </el-select>
      </div>
    </el-col>
  </el-row>
  <el-row justify="space-between">
    <el-col :sm="22" :md="11" :lg="7">
      <!-- Specied -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header" v-for="item in speciesList.title" :key="item.name">
            <span>{{ item.name }}</span>&nbsp;
            <span>{{ item.value }}</span>
          </div>
        </template>
        <el-scrollbar :height="speciesScrollHeight">
          <el-input :prefix-icon="Search" v-model="speciesInput" @input="handleNavChange('species')" clearable />
          <el-radio-group v-model="speciesRadio" size="large">
            <el-radio-button name="speciesRadio" :label="item.name" v-for="item in speciesFilterList" :key="item.name"
              @change="handleBtnChange" @click="handleClick">
              <span class="card-item-span">{{ item.name }}</span>&nbsp;
              <el-tag type="info" round>{{ item.value }}</el-tag>
            </el-radio-button>
          </el-radio-group>
        </el-scrollbar>
        <el-button style="width: 100%;" @click="changeScrollHeight(1)">
          <el-icon>
            <ArrowDown />
          </el-icon>
        </el-button>
      </el-card>

      <!-- StressType -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header" v-for="item in stressTypeList.title" :key="item.name">
            <span>{{ item.name }}</span>&nbsp;
            <span>{{ item.value }}</span>
          </div>
        </template>
        <el-scrollbar :height="stressTypeScrollHeight">
          <el-input :prefix-icon="Search" v-model="stressTypeInput" @input="handleNavChange('stressType')" clearable />
          <el-radio-group v-model="stressTypeRadio" size="large">
            <el-radio-button name="stressTypeRadio" :label="item.name" v-for="item in stressTypeFilterList"
              :key="item.name" @change="handleBtnChange" @click="handleClick">
              <span class="card-item-span">{{ item.name }}</span>&nbsp;
              <el-tag type="info" round>{{ item.value }}</el-tag>
            </el-radio-button>
          </el-radio-group>
        </el-scrollbar>
        <el-button style="width: 100%;" @click="changeScrollHeight(2)">
          <el-icon>
            <ArrowDown />
          </el-icon>
        </el-button>
      </el-card>

      <!-- GeneFamily -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header" v-for="item in geneFamilyList.title" :key="item.name">
            <span>{{ item.name }}</span>&nbsp;
            <span>{{ item.value }}</span>
          </div>
        </template>
        <el-scrollbar :height="geneFamilyScrollHeight">
          <el-input :prefix-icon="Search" v-model="geneFamilyInput" @input="handleNavChange('geneFamily')" clearable />
          <el-radio-group v-model="geneFamilyRadio" size="large">
            <el-radio-button name="geneFamilyRadio" :label="item.name" v-for="item in geneFamilyFilterList"
              :key="item.name" @change="handleBtnChange" @click="handleClick">
              <span class="card-item-span mt-1">{{ item.name }}</span>&nbsp;
              <el-tag type="info" round>{{ item.value }}</el-tag>
            </el-radio-button>
          </el-radio-group>
        </el-scrollbar>
        <el-button style="width: 100%;" @click="changeScrollHeight(3)">
          <el-icon>
            <ArrowDown />
          </el-icon>
        </el-button>
      </el-card>

      <!-- PhenotypeGroup -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header" v-for="item in phenotypeGroupList.title" :key="item.name">
            <span>{{ item.name }}</span>&nbsp;
            <span>{{ item.value }}</span>
          </div>
        </template>
        <el-scrollbar :height="phenoTypeScrollHeight">
          <el-input :prefix-icon="Search" v-model="phenotypeGroupInput" @input="handleNavChange('phenoType')"
            clearable />
          <el-radio-group v-model="phenoTypeRadio" size="large">
            <el-radio-button name="phenoTypeRadio" :label="item.name" v-for="item in phenotypeGroupFilterList"
              :key="item.name" @change="handleBtnChange" @click="handleClick">
              <span class="card-item-span">{{ item.name }}</span>&nbsp;
              <el-tag type="info" round>{{ item.value }}</el-tag>
            </el-radio-button>
          </el-radio-group>
        </el-scrollbar>
        <el-button style="width: 100%;" @click="changeScrollHeight(4)">
          <el-icon>
            <ArrowDown />
          </el-icon>
        </el-button>
      </el-card>

      <!-- ExpressionOrgans -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header" v-for="item in expressionOrgansList.title" :key="item.name">
            <span>{{ item.name }}</span>&nbsp;
            <span>{{ item.value }}</span>
          </div>
        </template>
        <el-scrollbar :height="expressionScrollHeight">
          <el-input :prefix-icon="Search" v-model="expressionOrgansInput" @input="handleNavChange('expression')"
            clearable />
          <el-radio-group v-model="expressionRadio" size="large" name="expressionOrgans">
            <el-radio-button name="expressionRadio" :label="item.name" v-for="item in expressionOrgansFilterList"
              :key="item.name" @change="handleBtnChange" @click="handleClick">
              <span class="card-item-span">{{ item.name }}</span>&nbsp;
              <el-tag type="info" round>{{ item.value }}</el-tag>
            </el-radio-button>
          </el-radio-group>
        </el-scrollbar>
        <el-button style="width: 100%;" @click="changeScrollHeight(5)">
          <el-icon>
            <ArrowDown />
          </el-icon>
        </el-button>
      </el-card>

      <!-- SubCellular -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header" v-for="item in subCellularList.title" :key="item.name">
            <span>{{ item.name }}</span>&nbsp;
            <span>{{ item.value }}</span>
          </div>
        </template>
        <el-scrollbar :height="subCellularScrollHeight">
          <el-input :prefix-icon="Search" v-model="subCellularInput" @input="handleNavChange('subCellular')"
            clearable />
          <el-radio-group v-model="subCellularRadio" size="large">
            <el-radio-button name="subCellularRadio" :label="item.name" v-for="item in subCellularFilterList"
              :key="item.name" @change="handleBtnChange" @click="handleClick">
              <span class="card-item-span">{{ item.name }}</span>&nbsp;
              <el-tag type="info" round>{{ item.value }}</el-tag>
            </el-radio-button>
          </el-radio-group>
        </el-scrollbar>
        <el-button style="width: 100%;" @click="changeScrollHeight(6)">
          <el-icon>
            <ArrowDown />
          </el-icon>
        </el-button>
      </el-card>
    </el-col>
    <!-- right table -->
    <el-col :sm="20" :md="11" :lg="16">
      <el-table :data="multipleChoiceList" stripe class="right-table">
        <el-table-column fixed prop="gene" label="Gene" width="180">
          <template v-slot="{ row }">
            <a href="" @click.prevent="handleGeneClick(row)" class="underline">{{ row.gene }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="scientificName" label="Species" width="180" />
        <el-table-column prop="description" label="Gene mechanism" class="text-justify">
          <template v-slot="{ row }">
            <a class="table-content">{{ row.description }}</a>
          </template>
        </el-table-column>

      </el-table>
      <!-- pagination  -->
      <div>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
          layout="prev, pager, next, jumper" :total="pageTotal" @current-change="handleCurrentChange" />
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
  import { ArrowDown, Search } from '@element-plus/icons-vue'
  import { useSearchStore } from '~/store/useSearchStore.js'
  import { computed, reactive, ref, toRaw, watch, watchEffect } from 'vue'
  import router from "~/router/index.js"

  const store = useSearchStore()
  store.getSpeciesMenuListData()
  store.getStressTypeMenuListData()
  store.getGeneFamilyMenuListData()
  store.getPhenoTypeGroupMenuListData()
  store.getExpressionOrgansMenuListData()
  store.getSubCellularMenuListData()

  const speciesList = computed(() => store.speciesDataList)
  const stressTypeList = computed(() => store.stressTypeDataList)
  const geneFamilyList = computed(() => store.geneFamilyDataList)
  const phenotypeGroupList = computed(() => store.phenotypeGroupDataList)
  const expressionOrgansList = computed(() => store.expressionOrgansDataList)
  const subCellularList = computed(() => store.subCellularDataList)
  const multipleChoiceList = computed(() => store.multipleChoiceList)

  // remote search
  const list = reactive([])
  let options = computed(() => store.searchDataList)
  let remoteValue = ref('')
  let remoteV = ''

  // filter list
  let speciesFilterList = ref([])
  let stressTypeFilterList = ref([])
  let geneFamilyFilterList = ref([])
  let phenotypeGroupFilterList = ref([])
  let expressionOrgansFilterList = ref([])
  let subCellularFilterList = ref([])

  // check radio
  let speciesRadio = ref('')
  let stressTypeRadio = ref('')
  let geneFamilyRadio = ref('')
  let phenoTypeRadio = ref('')
  let expressionRadio = ref('')
  let subCellularRadio = ref('')
  let radioOldValArray = ref([])

  // scroll height
  let speciesScrollHeight = ref('136px')
  let stressTypeScrollHeight = ref('136px')
  let geneFamilyScrollHeight = ref('136px')
  let phenoTypeScrollHeight = ref('136px')
  let expressionScrollHeight = ref('136px')
  let subCellularScrollHeight = ref('136px')

  // pagination
  const currentPage = ref(1)
  const pageSize = ref(15)
  let pageTotal = computed(() => store.recordsCount)

  // filter input
  let speciesInput = ref('')
  let stressTypeInput = ref('')
  let geneFamilyInput = ref('')
  let phenotypeGroupInput = ref('')
  let expressionOrgansInput = ref('')
  let subCellularInput = ref('')

  // get table data
  store.getMultipleChoiceListData({
    expressionOrgans: expressionRadio.value,
    geneFamily: geneFamilyRadio.value,
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    phenotype: phenoTypeRadio.value,
    species: speciesRadio.value,
    stressType: stressTypeRadio.value,
    subCellular: subCellularRadio.value
  })

  // filter 数组赋值
  watchEffect(() => {
    speciesFilterList.value = toRaw(speciesList.value.list)
    stressTypeFilterList.value = toRaw(stressTypeList.value.list)
    geneFamilyFilterList.value = toRaw(geneFamilyList.value.list)
    phenotypeGroupFilterList.value = toRaw(phenotypeGroupList.value.list)
    expressionOrgansFilterList.value = toRaw(expressionOrgansList.value.list)
    subCellularFilterList.value = toRaw(subCellularList.value.list)
  })

  // get table data
  watchEffect(() => {
    store.getMultipleChoiceListData({
      expressionOrgans: expressionRadio.value,
      geneFamily: geneFamilyRadio.value,
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      phenotype: phenoTypeRadio.value,
      species: speciesRadio.value,
      stressType: stressTypeRadio.value,
      subCellular: subCellularRadio.value
    })
  })

  // 展开/收起面板
  let changeScrollHeight = (value) => {
    switch (value) {
      case 1:
        speciesScrollHeight.value = speciesScrollHeight.value == '600px' ? '136px' : '600px'
        break
      case 2:
        stressTypeScrollHeight.value = stressTypeScrollHeight.value == '' ? '136px' : ''
        break
      case 3:
        geneFamilyScrollHeight.value = geneFamilyScrollHeight.value == '600px' ? '136px' : '600px'
        break
      case 4:
        phenoTypeScrollHeight.value = phenoTypeScrollHeight.value == '600px' ? '136px' : '600px'
        break
      case 5:
        expressionScrollHeight.value = expressionScrollHeight.value == '600px' ? '136px' : '600px'
        break
      case 6:
        subCellularScrollHeight.value = subCellularScrollHeight.value == '600px' ? '136px' : '600px'
        break
    }
  }

  // remote Search
  const remoteMethod = (query) => {
    if (query) {
      remoteValue.value = query
      remoteV = query
      store.getFuzzySearchListData(query.replaceAll("+", "*nbsp"))
    } else {
      options.value = []
    }
  }

  watch(remoteValue, (oldValue, newValue) => {
    if(remoteValue.value === '') {
      remoteValue.value = remoteV
    }
  })

  // 根据远程搜索结果跳转
  let goDetailPage = (item) => {
    const attribute = item.attribute
    const content = item.content
    const group = item.group
    const id = item.id
    switch (attribute) {
      case 'Expression_Organs':
        router.push({
          path: 'browse/expressionorgans',
          query: {
            expressionOrgans: content
          }
        })
        break
      case 'Scientific_Name':
        router.push({
          path: 'browse/species',
          query: {
            species: content
          }
        })
        break
      case 'Sub_Cellular_Localization':
        router.push({
          path: 'browse/subcellularlocalization',
          query: {
            subCellular: content
          }
        })
        break
      case 'Gene Family':
        router.push({
          path: 'browse/genefamily',
          query: {
            type: 'TF',
            name: item.content.replaceAll("+", "*nbsp")
          }
        })
        break
      case 'No-TF Family':
        router.push({
          path: 'browse/genefamily',
          query: {
            type: 'No-Tf',
            name: item.content.replaceAll("+", "*nbsp")
          }
        })
        break
      case 'Gene':
        router.push({
          path: 'browse/stresstype/geneoverview',
          query: {
            geneName: id
          }
        })
        break
      case 'Phenotype_Influenced':
        router.push({
          path: 'browse/phenotypeinfluenced',
          query: {
            group: group,
            pheno: content
          }
        })
        break
      case 'Stress_Type':
        router.push({
          path: 'browse/stresstype/list',
          query: {
            stressName: content
          }
        })
        break
    }
  }

  // filter
  let handleNavChange = ((item) => {
    switch (item) {
      case 'species':
        speciesInput.value == '' ? speciesFilterList.value = toRaw(speciesList.value.list) : speciesFilterList.value = toRaw(speciesList.value.list).filter(item => item.name.indexOf(speciesInput.value) !== -1)
        break
      case 'stressType':
        stressTypeInput.value == '' ? stressTypeFilterList.value = toRaw(stressTypeList.value.list) : stressTypeFilterList.value = toRaw(stressTypeList.value.list).filter(item => item.name.indexOf(stressTypeInput.value) !== -1)
        break
      case 'geneFamily':
        geneFamilyInput.value == '' ? geneFamilyFilterList.value = toRaw(geneFamilyList.value.list) : geneFamilyFilterList.value = toRaw(geneFamilyList.value.list).filter(item => item.name.indexOf(geneFamilyInput.value) !== -1)
        break
      case 'phenoType':
        phenotypeGroupInput.value == '' ? phenotypeGroupFilterList.value = toRaw(phenotypeGroupList.value.list) : phenotypeGroupFilterList.value = toRaw(phenotypeGroupList.value.list).filter(item => item.name.indexOf(phenotypeGroupInput.value) !== -1)
        break
      case 'expression':
        expressionOrgansInput.value == '' ? expressionOrgansFilterList.value = toRaw(expressionOrgansList.value.list) : expressionOrgansFilterList.value = toRaw(expressionOrgansList.value.list).filter(item => item.name.indexOf(expressionOrgansInput.value) !== -1)
        break
      case 'subCellular':
        subCellularInput.value == '' ? subCellularFilterList.value = toRaw(subCellularList.value.list) : subCellularFilterList.value = toRaw(subCellularList.value.list).filter(item => item.name.indexOf(subCellularInput.value) !== -1)
        break
    }

  })

  //  radio click
  let handleClick = (e) => {
    if (e.target.tagName != 'INPUT') {
      return
    }
    switch (e.target.attributes[2].value) {
      case 'speciesRadio':
        e.target.value == radioOldValArray.value[0] ? speciesRadio.value = '' : radioOldValArray.value[0] = e.target.value
        break
      case 'stressTypeRadio':
        e.target.value == radioOldValArray.value[1] ? stressTypeRadio.value = '' : radioOldValArray.value[1] = e.target.value
        break
      case 'geneFamilyRadio':
        e.target.value == radioOldValArray.value[2] ? geneFamilyRadio.value = '' : radioOldValArray.value[2] = e.target.value
        break
      case 'phenoTypeRadio':
        e.target.value == radioOldValArray.value[3] ? phenoTypeRadio.value = '' : radioOldValArray.value[3] = e.target.value
        break
      case 'expressionRadio':
        e.target.value == radioOldValArray.value[4] ? expressionRadio.value = '' : radioOldValArray.value[4] = e.target.value
        break
      case 'subCellularRadio':
        e.target.value == radioOldValArray.value[5] ? subCellularRadio.value = '' : radioOldValArray.value[5] = e.target.value
        break
    }
  }

  // radio change
  let handleBtnChange = (e, b) => {
    if (e.target.tagName != 'INPUT') {
      return
    }
  }

  // gene click
  let handleGeneClick = (row) => {
    router.push({
      name: 'geneoverview',
      query: {
        geneName: row.id
      }
    })
  }
</script>

<style scoped>
  /* PC端 */
  @media screen and (min-width: 992px) {
    .el-row {
      max-width: 70%;
      margin: 0 auto;
    }
  }

  /* 手机端 */
  @media screen and (max-width: 993px) {
    .el-row {
      max-width: 100%;
    }
  }

  .el-row {
    margin-top: 100px;
  }

  .el-input {
    height: 36px;
  }

  ::v-deep .el-card__header {
    background-color: #FAFAFA;
  }

  ::v-deep .el-card__body {
    padding: 0;
  }

  .el-radio-group {
    display: block;
    height: 100%;
  }

  .el-radio-button {
    display: block;
    height: 50px;
  }

  ::v-deep .el-radio-button__inner {
    width: 100%;
    height: 100%;
  }

  .card-div {
    overflow: scroll;
    height: 150px;
  }

  .infinite-list::-webkit-scrollbar {
    display: none;
  }

  .el-card {
    margin-bottom: 16px;
  }

  .card-item-span {
    @apply float-left inline-block;
    padding-top: 4px;
    max-width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .el-tag {
    @apply float-right;
  }

  .el-pagination {
    justify-content: center;
    margin-top: 16px;
    width: 100%;
  }

  .table-content {
    @apply text-justify;
    word-break: keep-all;
    display: inline-block;
  }

  ::v-deep .el-input__wrapper {
    height: 50px;
  }

  ::v-deep .search-bar .el-input__wrapper {
    height: 50px;
  }

  ::v-deep .el-card {
    --el-card-border-radius: 12px;
  }
</style>
