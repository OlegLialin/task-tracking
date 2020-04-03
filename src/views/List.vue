<template>
  <div>
  <h1>List</h1>
    <hr>
    <table v-if="tasks.length">
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Date</th>
        <th>Description</th>
        <th>Status</th>
        <th>Open</th>
      </tr>
      </thead>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
  export default {
    computed: {
      tasks() {
        return  this.$store.getters.tasks
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>