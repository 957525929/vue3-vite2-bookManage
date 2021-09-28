<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
    <template v-for="item in this.table_config.columns" :key="item.key">
      <el-table-column :title="item.title" >
        <template slot-scope="scope" >
          <span v-html="item.callback && item.callback(scope.row, item.prop)"></span>
        </template>
      </el-table-column>
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
