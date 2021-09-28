<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
    <template v-for="item in columns" :key="item.key">
      <a-table-column v-if="item.type === 'slot'" :title="item.title" :dataIndex="item.dataIndex">
        <template>
          <slot name="action"></slot>
        </template>
      </a-table-column>
      <a-table-column :title="item.title" :dataIndex="item.dataIndex"> </a-table-column>
    </template>
  </a-table>
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
      console.log(props.config);
      console.log("1111");
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
