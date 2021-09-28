<template>
  <div>
    <div class="Title">
      <div>分组管理信息</div>
      <a-select
        v-model:value="searchData.group_id"
        label-in-value
        style="width: 120px"
        :options="options"
        placeholder="请选择分组"
      >
      </a-select>
    </div>
    <div class="Content">
      <div class="Table">
        <a-table
          class="ant-table-striped"
          :pagination="false"
          size="middle"
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :rowClassName="
            (record, index) => (index % 2 === 1 ? 'table-striped' : null)
          "
        >
          <template #action="{ record }">
            <a-button class="Edit" size="small" @click="showInfo(record)"
              >信息</a-button
            >
            &emsp;
            <a-button size="small" @click="edit(record)">权限</a-button>
            &emsp;
            <a-popconfirm
              title="此操作将永久删除该分组，是否继续？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteGroup(record)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </div>

    <!-- 信息modal -->
    <a-modal
      v-model:visible="visible"
      title="分组信息"
      @ok="handleOk"
      width="1000px"
      okText="确定"
      cancelText="重置"
    >
      <a-form
        name="custom-validation"
        ref="formRef"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item has-feedback label="分组名称" name="info">
          <a-input v-model:value="info.name" />
        </a-form-item>
        <a-form-item has-feedback label="分组描述" name="name">
          <a-input v-model:value="info.info" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
//api
import {
  getUsersGroup,
  deletePermissions,
  updatePermissions,
} from "@/api/api.js";
export default {
  setup() {
    let router = useRouter();
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
      let res = await getUsersGroup();
      let data = res.data;
      if (!data) {
        return false;
      }
      state.data = data;
    };
    const edit = (record) => {
      router.push({ name: "group-edit", query: { id: record.id } });
    };
    const deleteGroup = async (value) => {
      let res = await deletePermissions(value.id);
      message.success(res.data.message);
      getList();
    };
    onMounted(() => {
      getList();
    });

    //显示信息modal
    const info = reactive({
      info: "",
      name: "",
    });
    let infoId = null;
    const formRef = ref(null);
    const visible = ref(false);
    const showInfo = (record) => {
      visible.value = true;
      info.info = record.info;
      info.name = record.name;
      infoId = record.id;
    };
    const handleOk = async () => {
      visible.value = false;
      let res = await updatePermissions(infoId, info);
      if (res.status === 200) {
        message.success(res.data.message);
        getList();
      }
    };

    return {
      ...toRefs(state),
      columns,
      getList,
      options,
      formState,
      plainOptions,
      deleteGroup,
      edit,
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
      visible,
      showInfo,
      handleOk,
      info,
      formRef,
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
.Edit:
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
.ant-table-striped {
  border: 1px solid #f0f0f0;
}
</style>
