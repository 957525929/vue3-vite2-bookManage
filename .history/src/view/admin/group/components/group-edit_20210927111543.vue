<template>
  <div>
    <a-card>编辑分组权限</a-card>
    <a-card class="content">
      <div style="width: 60%; margin-bottom: 30px">
        <Common ref="checkbox" @getId="getData" :id="id" />
      </div>
      <a-button type="primary" @click="onSubmit">确定</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-card>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted, watch } from "vue";
import { CheckboxGroup, message } from "ant-design-vue";
//api
import { assignPermissions, removePermissions } from "@/api/api.js";
import Common from "./common.vue";
import { useRoute } from "vue-router";
export default {
  emits: ["changeList"],
  components: { Common },
  setup() {
    let route = useRoute();
    let id = route.query.id;
    const checkbox = ref(null);
    const state = reactive({
      data: [],
      id: id,
      key: "",
      len: "",
      isFirst: true,
      arr: "",
    });
    const formState = reactive({
      group_id: "",
      permission_ids: [],
    });
    const removeState = reactive({
      group_id: "",
      permission_ids: [],
    });
    const getList = async () => {
      // console.log(id);
      // console.log(res);
      // console.log(checkbox.value.permission_ids);
    };
    // const checkbox = ref(null);
    const onSubmit = async () => {
      // state.key = "stop";
      let checkedData = checkbox.value.checkedList;
      let checkedData1 = checkbox.value.checkedList1;
      formState.permission_ids = [...checkedData, ...checkedData1];
      formState.group_id = id;
      let res;

      if (state.len > formState.permission_ids.length) {
        removeState.group_id = formState.group_id;
        removeState.permission_ids = state.arr.filter(function (item1) {
          return formState.permission_ids.every(function (item2) {
            return item2 !== item1;
          });
        });
        res = await removePermissions(removeState);
      } else if (state.len < formState.permission_ids.length) {
        res = await assignPermissions(formState);
      } else {
        message.error("在没有改动时，不要提交！");
      }
      state.len = formState.permission_ids.length;

      if (res) {
        message.success(res.data.message);
      }
    };
    // const resetForm = () => {
    //   formState.name = "";
    //   formState.info = "";
    //   // checkbox.value.resetForm();
    // };
    const getData = (value) => {
      state.len = value.length;
      state.arr = value;
      // console.log(state.len);
    };
    onMounted(() => {
      getList();
      //需要获取最开始的state.len
      // state.len = checkbox.value.permission_ids.length;

      // checkbox.value.checkedList.length + checkbox.value.checkedList1.length;
    });

    return {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
      // resetForm,
      checkbox,
      onSubmit,
      formState,
      ...toRefs(state),
      getList,
      getData,
      removeState,
    };
  },
};
</script>

<style lang="less" scoped></style>
