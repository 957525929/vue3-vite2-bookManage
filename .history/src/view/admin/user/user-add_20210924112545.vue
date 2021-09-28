<template>
  <div>
    <a-card>添加用户</a-card>
    <a-card>
      <a-form name="custom-validation" ref="formRef" :model="formState" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol" v-bind="layout" @finish="onSubmit">
        <a-form-item has-feedback label="用户名" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item has-feedback label="邮箱" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="确认密码" name="confirm_password">
          <a-input v-model:value="formState.confirm_password" />
        </a-form-item>
        <a-form-item label="选择分组" name="group_ids">
          <a-checkbox-group v-model:value="formState.group_ids" :options="plainOptions" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary">保存</a-button>
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
import { register } from "@/api/api.js";
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
      console.log("111111");
      let res = await register(formState);
      message.success(res.data.message);

      resetForm();
    };
    const resetForm = () => {
      formState.title = "";
      formState.author = "";
      formState.image = "";
      formState.summary = "";
    };
    const checkPasswordTrue = (value) => {
      let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      return regPassword.test(value);
    };
    const checkUsername = async (rule, value, callback) => {
      console.log(value);
      console.log(rule);
      if (!value) {
        return Promise.reject("请输入用户名"); //不存在的情况
      } else {
        // callback();
        return Promise.resolve();
      }
    };
    /** 检验密码 */
    const checkPassword = async (rule, value, callback) => {
      const passwords = formState.confirm_password;
      if (!value) {
        return Promise.reject("请输入密码"); //不存在的情况
      } else if (!checkPasswordTrue(value)) {
        return Promise.reject("请输入6~20位的，数字+英文");
      } else if (passwords && value && passwords !== value) {
        // 必须是两个密码都存在的情况下，才会检测密码是否一致。否则不检测
        return Promise.reject("两次密码不一致!"); //密码错误的情况
      } else {
        // callback();
        return Promise.resolve();
      }
    };
    /** 检验重置密码 */
    const checkPasswords = async (rule, value, callback) => {
      console.log(value);
      const pas = formState.password;
      if (!value) {
        return Promise.reject("请再次输入密码"); //不存在的情况
      } else if (!checkPasswordTrue(value)) {
        return Promise.reject("请输入6~20位的，数字+英文");
      } else if (pas && value && pas !== value) {
        return Promise.reject("两次密码不一致!"); //密码错误的情况
      } else {
        // callback();
        return Promise.resolve();
      }
    };
    const rulesRef = {
      username: [{ validator: checkUsername, trigger: "change" }],
      password: [{ validator: checkPassword, trigger: "change" }],
      confirm_password: [{ validator: checkPasswords, trigger: "change" }],
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
      plainOptions,
      rulesRef,
      formState,
    };
  },
};
</script>

<style lang="less" scoped></style>
