<template>
  <!-- <TableData /> -->
  <el-row class="site">
    <el-col v-for="(item, index) in sites" :key="index" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
      <el-card shadow="hover" class="box-card">
        <div class="box-left">
          <img :src="item.url?item.url:no_url" alt="">
        </div>
        <div class="box-right">
          <div class="site-info">
            <div class="site-name">{{ item.name }}</div>
            <p class="versions">{{ item.versions }}</p>
            <p>{{ item.site }}</p>
          </div>
          <div><el-button size="small" class="enter" @click="enterInto(item)">进入营销</el-button></div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
// import TableData from '@/components/TableData'

export default {
  name: 'Overview',
  // components: {
  //   TableData
  // }
  data() {
    return {
      no_url: require('@/assets/images/no_url.png'),
      sites: [
        {
          name: '聚焦网络',
          default: true,
          url: require('@/assets/images/weyes.png'),
          versions: '基础版',
          site: 'hayt2tgu.jujiaoailp.com',
          id: 1
        },
        {
          name: 'zzz',
          url: '',
          versions: '基础版',
          site: 'hayt1tgu.jujiaoailp.com',
          id: 2
        }
      ]
    }
  },
  created() {
    // 接口成功后执行
    this.setAllSite()
  },
  methods: {
    setAllSite() {
      // 选择站点调通接口后，移到接口成功后执行此语句
      this.$store.dispatch('market/setAllSite', this.sites)
    },
    enterInto(obj) {
      this.$store.dispatch('market/setSite', obj)
      this.$router.push({ path: '/market/optimization/seo' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card:not(:first-child){
  margin-top: 10px;
}
.el-col{
  padding: 6px 6px 0 0;
}
// .el-col:not(:nth-child(4n+4)){
//   padding-left: 0;
// }
.el-col:nth-child(4n){
  padding-right: 0;
}
.el-card{
  background: #FFFFFF;
  /deep/ .el-card__body{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    .box-left{
      line-height: 60px;
      text-align: center;
      img{
        width: 60px;
        height: 60px;
      }
    }
    .box-right{
      width: 100%;
      height: 80px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      .site-info{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #303133;
        .site-name{
          margin-bottom: 12px;
        }
        p{
          font-size: 13px;
          color: #909398;
          margin: 0;
        }
        p.versions{
          margin-bottom: 10px;
        }
      }
      .enter{
        background: #606FC7;
        color: #FFFFFF;
      }
    }
  }
}
.site{
  padding: 10px;
}
</style>
