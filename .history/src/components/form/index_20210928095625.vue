<template>
  <a-card :bordered="false">
    <a-form ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item v-for="item in formItem" :key="item.name" :name="item.name" :label="item.label">
        <!--Input-->
        <a-input v-if="item.type === 'input'" :placeholder="item.placeholder"></a-input>
        <a-textarea v-if="item.type === 'textarea'" :placeholder="item.placeholder" :rows="item.rows"></a-textarea>
      </a-form-item>
      <!--按钮-->
      <el-form-item>
        <el-button v-for="item in formHandler" :key="item.key" :type="item.type" @click="item.handler && item.handler()">{{ item.label }}</el-button>
      </el-form-item>
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
