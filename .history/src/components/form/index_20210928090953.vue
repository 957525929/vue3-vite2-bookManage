<template>
  <a-card :bordered="false">
    <a-form ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol"> </a-form>
  </a-card>
</template>

<script>
export default {
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
