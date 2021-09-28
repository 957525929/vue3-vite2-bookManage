<template>
  <div>
    <a-card>新建分组信息</a-card>
    <a-card class="content">
      <a-form name="custom-validation" ref="formRef" :model="formState" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol" v-bind="layout" @finish="onSubmit">
        <a-form-item has-feedback label="分组名称" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item has-feedback label="分组描述" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <!-- <a-form-item has-feedback label="分配权限" name="group_ids">
          <div class="detail" v-for="{item,index} in state.data" :key="index">
            <div class="group">
              <a-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange"> 图书 </a-checkbox>
            </div>
            <div class="group backColor">
              <a-checkbox-group v-model:value="checkedList" :options="plainOptions1" />
            </div>
          </div>
        </a-form-item> -->
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">保存</a-button>
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
import { permissions } from "@/api/api.js";
export default {
  setup() {
    const formRef = ref(null);
    const state = reactive({
      indeterminate: true,
      checkAll: false,
      checkedList: ["Apple", "Orange"],
      data: {},
    });
    const plainOptions = [
      {
        label: "guest",
        value: 2,
      },
      {
        label: "string",
        value: 3,
      },
    ];
    const formState = reactive({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      group_ids: [],
    });
    const onCheckAllChange = (e) => {
      Object.assign(state, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
      });
    };
    const onSubmit = async () => {
      let res = await register(formState);
      if (res) {
        message.success(res.data.message);
      }

      resetForm();
    };
    const resetForm = () => {
      formState.username = "";
      formState.email = "";
      formState.password = "";
      formState.confirm_password = "";
      formState.group_ids = [];
    };
    const checkUsername = async (rule, value, callback) => {
      if (!value) {
        return Promise.reject("请输入用户名"); //不存在的情况
      } else {
        return Promise.resolve();
      }
    };

    const rulesRef = {
      username: [{ validator: checkUsername, trigger: "change" }],
    };
    const getList = async () => {
      let res = await permissions();
      console.log(res.data);
      let data = res.data;
      if (!data) {
        return false;
      }
      state.data = data;
    };
    onMounted(() => {
      getList();
    });
    watch(
      () => state.checkedList,
      (val) => {
        state.indeterminate = !!val.length && val.length < plainOptions.length;
        state.checkAll = val.length === plainOptions.length;
      }
    );
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
      ...toRefs(state),
      onCheckAllChange,
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
