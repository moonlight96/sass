<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path d="M587.56437024 512.21607106L400.15297778 324.8046786c-7.59403339-7.59446554-7.59403339-19.90705867 0-27.5015242 7.59446554-7.59403339 19.90705867-7.59403339 27.50152421 0l193.21722176 193.21722176c11.98200442 11.98243657 11.98200442 31.40895321 0 43.39138977L427.65450198 727.12898772c-7.59446554 7.59403339-19.90705867 7.59403339-27.5015242 0-7.59403339-7.59446554-7.59403339-19.90705867 0-27.50152421L587.56437024 512.21607106z" fill="#606266" p-id="849" />
      <!-- <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" /> -->
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  background-color: #E1E2E5;
  border-radius: 50%;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
