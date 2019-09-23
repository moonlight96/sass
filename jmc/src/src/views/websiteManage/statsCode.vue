<template>
  <div class="page-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <el-form v-if="activeName === item.key" ref="form" :model="form">
            <el-form-item>
              <el-input
                v-model="form.desc"
                type="textarea"
                rows="10"
              />
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getGaCode, getGaCodeEdit } from '@/api/websiteManage/index'

export default {
  name: 'StatsCode',
  data() {
    return {
      query: {
        site_id: 1,
        type: 'ga'
      },
      editCode: {
        site_id: 1,
        type: 'ga',
        code: 0
      },
      form: {
        desc: ''
      },
      activeName: 'ga',
      key: 'ga',
      tabMapOptions: [
        { label: 'GA统计代码', key: 'ga' },
        { label: 'FB像素跟踪代码Facebook Pixel', key: 'fbpixel' },
        { label: 'Messenger代码FB顾客聊天插件', key: 'fbMessenger' },
        { label: '询盘跟踪代码', key: 'inquiry' },
        { label: '其它统计代码', key: 'other' }
      ]
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    this.getGaCode('ga')
    // this.form.desc = '123'
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
    // init the default  selected tab
    // const tab = this.$route.getCode.tab
    if (this.activeName === 'ga') {
      this.getGaCode('ga')
    } else if (this.activeName === 'fbpixel') {
      this.getGaCode('fbpixel')
    } else if (this.activeName === 'fbMessenger') {
      this.getGaCode('fbMessenger')
    } else if (this.activeName === 'inquiry') {
      this.getGaCode('inquiry')
    } else {
      this.getGaCode('other')
    }
  },
  methods: {
    onSubmit() {
      getGaCodeEdit({ site_id: 1, type: this.activeName, code: this.form.desc }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleClick(tab, event) {
      console.log(this.activeName)
      this.getGaCode(this.activeName)
    },
    getGaCode(type) {
      getGaCode({ site_id: 1, type }).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data.length) {
            this.form.desc = res.data[0].code
          } else {
            this.form.desc = ''
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container{
  margin:20px;
  background: #FFFFFF;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.14), 0 2px 2px 0 rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20);
}
/deep/ .el-form-item{
  margin-top:20px;
}
/deep/ .el-form-item__label{
  width: 100%;
}
/deep/ .el-tabs__nav-wrap::after{
  display: none;
}
/deep/ .el-table--border, .el-table--group{
  border: 0;
}
.el-tabs{
  padding: 0 20px;
}
/deep/ .el-tabs__header{
  margin-bottom: 0px;
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
</style>
