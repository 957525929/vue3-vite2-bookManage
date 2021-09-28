<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"> </a-table>
</template>

<script>
export default {
  setup(props, context) {
    const formRef = ref(null);
    const table_config = reactive({
      data: [],
      columns:
    });
    const formState = reactive({
      name: "",
      info: "",
      permission_ids: "",
    });

    return {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
      formRef,
      formState,
      ...toRefs(state),
    };
  },
};
</script>

<style></style>
