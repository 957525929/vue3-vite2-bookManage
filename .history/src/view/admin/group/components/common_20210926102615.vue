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
import { reactive, toRefs, ref, onMounted, watch } from "vue";
//api
import { permissions, addPermissions, getUsersGroup } from "@/api/api.js";
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
    const getList = async () => {
      let res = await permissions();
      let data = res.data;
      if (!data) {
        return false;
      }
      data.图书.map((item) => {
        state.checkbox.push({
          label: item.name,
          value: item.id,
        });
        state.checkedList2.push(item.id);
      });
      data.日志.map((item) => {
        state.checkbox1.push({
          label: item.name,
          value: item.id,
        });
        state.checkedList3.push(item.id);
      });
    };
    const resetForm = () => {
      state.checkedList = [];
      state.checkedList1 = [];
    };
    onMounted(() => {
      getList();
    });
    watch(
      () => [state.checkedList, state.checkedList1],
      (val, val1) => {
        console.log(val, val1);
        state.indeterminate = !!val.length && val.length < state.checkbox.length;
        state.checkAll = val.length === state.checkbox.length;
        state.indeterminate = !!val1.length && val1.length < state.checkbox1.length;
        state.checkAll1 = val1.length === state.checkbox1.length;
      }
      //   () => state.checkedList1,
      //   (val1) => {
      //     console.log(val1);
      //     state.indeterminate = !!val1.length && val1.length < state.checkbox1.length;
      //     state.checkAll1 = val1.length === state.checkbox1.length;
      //   }
    );
    return {
      ...toRefs(state),
      onCheckAllChange,
      onCheckAllChange1,
      resetForm,
      getList,
    };
  },
};
</script>

<style lang="less" scoped>
.detail {
  height: 200px;
  display: flex;
  flex-direction: column;
  .group {
    flex: 1;
    line-height: 50px;
  }
}
.backColor {
  background-color: #fafafa;
}
</style>
