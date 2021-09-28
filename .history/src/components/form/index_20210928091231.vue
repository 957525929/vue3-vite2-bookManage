<template>
  <a-card :bordered="false">
    <a-form ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol">
      <!--Input-->
      <a-input v-if="item.type === 'Input'" v-model="form[item.prop]" :placeholder="item.placeholder" :style="{ width: item.width }" :disabled="item.disabled"></a-input>
    </a-form>
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
