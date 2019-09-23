<template>
  <div class="tableData h-100">
    <!--<input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="importf(this)">-->
    <!-- 查询表单 -->
    <div class="form-box">
      <el-form :inline="true" :model="form" class="c-form">
        <el-form-item v-for="(item, index) in formData" :key="index">
          <el-select v-if="item.element === 'select'" v-model="form[item.key]" :placeholder="item.placeholder" :style="{ width: item.width }">
            <el-option v-for="(opt, oIndex) in item.option" :key="oIndex" :label="opt.label" :value="opt.value" />
          </el-select>
          <el-input v-if="item.element === 'input'" v-model="form[item.key]" :placeholder="item.placeholder" :style="{ width: item.width }">
            <el-button v-if="item.isSearchItem" slot="append" icon="el-icon-search" :style="{ width: item.btnWidth }" @click="search" />
          </el-input>
          <el-input v-if="item.element === 'inputSelect'" v-model="form[item.key]" :placeholder="item.placeholder" class="input-with-select" :style="{ width: item.width || '400px' }">
            <el-select slot="prepend" v-model="form[item.selectKey]" :placeholder="item.selectPlaceholder" :style="{ width: item.selectWidth || '120px' }">
              <el-option v-for="(opt, oIndex) in item.option" :key="oIndex" :label="opt.label" :value="opt.value" />
            </el-select>
            <el-button v-if="item.isSearchItem" slot="append" icon="el-icon-search" :style="{ width: item.btnWidth }" @click="search" />
          </el-input>
        </el-form-item>
      </el-form>
      <div><!--占位元素强制最后一个兄弟元素向右对齐--></div>
      <slot name="searchForm" />
      <div class="tableData-icons">
        <div v-for="(item, index) in multipleOpera" :key="index" class="icon-item" @click="parentMethod(item)">
          <i :class="item.icon" />
          <span>{{ item.text }}</span>
        </div>
      </div>
    </div>
    <!--列表区域块-->
    <div v-loading="loading" class="table-content">
      <!-- 列表 -->
      <el-table
        :data="items"
        stripe
        border
        style="width: 100%"
        :max-height="tableHeight"
        row-key="id"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <!--列内使用template域不会显示多选框的解决办法-->
        <el-table-column v-if="fields[0].type" :type="fields[0].type" :width="fields[0].width" reserve-selection />

        <el-table-column
          v-for="(row, index) in columns"
          :key="index"
          :prop="row.key"
          :label="row.title"
          :type="row.type"
          :sortable="row.sortable"
          :filters="row.filterData"
          :filter-method="row.filterHandler"
          :width="row.width"
          :fixed="index === columns.length - 1 && 'right'"
          :class-name="index === columns.length - 1 ? 'table-time-cell': ''"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div v-if="!row.render" class="td-cell-div">
              <span
                v-if="row.canClick"
                class="cursor"
                @click="cellClick(scope.row, row.key)"
              >
                {{ scope.row[row.key] }}
              </span>
              <span v-else> {{ scope.row[row.key] }} {{ row.type === 'index' ? (listQuery.limit * (listQuery.page - 1) + (scope.$index + 1)) : '' }}</span>
              <!--表格操作列的图标组-->
              <div class="cell-btn-group">
                <div v-for="(btn, bIndex) in row.btns" :key="bIndex">
                  <el-tooltip v-if="btn.tip" class="item" :content="btn.tip">
                    <div class="icon-item" @click="parentMethod(btn, scope.row, scope.$index)">
                      <i :class="[btn.icon]" />
                      <span>{{ btn.text }}</span>
                    </div>
                  </el-tooltip>
                  <div v-else class="icon-item" @click="parentMethod(btn, scope.row, scope.$index)">
                    <i :class="[btn.icon]" />
                    <span>{{ btn.text }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <expand-dom :column="row" :row="scope.row" :render="row.render" :index="index" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="isappend" align="center" :label="appendlabel">
          <template slot-scope="scope">
            <slot name="append" :row="scope.row" :index="scope.$index" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="total > 0 && !hidePagination"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="paginationChange"
      />
    </div>
  </div>
</template>

<script>
/**
 * 表格组件
 * 接受参数： fields（表头数据） items（表格数据） filterPramas（表格已筛选的数据项）
 * 具名插槽： searchForm（搜索表单插槽） iconGroup（表格上的操作图标按钮插槽）tableOperateIcons（表格行内的操作图标插槽）
 * sort-change： 排序改变事件
 * selection-change： 多选改变事件
 */
import Pagination from '@/components/Pagination'

export default {
  name: 'TableData',
  components: {
    Pagination,
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    }
  },
  props: {
    fields: {
      type: Array,
      default: () => {
        return []
      }
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    filterPramas: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: {
      requires: true,
      type: Number,
      default: 0
    },
    hidePagination: {
      type: Boolean,
      default: false
    },
    isappend: {
      type: Boolean,
      default() {
        return false
      }
    },
    appendlabel: {
      type: String,
      default() {
        return ''
      }
    },
    multipleOpera: {
      type: Array,
      default: () => {
        return []
      }
    },
    formData: {
      type: Array,
      default: () => {
        return []
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      tableHeight: window.innerHeight - 200,
      isCutHeight: false,
      form: {},
      exportLoading: false
    }
  },
  computed: {
    columns: {
      get() {
        if (this.fields[0].type) {
          return this.fields.filter(val => val.type !== 'selection')
        }
        return this.fields
      }
    },
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  watch: {
    filterPramas(val) {
      if (val.length > 0 && !this.isCutHeight) {
        this.isCutHeight = true
        this.tableHeight -= 45
      }
      if (val.length === 0) {
        this.isCutHeight = false
        this.tableHeight += 45
      }
      console.log(this.tableHeight)
    }
  },
  created() {
    this.formData.forEach(value => {
      if (value.element === 'select' || value.element === 'inputSelect') {
        const key = value.element === 'select' ? value.key : value.selectKey
        value.option.forEach(val => {
          if (val.default) {
            this.form[key] = val.value
          }
        })
      }
    })
  },
  methods: {
    paginationChange(val) {
      this.$emit('pagination-change', val)
    },
    cellMouseEnter(row) {
      this.$set(row, 'showOperate', true)
    },
    cellMouseLeave(row) {
      this.$set(row, 'showOperate', false)
    },
    handleSelectionChange(val) {
      this.$emit('selection-change', val)
    },
    sortChange(val) {
      const value = { name: val.column.label, type: 'info', value: val.order }
      if (this.filterPramas.length > 0) {
        this.filterPramas.map(item => {
          if (item.name === val.column.label) {
            item.value = value.value
          } else {
            this.filterPramas.push(value)
          }
        })
      } else {
        this.filterPramas.push(value)
      }
      this.$emit('update:filterPramas', this.filterPramas)
      this.$emit('sort-change', val)
    },
    cellClick(row, key) {
      this.$emit('cell-click', row, key)
    },
    parentMethod(item, row, index) {
      if (item.type === 'export') {
        return this.handleExport()
      }
      this.$parent[item.method](row, index)
    },
    search() {
      this.$emit('search', this.form)
    },
    handleExport() {
      this.exportLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = []
        const filterVal = []
        this.columns.forEach(val => {
          if (val.key) {
            filterVal.push(val.key)
            tHeader.push(val.title)
          }
        })
        const data = this.formatJson(filterVal, this.items)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.$route.meta.title || 'table-list'
        })
        this.exportLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    importf(obj) {
      // 是否将文件读取为二进制字符串
      const rABS = false
      const f = event.currentTarget.files[0]
      const reader = new FileReader()

      FileReader.prototype.readAsBinaryString = function(f) {
        let binary = ''
        const rABS = false // 是否将文件读取为二进制字符串
        let wb // 读取完成的数据
        let outdata
        const reader = new FileReader()
        reader.onload = function(e) {
          const bytes = new Uint8Array(reader.result)
          const length = bytes.byteLength
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }

          const XLSX = require('xlsx')
          if (rABS) {
            // eslint-disable-next-line no-undef
            wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          // outdata就是你想要的东西 excel导入的数据
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          console.log('outdata:', outdata)
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    }
  }
}
</script>

<style lang="scss">
  .c-tabs {
    .el-tabs__nav-wrap::after {
      display: none;
    }

    .el-tabs__header {
      margin: 5px 0;
    }
  }

  .form-box {
    .c-form {
      .el-form-item {
        margin-bottom: 10px;
      }
      .el-form-item--mini.el-form-item,
      .el-form-item--small.el-form-item {
        margin-bottom: 0px;
      }
    }
  }

  .table-content {
    table, tbody, thead {
      width: 100% !important;
    }

    .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
      border-right: 1px solid transparent;
    }
    .el-table--border, .el-table--group {
      border-right: transparent !important;
      border: 1px solid transparent;
    }
    .el-table--border::after, .el-table--group::after {
      background-color: #fff;
    }

    label {
      margin-bottom: 0;
    }

    .el-table {
      th {
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .tableData-nav {
    padding: 0 20px;
  }

  .cell-btn-group,
  .tableData-icons {
    display: flex;
    align-items: center;
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px 10px;
      cursor: pointer;
      span {
        font-size: 12px;
      }
    }
  }

  .table-content {
    border: 1px solid #ddd;

    .table-time-cell {
      position: relative;
    }

    .table-cell-title-block {
      display: flex;
      align-items: center;

      .icon-column-group {
        display: flex;
        flex-direction: column;
        cursor: pointer;

        i {
          height: 8px;
          line-height: 8px;
        }
      }

      i {
        cursor: pointer;
      }
    }

    .cursor {
      cursor: pointer;
    }

    .td-cell-div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .form-box {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

