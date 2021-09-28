<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"> </a-table>
</template>

<script>
import { reactive, watch } from "vue";
export default {
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
    watch(
      () => [state.checkedList, state.checkedList1],
      ([val, val1]) => {
        state.indeterminate = !!val.length && val.length < state.checkbox.length;
        state.checkAll = val.length === state.checkbox.length;
        state.indeterminate = !!val1.length && val1.length < state.checkbox1.length;
        state.checkAll1 = val1.length === state.checkbox1.length;
      }
    );
    return {
      table_config,
      initConfig,
    };
  },
};
</script>

<style></style>
