<template>
  <a-card :bordered="false">
    <a-form ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item v-for="item in formItem" :key="item.name" :name="item.name" :label="item.label">
        <!--Input-->
        <a-input v-if="item.type === 'input'" :placeholder="item.placeholder"></a-input>
        <a-textarea v-if="item.type === 'textarea'" :placeholder="item.placeholder" :rows="item.rows"></a-textarea>
      </a-form-item>
      <!--按钮-->
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button v-for="item in formHandler" :key="item.key" :type="item.type" @click="item.handler && item.handler()" style="margin-right: 10px">{{ item.label }}</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { watch } from "vue";
export default {
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
    //按钮
    formHandler: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const initFormData = () => {};
    watch(
      () => props.formItem,
      (val) => {
        console.log(val);
        initFormData();
      },
      { immediate: true }
    );
    return {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
    };
  },
};
</script>

<style></style>
