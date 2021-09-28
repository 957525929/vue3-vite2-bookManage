<template>
  <div>
    <a-tabs type="card" v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
  </a-tabs>
</template>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
//api
import { getUsersList, deleteUser, updateUsers, updatePassword } from "@/api/api.js";
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>

</style>
