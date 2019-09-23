<template>
  <div class="page-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="网站信息" name="WIN">
        <el-form label-position="top" label-width="80px" :model="webSite">
          <el-form-item label="网站名称">
            <el-input v-model="webSite.site_name" placeholder="请输入" />
            <!-- <el-button type="primary" :loading="webSite.btnLoading">保存</el-button> -->
            <span>建议通俗好记的名称，方便管理</span>
          </el-form-item>
          <div class="domain">
            <div>
              <span class="el-form-item__label" style="font-weight: 700;display: inline-block;">网站域名</span>
              <a href="javascript:;" target="_blank">{{ webSite.domian }}</a>
            </div>
            <router-link :to="{path: '/cloud-station/website-manage/domain-bind'}" target="_blank">
              <el-button type="primary">前往绑定</el-button>
            </router-link>
          </div>
          <div class="website-img">
            <div class="el-form-item">
              <label class="el-form-item__label">网站logo</label>
              <div class="">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="webSite.site_logo" :src="webSite.site_logo" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </div>
            </div>
            <div class="el-form-item">
              <label class="el-form-item__label">网站icon</label>
              <div class="">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="webSite.site_icon" :src="webSite.site_icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </div>
            </div>
          </div>
          <el-form-item label="网站状态" class="status">
            <el-switch v-model="webSite.site_status" />
            <span>2019-8-8 17:29:14</span>
            <div class="hint">提示：适用于装修过程中，网站关闭后，网站将显示正在更新</div>
          </el-form-item>
          <div class="combo">
            <div class="el-form-item__label" style="font-weight: 700;display: inline-block;">网站套餐</div>
            <div class="versions">
              <span>{{ webSite.site_versions }}</span>
              <div>
                <span>升级</span>
                <span>续费</span>
              </div>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" :loading="webSite.btnLoading" @click="saveWebSite">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="网站TDK" name="TDK">
        <el-form label-position="top" label-width="80px" :model="tdk">
          <el-form-item label="Title">
            <el-input v-model="tdk.site_title" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="tdk.site_description" type="textarea" :rows="8" resize="none" placeholder="请输入..." />
          </el-form-item>
          <el-form-item label="keywords">
            <el-input v-model="tdk.meta_keywords" type="textarea" :rows="8" resize="none" placeholder="请输入..." />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="tdk.btnLoading" @click="saveTdk">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getBindInfo, updateBind, getTdkInfo, updateTdk } from '@/api/contentManage/websiteSet'
export default {
  name: 'WebsiteSet',
  data() {
    return {
      activeName: 'WIN',
      webSite: {
        btnLoading: false,
        site_name: '',
        domian: 'abcd.tempdemo.com',
        site_logo: '',
        site_icon: '',
        site_versions: '基础版',
        site_status: false
      },
      tdk: {
        site_title: '',
        meta_keywords: '',
        site_description: '',
        btnLoading: false
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
    if (this.activeName === 'WIN') {
      this.websiteInfo()
    } else {
      this.tdkInfo()
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.webSite.site_logo = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleClick(tab, event) {
      console.log(this.activeName)
      if (this.activeName === 'WIN') {
        this.websiteInfo()
      } else {
        this.tdkInfo()
      }
    },
    websiteInfo() {
      getBindInfo({ site_id: 1 }).then(res => {
        console.log(res)
        this.webSite.site_name = res.data.site_name
        this.webSite.domian = 'http//:' + res.data.domian
        this.webSite.site_logo = res.data.site_logo
        if (res.data.site_status === 1) {
          this.webSite.site_status = true
        } else {
          this.webSite.site_status = false
        }
        if (res.data.site_level === 1) {
          this.webSite.site_versions = '基础版'
        }
      })
    },
    tdkInfo() {
      getTdkInfo({ site_id: 1 }).then(res => {
        if (res.code === 0) {
          this.tdk.site_title = res.data.site_title
          this.tdk.site_description = res.data.site_description
          this.tdk.meta_keywords = res.data.meta_keywords
        }
      })
    },
    saveWebSite() {
      let site_status = 1
      if (!this.webSite.site_status) {
        site_status = 0
      }
      const { site_name } = this.webSite
      updateBind({
        site_id: 1,
        site_name,
        site_status: site_status
      }).then(res => {
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
    saveTdk() {
      const { site_title, meta_keywords, site_description } = this.tdk
      updateTdk({
        site_id: 1,
        site_title,
        meta_keywords,
        site_description
      }).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
$brColor: #ddd;
/deep/ .el-tabs__nav-wrap::after{
  display: none;
}
/deep/ .el-table--border, .el-table--group{
  border: 0;
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
.website-img{
  width: 50%;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.page-container{
  margin: 20px;
  background: #FFFFFF;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.14), 0 2px 2px 0 rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20);
  .el-tabs{
    padding: 0 20px;
  }
  .el-form-item__content{
    span{
      font-size: 12px;
      color: #909398;
    }
  }
}
/deep/ .el-form-item{
  width: 50%;
  .el-form-item__content{
    .el-button{
      margin-left: 5px;
    }
  }
}
/deep/ .domain{
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  margin-bottom: 10px;
  >div{
    display: flex;
    align-items: center;
    a{
      margin-left: 10px;
      color: #606266;
    }
  }
  .el-form-item__content::after,.el-form-item__content::before{
    display: none !important;
  }
  .el-form-item__label{
    padding-bottom: 0;
  }
}
.status{
  div.hint{
    font-size: 12px;
    color: #909398;
  }
}
.combo{
  width: 50%;
  .el-form-item__label{
    padding: 0;
  }
  .versions{
    font-size: 14px;
    color: #303133;
    display: flex;
    margin-bottom: 10px;
    >div{
      margin-left: 30px;
      span{
        color: #606FC7;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
