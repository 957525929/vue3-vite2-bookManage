<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"> </a-table>
</template>

<script>
export default {
  setup() {
    const table_config = reactive({
      data: null,
      columns: [],
    });
cosnt  initConfig =() =>{

    }
    return {
      table_config,
      initConfig
    };
  },
};
</script>

<style></style>
