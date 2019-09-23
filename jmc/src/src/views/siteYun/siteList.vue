<template>
  <div class="page-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="网站列表" name="first">
        <div class="site-list">
          <el-row v-for="item in list" :key="item.id" type="flex" align="middle">
            <el-col :span="2" class="site-logo">
              <img :src="item.img?item.img:no_img" alt="">
            </el-col>
            <el-col :span="6" class="site-info">
              <div>{{ item.name }}</div>
              <a :href="item.url" target="_blank">{{ item.url }}</a>
            </el-col>
            <el-col :span="4">
              <p>创建时间：{{ item.create_time }}</p>
              <p>到期时间：{{ item.update_time }}</p>
            </el-col>
            <el-col :span="12" class="site-btn">
              <el-button>管理站点</el-button>
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
export default {
  components: {
    Pagination
  },
  data() {
    return {
      no_img: require('@/assets/images/no_url.png'),
      activeName: 'first',
      list: [
        {
          id: 1,
          name: '聚焦网络',
          img: require('@/assets/images/weyes.png'),
          url: 'http://www.baidu.com',
          create_time: '2019/8/9 10:52:49',
          update_time: '2019/8/9 23:59:59'
        },
        {
          id: 2,
          name: '聚焦网络2',
          img: require('@/assets/images/weyes.png'),
          url: 'http://www.baidu.com',
          create_time: '2019/8/9 10:52:49',
          update_time: '2019/8/9 23:59:59'
        }
      ],
      listQuery: {
        page: 1,
        limit: 1
      },
      total: 2
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    paginationChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container{
  padding: 20px;
  .site-list{
    overflow: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 241px);
    p{
      margin: 0;
      font-size: 12px;
    }
    .el-row{
      padding: 15px;
      border-bottom: 1px solid #e3e9f0;
    }
    .site-info{
      font-size: 20px;
      font-weight: bold;
      a{
        font-size: 14px;
        color: #c0c4cc;
        font-weight: normal;
      }
    }
    .site-btn{
      text-align: right;
    }
  }
}
/deep/ .el-tabs--card>.el-tabs__header{
  border-bottom: 0;
}
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item {
  border-bottom: 1px solid #e4e7ed;
}
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  background-color: #409eff;
  color: #fff;
}
</style>
