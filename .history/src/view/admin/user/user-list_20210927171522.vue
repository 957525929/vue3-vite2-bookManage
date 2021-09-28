<template>
  <div>
    <a-card>
      <div class="Title">
        <div>用户列表</div>
        <a-select v-model:value="searchData.group_id" label-in-value style="width: 120px" :options="options" @change="handleChange" placeholder="请选择分组"> </a-select>
      </div>
      <div class="Content">
        <div class="Table">
          <!-- <a-table class="ant-table-striped" :pagination="false" size="middle" :columns="columns" :data-source="data" rowKey="id" :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
            <template #name="{ record }">
              <span v-for="item in record.groups" :key="item.id">
                {{ item.name + " " }}
              </span>
            </template>
            <template #action="{ record }">
              <a-button class="Edit" size="small" @click="showModal(record)">编辑</a-button>
              &emsp;
              <a-popconfirm title="此操作将永久删除该用户，是否继续？" ok-text="确定" cancel-text="取消" @confirm="deleteBooks(record)" @cancel="cancel">
                <a-button danger size="small">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table> -->
          <TableData :config="table_config">
            <!-- <template #action="slotData">
              <a-button class="Edit" size="small" @click="edit(slotData.data.record)">编辑</a-button>&emsp;
              <a-popconfirm title="此操作将永久删除该用户，是否继续？" ok-text="确定" cancel-text="取消" @confirm="deleteBooks(slotData.data.record)">
                <a-button danger size="small">删除</a-button>
              </a-popconfirm>
            </template> -->
          </TableData>
        </div>
      </div>
      <a-modal v-model:visible="visible" title="用户信息" @ok="handleOk" width="1000px" okText="确定" cancelText="重置">
        <a-tabs v-model:activeKey="activeKey" @change="handlerChange">
          <a-tab-pane key="1" tab="修改信息">
            <a-form name="custom-validation" ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-item has-feedback label="用户名" name="username">
                <a-input v-model:value="formState.username" disabled />
              </a-form-item>
              <a-form-item has-feedback label="邮箱" name="email">
                <a-input v-model:value="formState.email" disabled />
              </a-form-item>
              <a-form-item has-feedback label="选择分组" name="group_ids">
                <a-checkbox-group v-model:value="formState.group_ids" :options="options" />
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="修改密码" force-render>
            <a-form name="custom-validation" ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-item has-feedback label="密码" name="password">
                <a-input v-model:value="formState.new_password" />
              </a-form-item>
              <a-form-item has-feedback label="确认密码" name="confirm_password">
                <a-input v-model:value="formState.confirm_password" />
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import TableData from "@/components/tableData/index.vue";
//api
import { getUsersList, deleteUser, updateUsers, updatePassword, getUsersGroup } from "@/api/api.js";
export default {
  components: {
    TableData,
  },
  setup() {
    // const plainOptions = [
    //   {
    //     label: "guest",
    //     value: 2,
    //   },
    //   {
    //     label: "string",
    //     value: 3,
    //   },
    // ];
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
      options: [],
      handlerData: [],
    });
    // const options = [
    //   {
    //     label: "guest",
    //     value: 2,
    //   },
    //   {
    //     label: "string",
    //     value: 3,
    //   },
    // ];
    const table_config = reactive({
      columns: [
        {
          key: "username",
          title: "名称",
          dataIndex: "username",
        },
        {
          key: "name",
          title: "所属分组",
          dataIndex: "name",
          slots: {
            customRender: "name",
          },
        },
        {
          key: "action",
          title: "操作",
          dataIndex: "action",
          slots: {
            customRender: "action",
          },
        },
      ],
      data: null,
    });

    const getList = async () => {
      let res1 = await getUsersGroup();
      let data1 = res1.data;
      if (!data1) {
        return false;
      }
      state.options = data1;
      state.options = handlerData(data1);
      console.log(state.options);
      const requestData = {
        count: 10,
        page: 0,
      };
      // 过滤筛选
      const filterData = JSON.parse(JSON.stringify(state.searchData));
      for (let key in filterData) {
        if (filterData[key]) {
          requestData[key] = filterData[key].value;
        }
      }
      let res = await getUsersList(requestData);
      let data = res.data.items;
      if (!data) {
        return false;
      }
      table_config.data = data;
    };
    const deleteBooks = async (record) => {
      let res = await deleteUser(record.id);
      message.success(res.data.message);
      getList();
    };
    const cancel = () => {
      console.log(1);
    };
    const handleChange = () => {
      getList();
    };
    const showModal = (record) => {
      visible.value = true;
      for (let key in record) {
        //接口请求出来
        if (Object.keys(formState).includes(key)) {
          formState[key] = record[key];
        }
      }
      formState.id = record.id;
      formState.group_ids = [];
      for (let i in record.groups) {
        formState.group_ids.push(record.groups[i].id);
      }
      // formState.group_ids =
      //   record.groups.length == 2
      //     ? [record.groups[0].id, record.groups[1].id]
      //     : [record.groups[0].id];
    };

    const handleOk = async () => {
      let res = state.key ? await updateUsers(formState.id, formState) : await updatePassword(formState.id, formState);
      message.success(res.data.message);
      getList();
      visible.value = false;
      resetForm();
    };
    const handlerChange = () => {
      state.key = !state.key;
    };
    const resetForm = () => {
      formState.new_password = "";
      formState.confirm_password = "";
    };
    //处理下拉多选数据
    const handlerData = (params) => {
      return params.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    };
    // const handlerTableData = (params) => {
    //   return params.map((item) => {
    //     if (item.groups) {
    //       return handlerTableData(item.groups);
    //     } else {
    //       return item.name;
    //     }
    //   });
    // };

    onMounted(() => {
      getList();
    });

    return {
      activeKey: ref("1"),
      ...toRefs(state),
     table_config，
      getList,
      deleteBooks,
      handleChange,
      handlerChange,
      visible,
      showModal,
      handleOk,
      formState,
      resetForm,
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
      handlerData,
      cancel,
      // handlerTableData,
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
