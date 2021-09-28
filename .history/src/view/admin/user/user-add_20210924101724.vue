<template>
  <div>
    <a-card>添加用户</a-card>
    <a-card>
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="用户名" v-bind="validateInfos.username">
          <a-input v-model:value="title" />
        </a-form-item>
        <a-form-item label="邮箱" v-bind="validateInfos.email">
          <a-input v-model:value="author" />
        </a-form-item>
        <a-form-item label="密码" v-bind="validateInfos.password">
          <a-input v-model:value="image" />
        </a-form-item>
        <a-form-item label="确认密码" v-bind="validateInfos.confirm_password">
          <a-input v-model:value="image" />
        </a-form-item>
        <a-form-item label="选择分组" v-bind="validateInfos.group_ids">
          <a-checkbox-group v-model:value="value1" name="checkboxgroup" :options="plainOptions" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">保存</a-button>
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
import { addBook } from "@/api/api.js";
export default {
  setup() {
    const formRef = ref(null);
    const plainOptions = [
      {
        label: "Pear",
        value: "2",
      },
      {
        label: "Pear",
        value: "2",
      },
    ];
    const formState = reactive({
      title: "",
      author: "",
      image: "",
      summary: "",
    });
    const onSubmit = async () => {
      let res = await addBook(formState);
      message.success(res.data.message);
      resetForm();
    };
    const resetForm = () => {
      formState.title = "";
      formState.author = "";
      formState.image = "";
      formState.summary = "";
    };
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: "Please input name",
        },
      ],
      region: [
        {
          required: true,
          message: "Please select region",
        },
      ],
      type: [
        {
          required: true,
          message: "Please select type",
          type: "array",
        },
      ],
    });

    return {
      ...toRefs(formState),
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
      resetForm,
      formRef,
      onSubmit,
      plainOptions,
    };
  },
};
</script>

<style lang="less" scoped></style>
