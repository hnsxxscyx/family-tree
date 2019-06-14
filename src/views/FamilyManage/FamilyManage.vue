<template>
	<div class="manage">
		<FamilyTable @changePeopleInfo="openEditPeopleInfoDialog"></FamilyTable>
		<div class="button-wrapper">
			<el-button type="primary" icon="el-icon-plus" @click="openEditPeopleInfoDialog({})">添加人员</el-button>
		</div>
		<el-dialog title="人员信息" :visible.sync="dialogIsShow">
			<EditPeopleInfo
				v-if="dialogIsShow"
				:existPeopleInfo="activePeopleInfo"
				@closeDialog="closeDialog"
			></EditPeopleInfo>
		</el-dialog>
	</div>
</template>
<script type="text/ecmascript6">
import FamilyTable from "./components/FamilyTable";
import EditPeopleInfo from "./components/EditPeopleInfo";
export default {
	data() {
		return {
			activePeopleInfo: {},
			dialogIsShow: false
		};
	},
	components: {
		FamilyTable,
		EditPeopleInfo
	},
	methods: {
		openEditPeopleInfoDialog(info = {}) {
			this.activePeopleInfo = info;
			this.dialogIsShow = true;
		},
		closeDialog() {
			this.dialogIsShow = false;
		}
	},
	computed: {
		familyInfo() {
			return this.$store.getters.activeFamilyInfo;
		}
	}
};
</script>
<style lang="scss" scoped>
	.button-wrapper {
		display: flex;
		justify-content: flex-end;
		padding: 50px 100px;
	}
</style>