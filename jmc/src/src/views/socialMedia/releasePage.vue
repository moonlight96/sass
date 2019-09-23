<template>
  <div class="page-container">
    <div class="content-release">
      <div class="form-container">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="title">发布到</div>
          <el-select v-model="form.region" multiple placeholder="选择一个社媒平台" @change="change">
            <el-option v-for="item in form.cities" :key="item.value" :label="item.label" :value="item.value">
              <!-- <el-checkbox v-model="item[checked]"> -->
              <input type="checkbox" :checked="item.checked" >
              <span> <i class="el-icon-share" /></span>
              <span style=" color: #8492a6; font-size: 13px">{{ item.value }}</span>
              <!-- </el-checkbox> -->
            </el-option>
            <div
              style="background:#f4f6fa;text-align:center;padding:0 20px;color:606266;cursor:pointer;"
              @click="jumpToFlatform"
            >
              添加一个社媒平台
            </div>
          </el-select>
          <div class="title"><span style="color:red;">*</span> 内容</div>
          <div class="textarea-box">
            <el-input
              v-model="form.content"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="内容添加最新的热门搜索，热门人物、热门话题等，可以为您的内容增加曝光和关注哦"
              @input="handleInputTextarea"
            />
            <span class="textarea-text">{{ form.content.length }}/1200</span>
          </div>
          <div class="prompt-text">
            <div class="content-left">不同社媒平台，对内容字节数有限制。如：Twitter 280。</div>
            <div class="content-right">
              <span>缩短链接</span>
            </div>
          </div>
          <div class="title" style="padding-bottom:0;">草稿</div>
          <div class="draft">
            <el-switch v-model="form.delivery" class="c-switch" active-color="#13CE66" />
          </div>
          <el-row :gutter="20">
            <el-col v-for="(item, index) in uploadList" :key="index" :span="3">
              <div class="grid-content bg-purple flex item-text" @click="handleUpload(item.type)">
                <div>{{ item.title }}</div>
                <i :class="item.icon" />
              </div>
            </el-col>
          </el-row>
          <div class="title">标签</div>
          <div class="aaa">
            <el-tag
              v-for="tag in form.dynamicTags"
              :key="tag"
              closable
              :disable-transitions="false"
              size="medium "
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
          </div>
          <!-- </el-col>
        </el-row> -->
          <div class="title">方式</div>
          <el-select v-model="form.methods" placeholder="马上发布">
            <el-option label="马上发布" value="1" />
            <el-option label="加入计划表" value="2" />
          </el-select>
          <div class="release-time" @click="dialogTableVisible = true">
            最佳发布时间
          </div>
          <div class="release-button">
            <el-button @click="$message('功能暂未开放')">取消</el-button>
            <el-button type="primary" class="confirm" @click="onSubmit">确定</el-button>
          </div>
        </el-form>
      </div>

      <el-dialog title="社媒活跃时间表" :visible.sync="dialogTableVisible" center>
        <div>
          发布内容的目的就是为了吸引这些来自不同平台的受众。在此基础上，准确把握每个平台的最佳发布时间，是推动内容影响力和受众参与度的关键性因素
        </div>
        <div>Facebook</div>

        <div>
          <div>最佳发帖时段：</div>
          <div>1、周六、周日的中午12点-下午1点</div>
          <div>2、周四、周五的下午1点-4点</div>
          <div>3、周三下午三点</div>
        </div>
        <div>
          <div>能够增加分享和点击率的时段：</div>
          <div>1、下午一点</div>
          <div>2、下午三点</div>
          <div>3、早上9点</div>
        </div>
        <div>
          效果最差时段是周末的上午8点之前，以及晚上8点之后。比较有趣的内容可以在周五发。下午3点发帖可以获得最大点击量，下午1点发帖可以获得最大转发量。
        </div>
      </el-dialog>
    </div>
    <preview :preview-list="previewList" />
  </div>
</template>

