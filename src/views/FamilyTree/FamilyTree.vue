<template>
	<div class="family-tree-wrapper">
		<div class="tree-wrapper">
			<TreeChart :json="demoData" @click-node="clickNode"></TreeChart>
		</div>
		<div class="relation-wrapp">
			<p>成员A:{{(memberA.data&&memberA.data.name)|| '点击选择节点选择成员'}}</p>
			<p>成员B:{{(memberB.data&&memberB.data.name)|| '点击选择节点选择成员'}}</p>
		</div>
		<div class="button-wrapper">
			<el-button type="primary" @click="compareRelation">比较关系</el-button>
			<el-button type="danger" @click="clearMember">清除成员</el-button>
		</div>
	</div>
</template>
<script type="text/ecmascript6">
import TreeChart from "@/components/TreeChart.vue";
import dayjs from "dayjs";
export default {
	components: {
		TreeChart
	},
	created() {
		const list = this.getTreeData();
		this.demoData = {
			name: `${this.activeFalimy}家谱`,
			image_url: "home.png",
			children: list
		};
	},
	data() {
		return {
			demoData: {},
			memberA: {},
			memberB: {}
		};
	},
	methods: {
		clickNode(data, e) {
			if (data.name === `${this.activeFalimy}家谱`) {
				this.$message.error("家谱根节点不是成员不能被选中哦");
			} else {
				if (Object.keys(this.memberA).length === 0) {
					this.memberA = { data, domNode: e.target };
				} else if (Object.keys(this.memberB).length === 0) {
					this.memberB = { data, domNode: e.target };
				}
			}
		},
		clearMember() {
			this.memberA = {};
			this.memberB = {};
		},
		compareRelation() {
			const { memberA, memberB } = this;
			const findNodeRoot = (node, rootTagName = "TABLE") => {
				while (node && node.nodeName !== rootTagName) {
					node = node.parentNode;
				}
				return node;
			};
			const getNodeIndex = (node, root, tagName = "TABLE") => {
				let index = 0;
				while (node !== root) {
					if (node.nodeName === tagName) {
						index++;
					}
					node = node.parentNode;
				}
				return index;
			};
			const compareDate = (dataA, dataB) => {
				const a = dayjs(dataA);
				const b = dayjs(dataB);
				let result = 0;
				if (!a.isSame(b)) {
					result = a.isBefore(b) ? 1 : -1;
				}
				return result;
			};
			const findParentData = id => {
				return this.infoList.find(item => {
					return item.id == id;
				});
			};

			let relation = "";
			if (memberA.data.id === memberB.data.id) {
				relation = "这俩人是一个人呀，别闹";
			} else {
				const nodeA = findNodeRoot(memberA.domNode);
				const nodeB = findNodeRoot(memberB.domNode);
				const isImmediate = nodeA.contains(nodeB) || nodeB.contains(nodeA);
				const treeRootNode = document.querySelector(
					".family-tree-wrapper table"
				);
				const nodeAIndex = getNodeIndex(nodeA, treeRootNode);
				const nodeBIndex = getNodeIndex(nodeB, treeRootNode);
				// 正为A大，负为A小
				const differentIndex = nodeAIndex - nodeBIndex;

				const notImmediateStructure = {};
				const aFatherData = findParentData(memberA.data.fatherId);
				const isFatherRelation = aFatherData ? true : false;

				if (Math.abs(differentIndex) >= 3) {
					relation = "您想查的关系还没来的及做哦，能再多点时间就好啦";
				} else {
					if (isImmediate) {
						switch (differentIndex) {
							case -1: {
								relation = memberB.data.sex === "男" ? `儿子` : "女儿";
								break;
							}
							case -2: {
								if (findParentData(memberB.data.fatherId)) {
									relation = `${memberB.data.sex === "男" ? `孙子` : "孙女"}`;
								} else {
									relation = `${memberB.data.sex === "男" ? "外孙" : "外孙女"}`;
								}
								break;
							}
							case 1: {
								relation = memberB.data.sex === "男" ? `爸爸` : "妈妈";
								break;
							}
							case 2: {
								if (isFatherRelation) {
									relation = `${memberB.data.sex === "男" ? `爷爷` : "奶奶"}`;
								} else {
									relation = `${memberB.data.sex === "男" ? "姥爷" : "姥姥"}`;
								}
								break;
							}
							default:
								break;
						}
					} else if (differentIndex === 0) {
						const aIsOld = compareDate(
							memberA.data.birthday,
							memberB.data.birthday
						);
						if (
							memberA.data.fatherId === memberB.data.fatherId ||
							memberA.data.motherId === memberB.data.motherId
						) {
							switch (aIsOld) {
								case 0: {
									relation = `双胞胎${
										memberB.data.sex === "男" ? "兄弟" : "兄妹"
									}`;
									break;
								}
								case 1: {
									relation = `亲${memberB.data.sex === "男" ? "弟弟" : "妹妹"}`;
									break;
								}
								case -1: {
									relation = `亲${memberB.data.sex === "男" ? "哥哥" : "姐姐"}`;
									break;
								}
								default:
									break;
							}
						} else {
							switch (aIsOld) {
								case 0: {
									relation = `表${memberB.data.sex === "男" ? "兄弟" : "兄妹"}`;
									break;
								}
								case 1: {
									relation = `表${memberB.data.sex === "男" ? "弟" : "妹"}`;
									break;
								}
								case -1: {
									relation = `表${memberB.data.sex === "男" ? "哥" : "姐"}`;
									break;
								}
								default:
									break;
							}
						}
					} else {
						// 小于0都算作侄子
						if (differentIndex < 0) {
							switch (differentIndex) {
								case -1: {
									relation = `侄${memberB.data.sex === "男" ? "子" : "女"}`;
									break;
								}
								case -2: {
									relation = `${
										findParentData(memberB.data.motherId).motherId ==
										memberA.data.id
											? ""
											: "侄"
									}${memberB.data.sex === "男" ? "孙" : "孙女"}`;
									break;
								}
								default:
									break;
							}
						} else {
							switch (differentIndex) {
								case 1: {
									if (isFatherRelation) {
										const manCall = compareDate(
											aFatherData.birthday,
											memberB.data.birthday
										)
											? "叔叔"
											: "大伯";
										const womanCall =
											memberB.data.id == memberA.data.motherId
												? "妈妈"
												: "姑姑";
										relation = `${
											memberB.data.sex === "男" ? manCall : womanCall
										}`;
									} else {
										relation = `${memberB.data.sex === "男" ? "舅舅" : "姨姨"}`;
									}
									break;
								}
								case 2: {
									if (isFatherRelation) {
										relation = `${memberB.data.sex === "男" ? `爷爷` : "姑奶"}`;
									} else {
										relation = `${memberB.data.sex === "男" ? "姥爷" : "姥姥"}`;
									}
									break;
								}
								default:
									break;
							}
						}
					}
				}
			}
			this.$alert(
				`${memberA.data.name}叫${memberB.data.name}:${relation}`,
				"关系判定"
			);
		},
		getTreeData() {
			const rootName = this.$store.state.activeKey;

			let infoList = this.infoList;
			const matchChild = list => {
				// 不知道为什么总能直接改到vuex里的值
				list = JSON.parse(JSON.stringify(list));
				list.forEach((item, index) => {
					if (item.isDelete) {
					} else {
						const fatherIndex = list.findIndex(node => {
							return (
								node.id &&
								(node.id == item.fatherId || node.id == item.motherId)
							);
						});
						if (fatherIndex !== -1) {
							if (Array.isArray(list[fatherIndex].children)) {
								list[fatherIndex].children.push(item);
							} else {
								list[fatherIndex].children = [item];
							}
							list[index].isDelete = true;
						}
					}
				});
				console.log(list);
				return list.filter(item => {
					let result = true;
					if (item.isDelete || (item.fatherId == item.motherId) == false) {
						result = false;
					}
					return result;
				});
			};
			const matchedNodeList = matchChild(infoList);

			return matchedNodeList;
		}
	},
	computed: {
		activeFalimy() {
			return this.$store.state.activeKey;
		},
		infoList() {
			return this.$store.getters.activeFamilyInfo;
		}
	}
};
</script>
<style lang="scss" scoped>
	.family-tree-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>