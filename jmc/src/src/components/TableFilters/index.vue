<template>
  <div v-if="filterPramas.length > 0" class="table-Filter">
    <span>
      <svg-icon icon-class="form" />
      已筛选 {{ filterPramas.length }} 项
    </span>
    <el-tag
      v-for="(tag, index) in filterPramas"
      :key="index"
      closable
      size="small"
      class="mr-2"
      :type="tag.type"
      @close="close(tag, index)"
    >
      {{ tag.name }}： {{ tag.value === 'ascending' ? '正序' : tag.value === 'descending' ? '倒序' : '' }}
    </el-tag>
    <small class="text-muted" @click="clearFilters">清空</small>
  </div>
</template>

<script>
export default {
  name: 'TableFilter',
  props: {
    filterPramas: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
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
  .text-muted {
    cursor: pointer;
  }
</style>
