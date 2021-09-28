<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"> </a-table>
</template>

<script>
import { reactive, onMounted } from "vue";
export default {
  props: ["config"],
  setup(props) {
    const table_config = reactive({
      data: null,
      columns: [],
    });
    const initConfig = () => {
      console.log(props.config);
      console.log("1111");
      for (let key in props.config) {
        if (Object.keys(table_config).includes(key)) {
          table_config[key] = props.config[key];
        }
      }
    };

    return {
      table_config,
      initConfig,
    };
     watch: {
    config: {
      handler(newValue) {
        this.initConfig();
      },
      immediate: true,
    },
  },
  },
};
</script>

<style></style>
