<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"> </a-table>
</template>

<script>
import { reactive, onMounted, watch, toRefs } from "vue";
export default {
  props: ["config"],
  setup(props) {
    const table_config = reactive({
      data: null,
      columns: [],
    });
    const initConfig = () => {
      for (let key in props.config) {
        if (Object.keys(table_config).includes(key)) {
          table_config[key] = props.config[key];
        }
      }
    };
    watch(
      () => props.config,
      (val) => {
        initConfig();
      },
      { deep: true }
    );
    return {
      ...toRefs(table_config),
      initConfig,
    };
  },
};
</script>

<style></style>
