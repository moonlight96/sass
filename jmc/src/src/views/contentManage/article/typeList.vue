<template>
  <div class="type-list">
    <el-row type="flex" justify="start">
      <el-button @click="togglePopUpBox">分类管理</el-button>
    </el-row>
    <el-dialog
      :visible.sync="popUpBox.isShow"
      width="100%"
      custom-class="modal-xl"
      :close-on-click-modal="false"
    >
      <div class="header">
        <div class="left">
          <span>用户管理</span>
          <span>分类层级最多三级</span>
        </div>
        <div class="right">
          <el-button>添加分类</el-button>
        </div>
      </div>
    </el-dialog>
    <Dialog />
  </div>
</template>

<script>
import Dialog from './dialog.vue'
export default {
  name: 'TypeList',
  components: {
    Dialog
  },
  data() {
    return {
      // 分类管理的弹出框相关数据
      popUpBox: {
        isShow: true
      }
    }
  },
  methods: {
    togglePopUpBox() {
      this.popUpBox.isShow = !this.popUpBox.isShow
    }
  }
}
</script>

<style scoped lang="scss">

.type-list{
  padding: 15px;
}

.header{
  position: absolute;
  top: 0;
  right:0;
  left: 0;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 40px;

  .left span:first-of-type{
    font-size: 18px;
    color: #000;
  }
  .left span:last-of-type{
    font-size: 13px;
    color: #989898;
  }
}

</style>
