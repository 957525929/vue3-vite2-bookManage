<template>
  <div>
    <a-card>
      <div class="Title">
        <div>图书列表</div>
        <a-button>导出</a-button>
      </div>
      <div class="Content">
        <div class="Table">
          <!-- <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="table_config.columns" :data-source="table_config.data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"> </a-table> -->
          <TableData :config="table_config">
            <template #:action="slotData">
              <a-button class="Edit" size="small" @click="edit(slotData)">编辑</a-button>&emsp;
              <a-popconfirm title="此操作将永久删除该图书，是否继续？" ok-text="确定" cancel-text="取消" @confirm="deleteBooks(slotData)">
                <a-button danger size="small">删除</a-button>
              </a-popconfirm>
              <!-- {{ "33333333333" }} -->
            </template>
          </TableData>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import TableData from "@/components/tableData/index.vue";
//api
import { getBookList, deleteBook } from "@/api/api.js";
export default {
  components: {
    TableData,
  },
  setup() {
    let router = useRouter();
    const state = reactive({
      data: null,
      id: "edit",
    });
    const table_config = reactive({
      columns: [
        {
          key: "title",
          title: "书名",
          dataIndex: "title",
        },
        {
          key: "author",
          title: "作者",
          dataIndex: "author",
        },
        {
          key: "action",
          title: "操作",
          dataIndex: "action",
          type: "slot",
          slots: {
            customRender: "action",
          },
        },
      ],
      data: null,
    });
    const getList = async () => {
      let res = await getBookList();
      table_config.data = res.data;
    };
    const edit = (record) => {
      // router.push({ name: "book-detail", query: { id: record.id } });
      console.log(record);
    };
    const deleteBooks = async (record) => {
      let res = await deleteBook(record.id);
      message.success(res.data.message);
      getList();
    };
    onBeforeMount(() => {
      getList();
    });
    const resetForm = () => {
      formState.title = "";
      formState.author = "";
      formState.image = "";
      formState.summary = "";
    };
    return {
      ...toRefs(state),
      table_config,
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
