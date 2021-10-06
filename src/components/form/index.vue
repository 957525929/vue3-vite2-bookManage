<template>
  <a-card :bordered="false">
    <a-form
      ref="formRef"
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item
        v-for="item in formItem"
        :key="item.name"
        :name="item.name"
        :label="item.label"
        :rules="item.rules"
      >
        <!--Input-->
        <a-input
          v-if="item.type === 'input'"
          :placeholder="`${type_msg[item.type]}${item.label}`"
          v-model:value="formData[item.name]"
        ></a-input>
        <a-textarea
          v-if="item.type === 'textarea'"
          :placeholder="`${type_msg[item.type]}${item.label}`"
          :rows="item.rows"
          v-model:value="formData[item.name]"
        ></a-textarea>
        <a-checkbox-group
          v-if="item.type === 'checkbox'"
          v-model:value="formData[item.name]"
          :options="item.options"
        >
        </a-checkbox-group>
        <!-- {{ item }} -->
        <!-- {{item.options}} -->
      </a-form-item>

      <!--按钮-->
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          v-for="item in formHandler"
          :key="item.key"
          :type="item.type"
          @click="item.handler && item.handler()"
          style="margin-right: 10px"
          >{{ item.label }}</a-button
        >
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from "vue";
export default {
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
    //按钮
    formHandler: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => [],
    },
  },
  setup(props) {
    // const formRef = ref(null);
    const state = reactive({
      //是否存在必填规则
      type_msg: {
        input: "请填写",
        select: "请选择",
        textarea: "请填写",
      },
    });
    const initFormData = () => {
      props.formItem.forEach((item) => {
        //rules规则
        if (item.required) {
          rules(item);
        }
        //自定义规则
        if (item.validator) {
          item.rules = item.validator;
        }
      });
    };
    const rules = (item) => {
      // console.log(item);
      const requestRules = [
        {
          required: true,
          message: `${state.type_msg[item.type]}${item.label}`,
          trigger: "change",
        },
      ];
      //其他的rules的规则
      if (item.rules && item.rules.length > 0) {
        item.rules = requestRules.concat(item.rules);
      } else {
        item.rules = requestRules;
      }
      console.log(item.rules);
    };
    onMounted(() => {
      // console.log(formData);
    });
    watch(
      () => props.formItem,
      (val) => {
        // console.log("1111222");
        // console.log(val);
        initFormData();
      },
      { immediate: true }
    );
    return {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 14,
      },
      ...toRefs(state),
    };
  },
};
</script>

<style></style>
