<template>
    <div class="paramList">
    <el-button>返回</el-button>
    <span >云站 / 产品管理 / 产品参数</span>
     <el-divider></el-divider>
    <el-tabs type="border-card">
  <el-tab-pane label="交易信息">
  </el-tab-pane>
  <el-tab-pane label="属性参数"></el-tab-pane>
  <el-tab-pane label="多属性参数"></el-tab-pane>
  <el-tab-pane label="包装信息"></el-tab-pane>
  <el-tab-pane label="海关参数"></el-tab-pane>
  <el-button class="addParam">添加参数</el-button>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="属性名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="value"
        label="属性值"
        width="180">
      </el-table-column>
      <el-table-column
        prop="way"
        label="展示方式">
      </el-table-column>
      <el-table-column
        prop="must"
        label="必填">
        <el-switch
          v-model="value1"
          @click="change()"
         active-color="#636FC1"
        inactive-color="#999">
        </el-switch>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
         <el-switch
         v-model="value2"
         active-color="#636FC1"
        inactive-color="#999">
        </el-switch>
      </el-table-column>
      <el-table-column
        prop="nums"
        label="产品数">
      </el-table-column>
      <el-table-column
        prop="doing"
        label="操作">
      </el-table-column>
    </el-table>
</el-tabs>
  
</div>
</template>
<style  lang="scss" scoped>
.paramList {
  padding: 20px;
}
.paramList span{
    font-size: 14px;
    float: right;
    margin-right: 30px;
    margin-top: 20px;
}
.el-tabs__nav-wrap {
    position: relative;
}
 .addParam{
    position: absolute;
    right: 0;
    
}
</style>
<script>
export default {
    data(){
        return{
            value1:true,
            value2:true,
            tableData:[
                {
                    title:'起订量',
                    way:'单行文本',
                    must:'',
                    nums:25,
                    doing:<div><a>编辑</a> <a>删除</a></div>
                }
            ]
        }
    },
    methods:{
        change(){
            this.value1=!this.value1;
        }
    }
}
</script>