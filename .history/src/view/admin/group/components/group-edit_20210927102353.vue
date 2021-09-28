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
      // console.log(formState.permission_ids.length);
      // formState.permission_ids = checkbox.value.permission_ids;
      // console.log(formState.permission_ids);
      formState.group_id = id;
      let res;
      // console.log("长度");
      // console.log(state.len);
      // console.log(state.arr);
      for (let i in state.arr) {
        for (let k in formState.permission_ids) {
          //  if(state.arr[i])
          if (state.arr[i] != formState.permission_ids[k] && state.arr[i].length > formState.permission_ids[k].length) {
            console.log("adasassas");
            console.log(state.arr[i]);
          }
        }
      }
      // if (state.len > formState.permission_ids.length) {
      //   res = await removePermissions(formState);
      // } else {
      //   res = await assignPermissions(formState);
      // }
      state.len = formState.permission_ids.length;
      // console.log("2222");
      // console.log(state.len);
      // console.log(state.arr);
      // console.log(checkbox.value.permission_ids);

      state.isFirst = false;
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
    };
  },
};
</script>

<style lang="less" scoped></style>
