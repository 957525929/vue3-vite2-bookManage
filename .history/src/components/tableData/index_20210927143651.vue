<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"> </a-table>
</template>

<script>
export default {
  setup(props, context) {
    const formRef = ref(null);
    const state = reactive({
      data: [],
    });
    const formState = reactive({
      name: "",
      info: "",
      permission_ids: "",
    });

    const checkbox = ref(null);
    const onSubmit = async () => {
      let checkedData = checkbox.value.checkedList;
      let checkedData1 = checkbox.value.checkedList1;
      formState.permission_ids = [...checkedData, ...checkedData1];
      let res = await addPermissions(formState);
      if (res) {
        message.success(res.data.message);
        context.emit("changeList", res);
      }
      resetForm();
    };
    const resetForm = () => {
      formState.name = "";
      formState.info = "";
      checkbox.value.resetForm();
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
      formState,
      ...toRefs(state),
      checkbox,
    };
  },
};
</script>

<style></style>
