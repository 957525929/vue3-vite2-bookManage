<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"> </a-table>
</template>

<script>
export default {
  setup(props, context) {
    const table_config = reactive({
      data: null,
      columns: [],
    });
cosnt  initConfig=() =>{
      for (let key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key];
        }
      }
      //配置完成后开始读取接口数据
      this.loadData();
    },
    return {
      table_config,
    };
  },
};
</script>

<style></style>
