<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :max-height="tableHeight"
    >
      <el-table-column
        v-for="(item, index) in fields"
        :key="index"
        :prop="item.key"
        :label="item.title"
      >
        <template slot-scope="scope">
          <template v-if="item.key !== 'handle'">
            <span>{{ scope.row[item.key] }}</span>
          </template>
          <div v-else class="cell-btn-group">
            <div v-for="(btn, bIndex) in item.btns" :key="bIndex">
              <el-tooltip v-if="btn.tip" class="item" :content="btn.tip">
                <div class="icon-item" @click="parentMethod(btn.method, scope.row, scope.$index)">
                  <i :class="[btn.icon]" />
                  <span>{{ btn.text }}</span>
                </div>
              </el-tooltip>
              <div v-else class="icon-item" @click="parentMethod(btn.method, scope.row, scope.$index)">
                <i :class="[btn.icon]" />
                <span>{{ btn.text }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    total: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      tableHeight: window.innerHeight - 350
    }
  },
  methods: {
    parentMethod(name, row, index) {
      this.$emit('category', { name, row })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 22px;
}
.dialog-footer{
  text-align: right;
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
.el-table__row.el-table__row--level-2 .cell-btn-group>div:first-child{
  display: none;
}
</style>
