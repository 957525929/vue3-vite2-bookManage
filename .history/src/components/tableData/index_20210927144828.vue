<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"> </a-table>
</template>

<script>
import { reactive } from "vue";
export default {
  props: ["id"],
  setup() {
    const table_config = reactive({
      data: null,
      columns: [],
    });
    const initConfig = () => {
      for (let key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key];
        }
      }
    };

    return {
      table_config,
      initConfig,
    };
  },
};
</script>

<style></style>
