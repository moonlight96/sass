<template>
  <div :class="{'hidden':hidden}" class="tableData h-100">
    <!-- 已筛选区 -->
    <div class="tableData-tags">
      <span>
        <svg-icon icon-class="form" />
        已筛选 {{ tags.length }} 项
      </span>
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        closable
        size="small"
        class="mr-2"
        :type="tag.type"
        @close="getList(tag)"
      >
        {{ tag.name }}
      </el-tag>
      <small class="text-muted">清空</small>
    </div>
    <!-- TAB + 批量操作 -->
    <div class="tableData-nav d-flex justify-content-between align-items-center">
      <el-tabs v-model="activeName" @tab-click="getList">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
      <div class="tableData-icons">
        <i class="el-icon-edit" />
        <i class="el-icon-share" />
        <i class="el-icon-delete" />
      </div>
    </div>
    <!-- 列表 -->
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'TableData',
  components: {
    Pagination
  },
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: 'first',
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ],
      total: 1,
      listQuery: {
        page: 1,
        limit: 1
      }
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    getList() {},
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.tableData-box {
  height: 100%;
}
</style>
