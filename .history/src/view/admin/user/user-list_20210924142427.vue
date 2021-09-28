<template>
  <div>
    <a-card>
      <div class="Title">
        <div>用户列表</div>
        <a-select v-model:value="searchData.group_id" label-in-value style="width: 120px" :options="options" @change="handleChange"> </a-select>
      </div>
      <div class="Content">
        <div class="Table">
          <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
            <template #name="{ record }">
              {{ record.groups.length == 2 ? record.groups[0].name + "," + record.groups[1].name : record.groups[0].name }}
            </template>
            <template #action="{ record }">
              <a-button class="Edit" size="small" @click="edit(record)">编辑</a-button>
              &emsp;
              <a-popconfirm title="此操作将永久删除该用户，是否继续？" ok-text="确定" cancel-text="取消" @confirm="deleteBooks(record)" @cancel="cancel">
                <a-button danger size="small">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
//api
import { getUsersList, deleteUser, getUsersGroup } from "@/api/api.js";
export default {
  setup() {
    let router = useRouter();
    const state = reactive({
      data: [],
      id: "edit",
      searchData: {
        group_id: "",
      },
    });
    const plainOptions = [
      {
        label: "guest",
        value: 2,
      },
      {
        label: "string",
        value: 3,
      },
    ];
    const columns = [
      {
        title: "名称",
        dataIndex: "username",
      },
      {
        title: "所属分组",
        dataIndex: "name",
        slots: {
          customRender: "name",
        },
      },
      {
        title: "操作",
        dataIndex: "action",
        slots: {
          customRender: "action",
        },
      },
    ];
    const getList = async () => {
      let res = await getUsersList(state.searchData);
      let data = res.data.items;
      if (!data) {
        return false;
      }
      state.data = data;
    };
    const edit = (record) => {
      // router.push({ name: "book-detail", query: { id: record.id } });
    };
    const deleteBooks = async (record) => {
      let res = await deleteUser(record.id);
      message.success(res.data.message);
      getList();
    };
    onMounted(() => {
      getList();
    });

    return {
      ...toRefs(state),
      columns,
      getList,
      edit,
      deleteBooks,
    };
  },
};
</script>

<style lang="less" scoped>
.Title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  // align-items: center;
}
.Content {
  display: flex;
  justify-content: center;
  .Table {
    width: 95%;
  }
}
.Edit {
  border: 1px solid #3963bc;
  color: #3963bc;
}
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
.ant-table-striped {
  border: 1px solid #f0f0f0;
}
</style>
