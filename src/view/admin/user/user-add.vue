<template>
  <div>
    <a-card>添加用户</a-card>
    <CommonForm
      :formItem="formItem.form_item"
      :formHandler="formItem.form_handler"
      :formData="formItem.formState"
      ref="commonForm"
    />
    <!-- <a-card>
      <a-form
        name="custom-validation"
        ref="formRef"
        :model="formState"
        :rules="rulesRef"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        @finish="onSubmit"
      >
        <a-form-item has-feedback label="用户名" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item has-feedback label="邮箱" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item has-feedback label="密码" name="password">
          <a-input v-model:value="formState.password" />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="confirm_password">
          <a-input v-model:value="formState.confirm_password" />
        </a-form-item>
        <a-form-item has-feedback label="选择分组" name="group_ids">
          <a-checkbox-group
            v-model:value="formState.group_ids"
            :options="options"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">保存</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </a-card> -->
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, nextTick } from "vue";
import { message } from "ant-design-vue";
import CommonForm from "@/components/form/index.vue";
//api
import { register, getUsersGroup } from "@/api/api.js";
export default {
  components: { CommonForm },
  setup() {
    const commonForm = ref(null);
    const checkPasswordTrue = (value) => {
      let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      return regPassword.test(value);
    };
    /** 检验密码 */
    const checkPassword = async (rule, value, callback) => {
      const passwords = formItem.formState.confirm_password;
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
      const pas = formItem.formState.password;
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
    const formItem = reactive({
      form_item: [
        {
          type: "input",
          label: "用户名",
          name: "username",
          required: true,
        },
        {
          type: "input",
          label: "邮箱",
          name: "email",
        },
        {
          type: "input",
          label: "密码",
          name: "password",
          required: true,
          validator: [{ validator: checkPassword, trigger: "change" }],
        },
        {
          type: "input",
          label: "确认密码",
          name: "confirm_password",
          required: true,
          validator: [{ validator: checkPasswords, trigger: "change" }],
        },
        {
          type: "checkbox",
          label: "选择分组",
          name: "group_ids",
          options: [],
        },
      ],
      form_handler: [
        {
          label: "确定",
          key: "submit",
          type: "primary",
          handler: () => onSubmit(),
        },
        { label: "重置", key: "reset", handler: () => resetForm() },
      ],
      formState: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        group_ids: [],
      },
    });
    const state = reactive({
      options: [],
    });
    const onSubmit = async () => {
      // console.log();
      const validate = await commonForm.value.$refs.formRef.validate();
      console.log(validate);
      if (validate) {
        let res = await register(formItem.formState);
        if (res) {
          message.success(res.data.message);
        }
      }

      // await commonForm.value.$refs.formRef
      //   .validate()
      //   .then(() => {
      //     // let res = await register(formState);
      //     // if (res) {
      //     //   message.success(res.data.message);
      //     // }
      //     console.log("121221");
      //   })
      //   .catch((error) => {
      //     console.log("error", error);
      //   });
      // console.log(commonForm.value.formRef);
      // resetForm();
    };
    const resetForm = () => {
      for (let key in formItem.formState) {
        formItem.formState[key] = "";
      }
    };

    const getList = async () => {
      let res = await getUsersGroup();
      let data = res.data;
      // if (!data) {
      //   return false;
      // }
      // state.options = data;
      // state.options = handlerData(data);
      if (data) {
        let groupId = formItem.form_item.filter(
          (item) => item.name == "group_ids"
        );
        groupId[0].options = handlerData(data);
      }
    };
    //处理下拉多选数据
    const handlerData = (params) => {
      return params.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    };
    onMounted(() => {
      getList();
    });
    return {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
      resetForm,
      onSubmit,
      handlerData,
      getList,
      ...toRefs(state),
      formItem,
      commonForm,
    };
  },
};
</script>

<style lang="less" scoped></style>
