<template>
	<div class="index">
		<div class="family-key-wrapper">
			<h4>{{$store.state.activeKey?`当前您操作的家谱名字为:${$store.state.activeKey}`:'请先选择或新建家谱'}}</h4>
			<span>
				<p>选择已有家谱:</p>
				<el-select v-model="activeFamilyKey" placeholder="请选择" @change="changeAcitveFamily">
					<el-option
						v-for="item in familySelect"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</span>
			<span class="add">
				<p>添加新家谱:</p>
				<el-input v-model="newFamily" placeholder="请输入内容"></el-input>
				<el-button @click="createNewFamily">添加</el-button>
			</span>
		</div>
		<div class="tab">
			<el-button @click="routeTo('/familyManage')" type="text">管理家谱成员</el-button>
			<el-button @click="routeTo('/familyTree')" type="text">查看家谱树</el-button>
			<el-button @click="setPredefinedData" type="text">一键导入预定义数据</el-button>
		</div>
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
			const key = this.newFamily;
			if (key) {
				this.$store.commit("newFamily", key);
			} else {
				this.$message.error("请填写家族名");
			}
		},
		routeTo(url) {
			if (this.$store.state.activeKey) {
				this.$router.push(url);
			} else {
				this.$message.error("请先选择或添加一个家谱");
			}
		},
		setPredefinedData() {
			const data = {
				邮件例子: [
					{
						motherId: "4",
						fatherId: "3",
						birthday: "1990-01-01",
						sex: "男",
						name: "王大锤",
						id: 1
					},
					{
						motherId: "4",
						fatherId: "3",
						birthday: "1990-02-01",
						sex: "女",
						name: "王尼美",
						id: 2
					},
					{ birthday: "1970-02-03", sex: "男", name: "王建国", id: 3 },
					{ birthday: "1970-06-09", sex: "女", name: "李秀英", id: 4 },
					{
						motherId: "2",
						birthday: "2010-04-04",
						sex: "男",
						name: "赵铁柱",
						id: 5
					},
					{
						fatherId: "1",
						birthday: "2010-05-05",
						sex: "男",
						name: "王小明",
						id: 6
					}
				],
				测试家谱1: [
					{ birthday: "2019-06-04", sex: "男", name: "1", id: 1 },
					{ birthday: "2019-06-05", sex: "男", name: "2", id: 2 },
					{
						fatherId: "1",
						birthday: "2019-06-13",
						sex: "男",
						name: "3",
						id: 3
					},
					{
						motherId: "2",
						birthday: "2019-06-05",
						sex: "男",
						name: "4",
						id: 4
					},
					{
						fatherId: "1",
						birthday: "2019-06-26",
						sex: "女",
						name: "5",
						id: 5
					},
					{
						fatherId: "5",
						birthday: "2019-06-11",
						sex: "女",
						name: "6",
						id: 6
					},
					{
						motherId: "6",
						birthday: "2019-06-04",
						sex: "男",
						name: "7",
						id: 7
					},
					{ fatherId: "4", birthday: "2019-06-12", sex: "男", name: "9", id: 8 }
				]
			};
			this.$store.commit("setPredefinedData", data);
			this.$message("数据导入成功，您现在可直接选择家谱");
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
	.index {
		margin: 20vh auto;
		width: 100vw;
		display: flex;
		flex-flow: column;
		align-items: center;
		.family-key-wrapper {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			span {
				margin-bottom: 10px;
			}
			.add {
				.el-input {
					width: 194px;
					margin-right: 10px;
				}
			}
		}
		.tab {
			display: flex;
			text-align: center;
			margin: 20px 0;
		}
	}
</style>