<template>
  <div class="page-container">
    <el-button type="primary" size="small" class="create-site">创建网站</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="网站列表" name="first">
        <div class="site-list">
          <el-row v-for="item in list" :key="item.id" type="flex" align="middle">
            <el-col :span="2" class="site-logo">
              <img :src="item.site_logo?item.site_logo:no_img" alt="">
            </el-col>
            <el-col :span="6" class="site-info">
              <div>{{ item.site_name }}</div>
              <a :href="item.domain?item.domain:'javascript:;'" :target="item.domain?'_blank':'_self'">{{ item.domain?item.domain:'无' }}</a>
            </el-col>
            <el-col :span="5">
              <p>创建时间：{{ item.create_time }}</p>
              <p>到期时间：{{ item.update_time }}</p>
            </el-col>
            <el-col :span="11" class="site-btn">
              <div class="icon-item" @click="siteMange(item)">
                <i class="el-icon-edit" />
                <span>管理站点</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="LP列表" name="second">LP列表</el-tab-pane>
    </el-tabs>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="paginationChange"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getWebsiteList } from '@/api/contentManage/websiteList'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      no_img: require('@/assets/images/no_url.png'),
      activeName: 'first',
      query: {
        page_number: 1,
        page_size: 20
      },
      list: [],
      listQuery: {
        page: 1,
        limit: 1
      },
      total: 2
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getWebsiteList(this.query).then(res => {
        console.log(res)
        this.list = res.data.list
        this.total = res.data.total
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    paginationChange(val) {
      console.log(val)
    },
    siteMange(obj) {
      this.$router.push({ path: '/cloud-station/content-manage/article-list' })
    }
  }
}
</script>
<style lang="scss" scoped>
$brColor: #ddd;
.page-container{
  margin: 20px auto;
  position: relative;
  width: 80%;
  background: #FFFFFF;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.14), 0 2px 2px 0 rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20);
  .create-site{
    position: absolute;
    right: 20px;
    z-index: 1;
    margin-top: 8px;
  }
  .site-list{
    overflow: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 241px);
    .el-row{
      border-bottom: 1px solid #DFE3E8;
    }
    p{
      margin: 0;
      font-size: 12px;
    }
    .el-row{
      padding: 15px;
    }
    .site-logo{
      width: 80px;
      height: 80px;
      padding: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .site-info{
      font-size: 18px;
      font-weight: bold;
      // display: -webkit-box;
      // overflow: hidden;
      // -webkit-box-orient: vertical;
      // -webkit-line-clamp: 1;
      margin-right: 10px;
      div:first-child{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      a{
        font-size: 14px;
        color: #c0c4cc;
        font-weight: normal;
      }
    }
    .site-btn{
      font-size: 12px;
      color: #606266;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .icon-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px 10px;
        cursor: pointer;
        i{
          padding: 5px;
        }
      }
    }
  }
}
/deep/ .el-tabs__nav-wrap::after{
  display: none;
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
</style>
