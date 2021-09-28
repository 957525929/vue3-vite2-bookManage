<template>
  <div>
    <a-card>
      <a-tabs type="card" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="分组列表"
          ><groupList ref="groupList1"
        /></a-tab-pane>
        <a-tab-pane key="2" tab="添加分组"
          ><groupAdd @changeList="getData"
        /></a-tab-pane>
      </a-tabs>
    </a-card>
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
    const groupList1 = ref(null);
    const getData = (value) => {
      if (value) {
        groupList1.value.getList();
        
      }
    };
    return {
      activeKey: ref("1"),
      getData,
      groupList1,
    };
  },
};
</script>

<style lang="less" scoped></style>
