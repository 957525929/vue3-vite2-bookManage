<template>
  <div>
    <a-card>编辑分组权限</a-card>
    <a-card class="content">
      <div style="width: 60% margin-bottom:10px">
        <Common ref="checkbox" />
      </div>
      <a-button type="primary" @click="onSubmit">保存</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-card>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted, watch } from "vue";
import { message } from "ant-design-vue";
//api
import { permissions, addPermissions, getUsersGroup } from "@/api/api.js";
import Common from "./common.vue";
export default {
  emits: ["changeList"],
  components: { Common },
  setup(props, context) {
    const formRef = ref(null);
    const state = reactive({
      data: [],
    });
    const formState = reactive({
      name: "",
      info: "",
      permission_ids: "",
    });
    const checkbox = ref(null);
    const onSubmit = async () => {
      let checkedData = checkbox.value.checkedList;
      let checkedData1 = checkbox.value.checkedList1;
      formState.permission_ids = [...checkedData, ...checkedData1];
      let res = await addPermissions(formState);
      if (res) {
        message.success(res.data.message);
        context.emit("changeList", res);
      }
      resetForm();
    };
    const resetForm = () => {
      formState.name = "";
      formState.info = "";
      checkbox.value.resetForm();
    };

    return {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
      resetForm,
      formRef,
      onSubmit,
      formState,
      ...toRefs(state),
      checkbox,
    };
  },
};
</script>

<style lang="less" scoped></style>
