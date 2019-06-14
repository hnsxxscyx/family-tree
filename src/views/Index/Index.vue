<template>
  <div class="index">
    <div class="family-key-wrapper">
      <h4>{{$store.state.activeKey?`当前您操作的族谱名字为:${$store.state.activeKey}`:'请先选择或新建族谱'}}</h4>
      <p>
        选择已有族谱:
        <el-select v-model="activeFamilyKey" placeholder="请选择" @change="changeAcitveFamily">
          <el-option
            v-for="item in familySelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>
      <p>
        添加新族谱:
        <el-input v-model="newFamily" placeholder="请输入内容"></el-input>
        <el-button @click="createNewFamily">添加</el-button>
      </p>
    </div>
    <router-link to="/familyManage">管理族谱成员</router-link>|
    <router-link to="/familyTree">查看族谱树</router-link>
  </div>
</template>
<script type="text/ecmascript6">
export default {
  data() {
    return {
      activeFamilyKey: "",
      newFamily: ""
    };
  },
  methods: {
    changeAcitveFamily(e) {
      this.$store.commit("updateActiveKey", e);
    },
    createNewFamily() {
      const key = this.newFamily
      if (key) {
        this.$store.commit('newFamily',key)
      } else {
        this.$message.error("请填写家族名");
      }
    }
  },
  computed: {
    familySelect() {
      return Object.keys(this.$store.state.allFamilyInfo).map(item => {
        return {
          label: item,
          value: item
        };
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>