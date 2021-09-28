<template>
  <div>
    <a-tabs type="card" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import groupAdd from "./components/"
export default {
  setup() {
    return {
      activeKey: ref("1"),
    };
  },
};
</script>

<style lang="less" scoped></style>
