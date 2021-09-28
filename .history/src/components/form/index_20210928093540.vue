<template>
  <a-card :bordered="false">
    <a-form ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item v-for="item in formItem" :key="">
        <!--Input-->
        <a-input v-if="item.type === 'input'" :placeholder="item.placeholder"></a-input>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
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