<script>
import preview from './components/preview'
export default {
  name: 'ReleasePage',
  components: {
    preview
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        methods: '',
        delivery: false,
        type: [],
        resource: '',
        content: '',
        value4: '',
        dynamicTags: ['标签一'],
        cities: [
          {
            value: 'Beijing',
            label: '北京',
            checked: false
          },
          {
            value: 'Shanghai',
            label: '上海',
            checked: false
          },
          {
            value: 'Nanjing',
            label: '南京',
            checked: false
          },
          {
            value: 'Chengdu',
            label: '成都',
            checked: false
          },
          {
            value: 'Shenzhen',
            label: '深圳',
            checked: false
          },
          {
            value: 'Guangzhou',
            label: '广州',
            checked: false
          }
        ]
      },
      inputVisible: false,
      dialogTableVisible: false,
      inputValue: '',
      uploadList: [
        {
          title: '产品',
          icon: 'el-icon-share',
          type: 'product'
        },
        {
          title: '图片',
          icon: 'el-icon-share',
          type: 'image'
        },
        {
          title: '视频',
          icon: 'el-icon-share',
          type: 'video'
        }
      ],
      previewList: [
        {
          platform: '腾讯',
          name: '马云',
          photo: require('@/assets/images/weyes.png'),
          image: require('@/assets/images/weyes.png'),
          content:
            'There is such a lot of talk going around about branding, but what exactly is your brand and how do you use it to help you reach more people and market your products or services? Your brand is the core of your marketing, thecentral theme around your products and services',
          time: '1992/02/12',
          render: (h, params) => {
            return (
              <div>
                <i class='el-icon-share' />
                <i class='el-icon-refresh' />
                <i class='el-icon-tickets' />
                <i class='el-icon-star-off' />
                <i class='el-icon-star-on' />
              </div>
              //   'i',
              //   {
              //     class: {
              //       'el-icon-share': true
              //     },
              //     // style: {
              //     //   width: '50px'
              //     // },
              //     // domProps: {
              //     //   innerText: '11'
              //     // }
              //   },
            )
          }
        },
        {
          platform: '腾讯',
          name: '马云',
          photo: require('@/assets/images/weyes.png'),
          image: require('@/assets/images/weyes.png'),
          content:
            'There is such a lot of talk going around about branding, but what exactly is your brand and how do you use it to help you reach more people and market your products or services? Your brand is the core of your marketing, thecentral theme around your products and services',
          time: '1992/02/12',
          render: (h, params) => {
            return h(
              'a',
              {
                attrs: {
                  href: 'https://www.baidu.com'
                }
              },
            )
          }
        },
        {
          platform: '腾讯',
          name: '马云',
          photo: require('@/assets/images/weyes.png'),
          image: require('@/assets/images/weyes.png'),
          content:
            'There is such a lot of talk going around about branding, but what exactly is your brand and how do you use it to help you reach more people and market your products or services? Your brand is the core of your marketing, thecentral theme around your products and services',
          time: '1992/02/12',
          render: (h, params) => {
            return h(
              'a',
              {
                attrs: {
                  href: 'https://www.baidu.com'
                }
              },
            )
          }
        },
        {
          platform: '腾讯',
          name: '马云',
          photo: require('@/assets/images/weyes.png'),
          image: require('@/assets/images/weyes.png'),
          content:
            'There is such a lot of talk going around about branding, but what exactly is your brand and how do you use it to help you reach more people and market your products or services? Your brand is the core of your marketing, thecentral theme around your products and services',
          time: '1992/02/12',
          render: (h, params) => {
            return h(
              'a',
              {
                attrs: {
                  href: 'https://www.baidu.com'
                }
              },
              //   params.row.typex
            )
          }
        },
        {
          platform: '腾讯',
          name: '马云',
          photo: require('@/assets/images/weyes.png'),
          image: require('@/assets/images/weyes.png'),
          content:
            'There is such a lot of talk going around about branding, but what exactly is your brand and how do you use it to help you reach more people and market your products or services? Your brand is the core of your marketing, thecentral theme around your products and services',
          time: '1992/02/12',
          render: (h, params) => {
            return h(
              'a',
              {
                attrs: {
                  href: 'https://www.baidu.com'
                }
              },
            )
          }
        }
      ]
    }
  },
  mounted() {
    console.log(this.$router)
    console.log(this.$route)
  },
  methods: {
    change(value) {
      if (value.length) {
        for (let j = 0, len = this.form.cities.length; j < len; j++) {
          this.form.cities[j].checked = false
          for (let k = 0, Len = value.length; k < Len; k++) {
            if (this.form.cities[j].value == value[k]) {
              this.form.cities[j].checked = true
            }
          }
        }
      } else {
        for (let j = 0, len = this.form.cities.length; j < len; j++) {
          this.form.cities[j].checked = false
        }
      }
    },
    handleUpload(type) {
      switch (type) {
        case 'product':
          this.$message('产品操作')
          break
        case 'image':
          this.$message('图片操作')
          break
        case 'video':
          this.$message('视频操作')
          break
        default:
          console.log('1')
      }
    },
    jumpToFlatform() {
      this.$message('前往社媒平台')
      return
    },
    handleInputTextarea() {
      if (this.form.content.length > 1200) {
        this.$message.error('超过输入最大上限')
        this.form.content = this.form.content.slice(0, 1200)
        return
      }
    },
    onSubmit() {
      console.log('submit!')
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    handleClose(tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      if (this.form.dynamicTags.length >= 1) {
        this.$message.error('只能添加一条哦')
        this.inputValue = ''
        this.inputVisible = false
        return
      }
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue

      if (inputValue) {
        this.form.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleInput(type, e) {
      console.log(e)
      console.log(type)
    }
  }
}
</script>

<style lang="scss"  scoped >
  @import '~@/styles/mixin.scss';
  .page-container {
      margin: 20px;
      display: flex;
      .content-release {
          .form-container {
              background-color: #fff;
              width: 696px;
              box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
              padding: 20px;
              .title {
                  @include font(12px, #606266);
                  padding: 10px 10px 10px 0;
              }
              .el-select {
                  width: 100%;
              }
              .grid-content {
                  @include font(12px, #909398);
              }
              .draft {
                  width: 100%;
                  height: 40px;
                  @include bb-1px(#dfe3e8);
                  margin-bottom: 10px;
              }
              .c-switch {
                  margin-bottom: 6px;
                  height: 40px;
              }
              .aaa {
                  width: 100%;
                  height: 33px;
                  @include bb-1px(#dfe3e8);
                  .el-tag--small {
                      float: left;
                      @include clearfix;
                  }
                  .button-new-tag {
                      float: right;
                      @include clearfix;
                      border: 0;
                      @include font(22px, #737578);
                  }
              }
              .item-text {
                  @include font(14px, #606fc7);
                  i {
                      margin-left: 6px;
                  }
              }
              .prompt-text {
                  margin: 5px 0;
                  @include clearfix;
                  .content-left {
                      float: left;
                      @include clearfix;
                      @include font(12px, #909398);
                      line-height: 18px;
                  }
                  .content-right {
                      float: right;
                      @include clearfix;
                      @include font(12px, #606fc7);
                      text-decoration: underline;
                      letter-spacing: 0;
                  }
              }

              .el-tag + .el-tag {
                  margin-left: 10px;
              }
              .button-new-tag {
                  margin-left: 10px;
                  height: 32px;
                  line-height: 30px;
                  padding-top: 0;
                  padding-bottom: 0;
              }
              .el-tag--light {
                  background-color: #e8e9ee;
                  color: #606266;
                  border: 1px solid #babdce;
                  border-radius: 2px;
              }
              /deep/ .el-tag__close {
                  color: #909398;
              }
              .input-new-tag {
                  width: 90px;
                  margin-left: 10px;
                  vertical-align: bottom;
              }
              .release-time {
                  color: #606fc7;
                  font-size: 12px;
                  text-decoration: underline;
                  margin-top: 6px;
              }
              .release-button {
                  margin-top: 20px;
                  .confirm {
                      background-color: #606fc7;
                  }
              }
              .textarea-box {
                  position: relative;
                  .textarea-text {
                      position: absolute;
                      bottom: 0;
                      right: 20px;
                      @include font(12px, #909398);
                  }
              }
          }
      }
  }
  .flex {
      display: flex;
      align-items: center;
  }
  /*滚动条样式*/
  ::-webkit-scrollbar-track-piece {
      //滚动条凹槽的颜色，还可以设置边框属性
      background-color: #f8f8f8;
  }

  ::-webkit-scrollbar {
      //滚动条的宽度
      width: 9px;
      height: 9px;
  }

  ::-webkit-scrollbar-thumb {
      //滚动条的设置
      background-color: #dddddd;
      background-clip: padding-box;
      min-height: 28px;
  }
  ::-webkit-scrollbar-thumb:hover {
      background-color: #bbb;
  }
  /deep/ input {
      background: none;
      outline: none;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid#DFE3E8;
  }
  /deep/ .el-col-20 {
      padding-left: 0px !important ;
  }
</style>
