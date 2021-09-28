<template>
  <div>
    <a-card>添加用户</a-card>
    <a-card>
      <a-form ref="formRef" :model="formState" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="title" />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="author" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="image" />
        </a-form-item>
        <a-form-item label="确认密码" name="confirm_password">
          <a-input v-model:value="image" />
        </a-form-item>
        <a-form-item label="选择分组" name="group_ids">
          <a-checkbox-group v-model:value="value1" :options="plainOptions" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click.prevent="onSubmit">保存</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted, watch } from "vue";
import { message } from "ant-design-vue";
import { Form } from "ant-design-vue";
const useForm = Form.useForm;

//api
import { addBook } from "@/api/api.js";
export default {
  setup() {
    const formRef = ref(null);
    const plainOptions = [
      {
        label: "guest",
        value: "2",
      },
      {
        label: "string",
        value: "3",
      },
    ];
    const formState = reactive({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      group_ids: "",
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
      username: [{ validator: checkUsername, trigger: "change" }],
      password: [{ validator: checkPassword, trigger: "change" }],
      confirm_password: [{ validator: checkConfirm_password, trigger: "change" }],
    });
    /** 检验密码 */
    const checkPassword = async (rule, value, callback) => {
      const passwords = formState.password;
      if (!value) {
        return Promise.reject("请输入密码"); //不存在的情况
      } else if (passwords && value && passwords !== value) {
        // 必须是两个密码都存在的情况下，才会检测密码是否一致。否则不检测
        return Promise.reject("两次密码不一致"); //密码错误的情况
      } else {
        // callback();
        return Promise.resolve();
      }
    };
    /** 检验重置密码 */
    const checkPasswords = async (rule, value, callback) => {
      const pas = formConfig.account_form.password;
      if (!value) {
        return Promise.reject("请再次输入密码"); //不存在的情况
      } else if (!password(value)) {
        return Promise.reject("请输入6~20位的，数字+英文"); //密码错误的情况
      } else if (pas && value && pas !== value) {
        return Promise.reject("两次密码不一致"); //密码错误的情况
      } else {
        // callback();
        return Promise.resolve();
      }
    };

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
      rulesRef,
    };
  },
};
</script>

<style lang="less" scoped></style>
