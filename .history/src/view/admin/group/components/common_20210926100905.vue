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
export default {
  setup() {
    const state = reactive({
      indeterminate: true,
      indeterminate1: true,
      checkAll: false,
      checkAll1: false,
      checkedList: [],
      checkedList1: [],
      checkedList2: [],
      checkedList3: [],
      data: [],
      checkbox: [],
      checkbox1: [],
    });
    const onCheckAllChange = (e) => {
      Object.assign(state, {
        checkedList: e.target.checked ? state.checkedList2 : [],
        indeterminate: false,
      });
    };
    const onCheckAllChange1 = (e) => {
      Object.assign(state, {
        checkedList1: e.target.checked ? state.checkedList3 : [],
        indeterminate: false,
      });
    };
    const resetForm = () => {
      formState.name = "";
      formState.info = "";
      state.checkedList = [];
      state.checkedList1 = [];
    };
    return {
      state,
      onCheckAllChange,
      onCheckAllChange1,
    };
  },
};
</script>

<style></style>
