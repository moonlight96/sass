<template>
  <div class="tableData h-100">
    <!-- 查询表单 -->
    <div class="form-box">
      <slot name="searchForm" />
      <slot name="iconGroup" />
    </div>
    <!--列表区域块-->
    <div class="table-content">
      <!-- 列表 -->
      <el-table
        :data="items"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <!--列内使用template域不会显示多选框的解决办法-->
        <el-table-column v-if="fields[0].type" :type="fields[0].type" :width="fields[0].width" />
        <el-table-column type="index" width="50" label="序号" />
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
          :class-name="index === fields.length - 1 ? 'table-time-cell': ''"
        >
          <template slot-scope="scope">
            <span
              v-if="row.canClick"
              class="cursor"
              @click="cellClick(scope.row, row.key)"
            >
              {{ scope.row[row.key] }}
            </span>
            <span v-else> {{ scope.row[row.key] }} </span>
            <div v-if="row.isHref" class="art-title">
              <slot :row="scope.row" :index="scope.$index" name="tableHref" />
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
        v-show="total > 0"
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
    Pagination
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
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 1
      },
      tableHeight: window.innerHeight - 200,
      isCutHeight: false
    }
  },
  computed: {
    columns: {
      get() {
        if (this.fields[0].type) {
          return this.fields.filter(val => !val.type)
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .tableData-nav {
    padding: 0 20px;
  }

  .tableData-icons {
    display: flex;
    align-items: center;

    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 10px;
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

      .cell-hover-view {
        position: absolute;
        right: 0;
        left: 100%;
        top: 0;
        bottom: 0;
        background-color: #f5f7fa;
        padding: 0 20px;
        display: flex;
        align-items: center;
        transition: all .3s;

        &.show {
          left: -120px
        }

        i {
          padding: 0 20px;
          color: #fff;
        }
      }
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
  }

  .form-box {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
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

