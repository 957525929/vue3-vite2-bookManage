<template>
  <div class="detail">
    <div class="group">
      <a-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange"> 图书 </a-checkbox>
    </div>
    <div class="group backColor">
      <a-checkbox-group v-model:value="checkedList" :options="checkbox" />
    </div>
    <div class="group">
      <a-checkbox v-model:checked="checkAll1" :indeterminate="indeterminate" @change="onCheckAllChange1"> 日志 </a-checkbox>
    </div>
    <div class="group backColor">
      <a-checkbox-group v-model:value="checkedList1" :options="checkbox1" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
