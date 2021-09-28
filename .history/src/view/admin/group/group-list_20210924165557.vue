<template>
  <div>
    <a-tabs type="card" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Tab 1"><groupList/></a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import groupAdd from "./components/group-add.vue";
import groupList from "./components/group-lists.vue";
export default {
  components: {
    groupAdd,
    groupList,
  },
  setup() {
    return {
      activeKey: ref("1"),
    };
  },
};
</script>

<style lang="less" scoped></style>
