<template>
  <div>
    <a-card>
      <div class="Title">
        <div>用户列表</div>
        <a-button>导出</a-button>
      </div>
      <div class="Content">
        <div class="Table">
          <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
            <template #action="{ record }">
              <a-button class="Edit" size="small" @click="edit(record)">编辑</a-button>
              &emsp;

              <a-popconfirm title="此操作将永久删除该图书，是否继续？" ok-text="确定" cancel-text="取消" @confirm="deleteBooks(record)" @cancel="cancel">
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
import { getUsersList, deleteBook } from "@/api/api.js";
export default {
  setup() {
    let router = useRouter();
    const state = reactive({
      data: "",
      id: "edit",
    });
    const columns = [
      {
        title: "名称",
        dataIndex: "username",
      },
      {
        title: "所属分组",
        dataIndex: "name",
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
      let res = await getUsersList();
      let data = res.data.items;
      console.log(data);
      // for (let item in data) {
      //   console.log(item);
      // }
      data.map((item) => {
        // return item.groups.name;
        console.log("1111");
        console.log(item.groups[0].name);
        state.data.push({
          name: item.groups[0].name,
        });
      });
      console.log(state.data);
      // state.data = res.data.items;
    };
    const edit = (record) => {
      router.push({ name: "book-detail", query: { id: record.id } });
    };
    const deleteBooks = async (record) => {
      let res = await deleteBook(record.id);
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
