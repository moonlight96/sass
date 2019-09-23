<template>
    <div>
    <el-select v-model="value" placeholder="全部分类">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <el-select v-model="value1" placeholder="全部状态">
    <el-option
      v-for="item in allStatus"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <input type="text" placeholder="请输入">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="序号"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="标题"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="分类标签"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="action"
      label="操作"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
    </div>
</template>
<style scoped>

</style>
<script>
export default {
    
    data() {
      return {
        options: [{
          value: '选项1',
          label: '全部分类'
        }],
         allStatus: [{
          value: '选项1',
          label: '全部状态'
        },{
          value: '选项2',
          label: '上架'
        },{
          value: '选项3',
          label: '置顶'
        },{
          value: '选项4',
          label: '下架'
        }],
        value: '',
        value1:'',
        // table
         tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    
  }
}
</script>