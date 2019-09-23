<template>
  <div class="outer-container">
    <section class="item bd">
      <div class="lable">网站域名</div>
      <el-row type="flex">
        <el-col class="input">
          <el-input v-model.trim="WebsiteDomain" placeholder="请输入" />
          <div class="sub-title">建议通俗好记的名称，方便管理</div>
        </el-col>
        <el-col class="button">
          <el-button @click="bindDomain">绑定域名</el-button>
        </el-col>
      </el-row>
    </section>
    <section class="item js">
      <div class="lable">网站域名:</div>
      <el-row type="flex">
        <el-col class="input">
          <el-select v-model="initial.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col class="button">
          <el-button>开启加速</el-button>
        </el-col>
      </el-row>
    </section>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>绑定成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { bindDomain } from '@/api/websiteManage/domainBind'

export default {
  name: 'DomainBind',
  data() {
    return {
      initial: {
        value: ''
      },
      WebsiteDomain: '',
      dialogVisible: false,
      options: [
        { label: '海外地区', value: '选项1' },
        { label: '国内地区( 域名需备案 )', value: '选项2' },
        { label: '全球地区( 域名需备案 )', value: '选项3' }
      ]
    }
  },
  methods: {
    bindDomain() {
      bindDomain({
        site_id: 1,
        domain: this.WebsiteDomain
      }).then(() => {
        this.dialogVisible = true
      })
    }
  }
}
</script>

<style scoped lang="scss">
.outer-container {
  margin: 20px;
  padding: 20px;
  width: 100%;
  max-width: 950px;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba( 0, 0, 0, .2);

  .item{
    margin-bottom: 20px;

    .lable{
      color: #606266;
      font-size: 12px;
      margin-bottom: 5px;
    }
    .input{
      flex-basis: 0;
      flex-grow: 1;
      margin-right: 15px;

      .el-select,
      .el-input{
        display: block;
        font-size: 14px;
      }

      .sub-title{
        font-size: 12px;
        color: #909398;
        margin-top: 5px;
      }
    }
    .button{
      flex-grow: 0;
      flex-basis: 0;
    }
  }

  .item:last-of-type{
    margin-bottom: 0;
  }

}
</style>
