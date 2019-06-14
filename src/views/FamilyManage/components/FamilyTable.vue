<template>
	<div class="table-wrapper">
		<el-table :data="familyInfoList" style="width: 100%">
			<el-table-column
				align="center"
				v-for="(item,index) of tableList"
				:key="index"
				:label="item.label"
			>
				<template slot-scope="scope">
					<span>{{ `${scope.row[item.prop]||scope.row[item.prop]==='0'?`${scope.row[item.prop]}${item.rightText?item.rightText:''}`:'—'}`}}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="changePeopleInfo(scope.row)" type="text" size="small">修改</el-button>
					<el-button @click="deletePeopleInfo(scope.row)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- <el-pagination
			background
			layout="prev, pager, next"
			:total="totalCount"
			v-if="totalCount > pagesize"
			:current-page.sync="p"
		></el-pagination>-->
	</div>
</template>
<script type="text/ecmascript6">
export default {
	data() {
		return {
			p: 1,
			pagesize: 10,
			tableList: [
				{
					label: "ID",
					prop: "id"
				},
				{
					label: "姓名",
					prop: "name"
				},
				{
					label: "姓别",
					prop: "sex"
				},
				{
					label: "生日",
					prop: "birthday"
				},
				{
					label: "父亲ID",
					prop: "fatherId"
				},
				{
					label: "母亲ID",
					prop: "motherId"
				}
			]
		};
	},
	computed: {
		familyInfo() {
			return this.$store.getters.activeFamilyInfo;
		},
		familyInfoList() {
			const endIndex = this.pagesize * this.p;
			const startIndex = endIndex - this.pagesize;
			// 直接加slice不会更新了
			let list = this.familyInfo;
			// 暂时取消分页
			// if (list.length > 5) {
			// 	list = list.slice(startIndex, endIndex);
			// }
			return list;
		}
		// totalCount() {
		// 	return this.$store.getters.activeFamilyInfo.length;
		// }
	},
	methods: {
		deletePeopleInfo(info) {
			this.$store.commit("deletePeopleInfo", info);
		},
		changePeopleInfo(info) {
			console.log(info);
			this.$emit("changePeopleInfo", info);
		}
	}
};
</script>
<style lang="scss" scoped>
</style>