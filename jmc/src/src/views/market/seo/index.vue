<template>
  <div class="page-container">
    <el-input v-model="seo.seach" placeholder="请输入内容" size="small" class="input-with-select seach_input">
      <el-select slot="prepend" v-model="seo.seachOption">
        <el-option
          v-for="item in seo.seachOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
      <el-button slot="append" icon="el-icon-search" />
    </el-input>
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <Table
            v-if="activeName === item.key"
            :fields="item.fields"
            :items="item.list"
            :filter-pramas.sync="item.filterPramas"
            :total="item.total"
            @getKeywords="getKeywords"
            @save="save"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// tableInput
import Table from './table'
export default {
  components: {
    Table
  },
  data() {
    return {
      activeName: 'IN',
      tabMapOptions: [
        {
          label: '首页&栏目',
          key: 'IN',
          fields: [
            { type: 'selection', width: 50 },
            { title: '页面类型', key: 'type', width: '80px' },
            { title: '页面名称', key: 'name', width: '80px' },
            { title: 'Title标签', key: 'titleTag', isTitle: true },
            { title: 'Keywords标签', key: 'Keywords', isKeywords: true, width: '200px' },
            { title: 'Description标签', key: 'description', isDescription: true },
            { title: 'URL', key: 'url', isUrl: true, width: '300px' },
            {
              title: '操作',
              key: 'handle',
              btns: [
                {
                  icon: 'el-icon-plus',
                  text: '',
                  tip: '重新获取关键词',
                  method: 'getKeywords'
                },
                {
                  icon: 'el-icon-check',
                  text: '',
                  tip: '保存',
                  method: 'save'
                }
              ]
            }
          ],
          list: [
            {
              id: 1,
              type: '建筑',
              name: '钢筋',
              titleTag: '1',
              keyWords1: '1',
              keyWords2: '2',
              keyWords3: '3',
              description: 'Description标签1',
              url: 'how-to-speech',
              burl: 'product/'
            },
            {
              id: 2,
              type: '商城',
              name: '化妆品',
              titleTag: '2',
              keyWords1: '4',
              keyWords2: '5',
              keyWords3: '6',
              description: 'Description标签2',
              url: 'love-is-infinte',
              burl: 'contentManage/'
            }
          ],
          total: 2,
          filterPramas: []
        },
        {
          label: '产品',
          key: 'PR',
          fields: [
            { type: 'selection', width: 50 },
            { title: '栏目名称', key: 'name', width: '80px' },
            { title: '标题', key: 'prTitle', width: '80px' },
            { title: 'Title标签', key: 'titleTag', isTitle: true },
            { title: 'Keywords标签', key: 'Keywords', isKeywords: true },
            { title: 'Description标签', key: 'description', isDescription: true },
            { title: 'URL', key: 'url', isUrl: true, width: '300px' },
            {
              title: '操作',
              key: 'handle',
              btns: [
                {
                  icon: 'el-icon-plus',
                  text: '',
                  tip: '重新获取关键词',
                  method: 'getKeywords'
                },
                {
                  icon: 'el-icon-check',
                  text: '',
                  tip: '保存',
                  method: 'save'
                }
              ]
            }
          ],
          list: [
            {
              id: 1,
              prTitle: '2019 Hot Sale Luxury ODM',
              name: '产品WEEKLY DEALS',
              titleTag: '1',
              keyWords1: '1',
              keyWords2: '2',
              keyWords3: '3',
              description: 'Description标签1',
              url: 'how-to-speech',
              burl: 'product/'
            },
            {
              id: 2,
              prTitle: '90HP 4WD big farm tractors cabs for sale',
              name: 'MACHINERY',
              titleTag: '2',
              keyWords1: '4',
              keyWords2: '5',
              keyWords3: '6',
              description: 'Description标签2',
              url: 'love-is-infinte',
              burl: 'contentManage/'
            }
          ],
          total: 2,
          filterPramas: []
        },
        {
          label: '文章',
          key: 'AR',
          fields: [
            { type: 'selection', width: 50 },
            { title: '栏目名称', key: 'name', width: '80px' },
            { title: '标题', key: 'prTitle', width: '80px' },
            { title: 'Title标签', key: 'titleTag', isTitle: true },
            { title: 'Keywords标签', key: 'Keywords', isKeywords: true },
            { title: 'Description标签', key: 'description', isDescription: true },
            { title: 'URL', key: 'url', isUrl: true, width: '300px' },
            {
              title: '操作',
              key: 'handle',
              btns: [
                {
                  icon: 'el-icon-plus',
                  text: '',
                  tip: '重新获取关键词',
                  method: 'getKeywords'
                },
                {
                  icon: 'el-icon-check',
                  text: '',
                  tip: '保存',
                  method: 'save'
                }
              ]
            }
          ],
          list: [
            {
              id: 1,
              prTitle: '2019 Hot Sale Luxury ODM',
              name: '文章WEEKLY DEALS',
              titleTag: '1',
              keyWords1: '1',
              keyWords2: '2',
              keyWords3: '3',
              description: 'Description标签1',
              url: 'how-to-speech',
              burl: 'product/'
            },
            {
              id: 2,
              prTitle: '90HP 4WD big farm tractors cabs for sale',
              name: 'MACHINERY',
              titleTag: '2',
              keyWords1: '4',
              keyWords2: '5',
              keyWords3: '6',
              description: 'Description标签2',
              url: 'love-is-infinte',
              burl: 'contentManage/'
            }
          ],
          total: 2,
          filterPramas: []
        },
        {
          label: 'AI产品',
          key: 'AIPR',
          fields: [
            { type: 'selection', width: 50 },
            { title: '栏目名称', key: 'name', width: '80px' },
            { title: '标题', key: 'prTitle', width: '80px' },
            { title: 'Title标签', key: 'titleTag', isTitle: true },
            { title: 'Keywords标签', key: 'Keywords', isKeywords: true },
            { title: 'Description标签', key: 'description', isDescription: true },
            { title: 'URL', key: 'url', isUrl: true, width: '300px' },
            {
              title: '操作',
              key: 'handle',
              btns: [
                {
                  icon: 'el-icon-plus',
                  text: '',
                  tip: '重新获取关键词',
                  method: 'getKeywords'
                },
                {
                  icon: 'el-icon-check',
                  text: '',
                  tip: '保存',
                  method: 'save'
                }
              ]
            }
          ],
          list: [
            {
              id: 1,
              prTitle: '2019 Hot Sale Luxury ODM',
              name: 'AI产品WEEKLY DEALS',
              titleTag: '1',
              keyWords1: '1',
              keyWords2: '2',
              keyWords3: '3',
              description: 'Description标签1',
              url: 'how-to-speech',
              burl: 'product/'
            },
            {
              id: 2,
              prTitle: '90HP 4WD big farm tractors cabs for sale',
              name: 'MACHINERY',
              titleTag: '2',
              keyWords1: '4',
              keyWords2: '5',
              keyWords3: '6',
              description: 'Description标签2',
              url: 'love-is-infinte',
              burl: 'contentManage/'
            }
          ],
          total: 2,
          filterPramas: []
        },
        {
          label: 'AI文章',
          key: 'AIAR',
          fields: [
            { type: 'selection', width: 50 },
            { title: '栏目名称', key: 'name', width: '80px' },
            { title: '标题', key: 'prTitle', width: '80px' },
            { title: 'Title标签', key: 'titleTag', isTitle: true },
            { title: 'Keywords标签', key: 'Keywords', isKeywords: true },
            { title: 'Description标签', key: 'description', isDescription: true },
            { title: 'URL', key: 'url', isUrl: true, width: '300px' },
            {
              title: '操作',
              key: 'handle',
              btns: [
                {
                  icon: 'el-icon-plus',
                  text: '',
                  tip: '重新获取关键词',
                  method: 'getKeywords'
                },
                {
                  icon: 'el-icon-check',
                  text: '',
                  tip: '保存',
                  method: 'save'
                }
              ]
            }
          ],
          list: [
            {
              id: 1,
              prTitle: '2019 Hot Sale Luxury ODM',
              name: 'AI文章WEEKLY DEALS',
              titleTag: '1',
              keyWords1: '1',
              keyWords2: '2',
              keyWords3: '3',
              description: 'Description标签1',
              url: 'how-to-speech',
              burl: 'product/'
            },
            {
              id: 2,
              prTitle: '90HP 4WD big farm tractors cabs for sale',
              name: 'MACHINERY',
              titleTag: '2',
              keyWords1: '4',
              keyWords2: '5',
              keyWords3: '6',
              description: 'Description标签2',
              url: 'love-is-infinte',
              burl: 'contentManage/'
            }
          ],
          total: 2,
          filterPramas: []
        },
        {
          label: 'AI聚合页',
          key: 'AIPO',
          fields: [
            { type: 'selection', width: 50 },
            { title: '栏目名称', key: 'name', width: '80px' },
            { title: '标题', key: 'prTitle', width: '80px' },
            { title: 'Title标签', key: 'titleTag', isTitle: true },
            { title: 'Keywords标签', key: 'Keywords', isKeywords: true },
            { title: 'Description标签', key: 'description', isDescription: true },
            { title: 'URL', key: 'url', isUrl: true, width: '300px' },
            {
              title: '操作',
              key: 'handle',
              btns: [
                {
                  icon: 'el-icon-plus',
                  text: '',
                  tip: '重新获取关键词',
                  method: 'getKeywords'
                },
                {
                  icon: 'el-icon-check',
                  text: '',
                  tip: '保存',
                  method: 'save'
                }
              ]
            }
          ],
          list: [
            {
              id: 1,
              prTitle: '2019 Hot Sale Luxury ODM',
              name: 'AI聚合页WEEKLY DEALS',
              titleTag: '1',
              keyWords1: '1',
              keyWords2: '2',
              keyWords3: '3',
              description: 'Description标签1',
              url: 'how-to-speech',
              burl: 'product/'
            },
            {
              id: 2,
              prTitle: '90HP 4WD big farm tractors cabs for sale',
              name: 'MACHINERY',
              titleTag: '2',
              keyWords1: '4',
              keyWords2: '5',
              keyWords3: '6',
              description: 'Description标签2',
              url: 'love-is-infinte',
              burl: 'contentManage/'
            }
          ],
          total: 2,
          filterPramas: []
        }
      ],
      seo: {
        query: {
          page_number: 1,
          page_size: 20
        },
        seachOptions: [
          { value: '', label: '全部' },
          { value: 1, label: '页面类型' },
          { value: 2, label: '标题' },
          { value: 3, label: 'Keywords标签' }
        ],
        seachOption: '',
        seach: ''
      }
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default  selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getKeywords(row) {
      console.log(row)
    },
    save(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
$brColor: #ddd;
.page-container{
  padding: 20px;
  .tabs{
    background: #FFFFFF;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.14), 0 2px 2px 0 rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20);
  }
  .seach_input{
    width: 350px;
    margin-bottom: 10px;
  }
  /deep/ .el-input-group__prepend {
    width: 120px;
  }
}
/deep/ .el-table--border, .el-table--group{
  border: 0;
}
/deep/ .el-tabs__header{
  margin-bottom: 0px;
  padding: 0 20px;
  .el-tabs__active-bar{
    background-color: #606FC7;
  }
  .el-tabs__item:hover {
    color: #606FC7;
  }
  .el-tabs__item.is-active {
      color: #606FC7;
  }
  .el-tabs__item{
    font-size: 16px;
    font-weight: 500;
    color: #606266;
    height: 48px;
    line-height: 48px;
  }
}

/deep/ .el-tabs__nav-wrap::after{
  display: none;
}
</style>
