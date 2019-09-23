<template>
  <div v-if="newPreviewList.length" class="content-preview">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color:#606266;">预览</span>
      </div>
      <div>
        <div v-for="(item, index) in newPreviewList" :key="index" class="text item">
          <div class="preview">
            <div class="preview-title">{{ item.platform }}</div>
            <div class="preview-content">
              <div class="preview-img">
                <img :src="item.photo" alt="" >
              </div>
              <div class="preview-info">
                <div class="name">{{ item.name }}</div>
                <div class="time">{{ item.time }}</div>
                <div class="text">
                  {{ item.content }}
                </div>
                <img :src="item.image" alt="" class="bottom-img" >
                <div />
                <div>
                  <!-- <span v-for="(kitem, kindex) in item.iconList" :key="kindex">
                  <i :class="kitem.icon" v-if="kitem.isShow" @click="handleClickIcon(kitem, item.iconList)" />
                </span> -->
                  <!-- <i class="el-icon-share" />
                  <i class="el-icon-refresh" />
                  <i class="el-icon-tickets" />
                  <i class="el-icon-star-off" />
                  <i v-if="false" class="el-icon-star-on" /> -->
                  <expand-dom :render="item.render" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'Preview',
  components: {
    expandDom: {
      functional: true,
      props: {
        render: Function
      },
      render: (h, ctx) => {
        return ctx.props.render(h)
      }
    }
  },
  props: {
    previewList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      iconList: [
        {
          icon: 'el-icon-share',
          type: 'share',
          isShow: true
        },
        {
          icon: 'el-icon-refresh',
          type: 'refresh',
          isShow: true
        },
        {
          icon: 'el-icon-tickets',
          type: 'tickets',
          isShow: true
        },
        {
          icon: 'el-icon-star-off',
          type: 'off',
          isShow: true
        },
        {
          icon: 'el-icon-star-on',
          type: 'on',
          isShow: false
        }
      ]
    }
  },
  computed: {
    newPreviewList() {
      //   console.log(this.previewList);
      //   if (this.previewList.length) {

      //     this.previewList.forEach(element => {
      //       //   element = Object.assign(element, { iconList: this.iconList });
      //       element.previewList = this.previewList;
      //     });
      //   }
      for (let j = 0, len = this.previewList.length; j < len; j++) {
        this.previewList[j].iconList = this.iconList
      }
      console.log(this.previewList)
      return this.previewList || []
    }
  },
  methods: {
    handleClickIcon(item, iconList) {
      console.log(item)
      console.log(iconList)
      switch (item.type) {
        case 'share':
          this.$message('分享操作')
          break
        case 'refresh':
          this.$message('刷新操作')
          break
        case 'tickets':
          this.$message('XX操作')
          break
        case 'off':
          item.isShow = !item.isShow
          iconList[4].isShow = true
          this.$message('收藏操作')
          break
        case 'on':
          item.isShow = !item.isShow
          iconList[3].isShow = true
          this.$message('取消收藏操作')
          break
        default:
          console.log('不操作')
      }
    },
    close(tag, index) {
      this.filterPramas.splice(index, 1)
      this.$emit('update:filterPramas', this.filterPramas)
    },
    clearFilters() {
      this.$emit('update:filterPramas', [])
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/styles/mixin.scss';
  .content-preview {
      margin-left: 30px;
      @include wh(500px, 640px);
      // width: 500px;
      overflow: scroll;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      //   border-radius: 10px;
      background-color: black;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      .is-always-shadow {
          background: #ffffff;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      }
      .preview {
          .preview-content {
              display: flex;
              margin-top: 20px;
              .preview-img {
                  flex: 1;
                  height: 48px;
                  @include flex(start, center);
                  img {
                      background: #e8e9ee;
                      border-radius: 100%;
                      @include wh(48px, 48px);
                  }
              }
              .preview-info {
                  flex: 5;
                  .time {
                      @include font(13px, #909398);
                  }
                  .text {
                      @include font(13px, #606266);
                      margin-top: 6px;
                  }
                  .bottom-img {
                      @include wh(300px, 225px);
                      background-color: red;
                  }
              }
          }
      }
  }
</style>
