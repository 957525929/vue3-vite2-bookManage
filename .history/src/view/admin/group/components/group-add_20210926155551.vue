<template>
  <div>
    <a-card>新建分组信息</a-card>
    <a-card class="content">
      <a-form name="custom-validation" ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol" @finish="onSubmit">
        <a-form-item has-feedback label="分组名称" name="username">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item has-feedback label="分组描述" name="email">
          <a-input v-model:value="formState.info" />
        </a-form-item>
        <a-form-item has-feedback label="分配权限" name="permission_ids"><Common ref="checkbox" /> </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit" @click="save">保存</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
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
      // console.log(state.checkedList1);
      // console.log(state.checkedList);
      context.emit("changeList", state.checkedList);
      formState.permission_ids = [...state.checkedList, ...state.checkedList1];
      console.log(formState);
      let res = await addPermissions(formState);
      if (res) {
        message.success(res.data.message);
        this.$emit("changeList", res);
      }
      resetForm();
    };
    const resetForm = () => {
      formState.name = "";
      formState.info = "";
      checkbox.value.resetForm();
    };

    const save = () => {
      checkbox.value.state();
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
      save,
      checkbox,
    };
  },
};
</script>

<style lang="less" scoped></style>
