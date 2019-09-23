export const del = (that, id, fn) => {
  that.$confirm(`此操作将删除id号为${id}的数据, 是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    fn()
  }).catch(() => {
    that.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
}
