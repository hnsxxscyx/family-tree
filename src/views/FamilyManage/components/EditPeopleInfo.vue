<template>
  <el-form :model="inputData" label-width="80px" ref="form">
    <el-form-item label="姓名">
      <el-input v-model="inputData.name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="姓别">
      <el-radio v-model="inputData.sex" label="男">男</el-radio>
      <el-radio v-model="inputData.sex" label="女">女</el-radio>
    </el-form-item>
    <el-form-item label="生日">
      <el-date-picker
        value-format="yyyy-MM-dd"
        v-model="inputData.birthday"
        type="date"
        placeholder="请选择生日"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="父亲ID">
      <el-input v-model="inputData.fatherId" placeholder="请输入父亲ID" min="0"></el-input>
    </el-form-item>
    <el-form-item label="母亲ID">
      <el-input v-model="inputData.motherId" placeholder="请输入母亲ID" min="0"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">立即{{isCreate?'创建':'修改'}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script type="text/ecmascript6">
export default {
  created() {
    if (this.isCreate) {
    } else {
      this.inputData = {
        ...this.inputData,
        ...this.existPeopleInfo
      };
    }
  },
  data() {
    return {
      inputData: {
        motherId: undefined,
        fatherId: undefined,
        birthday: "",
        sex: "",
        name: ""
      }
    };
  },
  props: {
    existPeopleInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    isCreate() {
      return Object.keys(this.existPeopleInfo).length === 0;
    }
  },
  methods: {
    submitForm(formName) {
      const mutation = this.isCreate ? "createPeopleInfo" : "updatePeopleInfo";
      let data = { ...this.inputData };
      if (this.existPeopleInfo.name !== undefined && !data.id) {
        data.id = 0;
      }

      const valueList = Object.keys(this.inputData);
      const allowSubmit = valueList.every(val => {
        return val || val === 0;
      });
      if (!allowSubmit) {
        this.$message.error("您必须输入所有参数");
      } else {
        this.$store.commit(mutation, this.inputData);
        this.$emit("closeDialog");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>