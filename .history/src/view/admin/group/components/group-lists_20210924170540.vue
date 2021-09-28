<template>
  <div>
    <div class="Title">
      <div>分组管理</div>
      <a-select v-model:value="searchData.group_id" label-in-value style="width: 120px" :options="options" @change="handleChange" placeholder="请选择分组"> </a-select>
    </div>
    <div class="Content">
      <div class="Table">
        <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
          <template #action="{ record }">
            <a-button class="Edit" size="small">编辑</a-button>
            &emsp;
            <a-popconfirm title="此操作将永久删除该用户，是否继续？" ok-text="确定" cancel-text="取消" @cancel="cancel">
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";
import { message } from "ant-design-vue";
//api
import { getUsersGroup, deleteUser, updateUsers, updatePassword } from "@/api/api.js";
export default {
  setup() {
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
    const formState = reactive({
      username: "",
      email: "",
      new_password: "",
      confirm_password: "",
      group_ids: [],
    });
    const visible = ref(false);
    const state = reactive({
      data: [],
      key: true,
      searchData: {},
    });
    const options = [
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
        dataIndex: "name",
      },
      {
        title: "所属分组",
        dataIndex: "info",
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
      const requestData = {
        count: 10,
        page: 0,
      };
      let res = await getUsersGroup(requestData);
      let data = res.data.items;
      if (!data) {
        return false;
      }
      state.data = data;
      console.log(state.data);
    };

    const resetForm = () => {
      // formState.username = "";
      // formState.email = "";
      formState.new_password = "";
      formState.confirm_password = "";
      // formState.group_ids = [];
    };
    onMounted(() => {
      console.log("1111");
      getList();
    });

    return {
      activeKey: ref("1"),
      ...toRefs(state),
      columns,
      getList,
      deleteBooks,
      options,
      handleChange,
      handlerChange,
      visible,
      showModal,
      handleOk,
      formState,
      plainOptions,
      resetForm,
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
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
