<template>
  <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
    <template #action="{ record }">
      <a-button class="Edit" size="small" @click="showInfo(record)">信息</a-button>
      &emsp;
      <a-button size="small" @click="edit(record)">权限</a-button>
      &emsp;
      <a-popconfirm title="此操作将永久删除该分组，是否继续？" ok-text="确定" cancel-text="取消" @confirm="deleteGroup(record)">
        <a-button danger size="small">删除</a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script>
export default {};
</script>

<style></style>
