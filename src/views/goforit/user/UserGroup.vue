<template>
	<div style="width: 100%;">
		<GroupListItem v-for="item in groupInfo.glist" :status="item.status" :active="item.active" :name="item.name"
			:detail="item.detail" :id="item.id" :number="item.number" :createTime="item.createTime" :pic="item.pic"
			@add-group="addGroup"></GroupListItem>
	</div>
</template>
<script setup name="UserGroup">

import GroupListItem from '../../../components/goforit/group/GroupListItem.vue'
import { ref, reactive } from 'vue'
const detailText = ref('史蒂夫·乔布斯（英语：Steve Jobs），是一名美国企业家、营销家和发明家，苹果公司的联合创始人之一，曾任董事长及首席执行官职位，NeXT创办人及首席执行官，也是皮克斯动画的创办人并曾任首席执行官，2006年为华特迪士尼公司的董事会成员。2017年9月苹果发布会举行的地方，以他命名为 Steve Jobs Theater 。')

const addGroup = (groupId) => {
	console.log(groupId)
}


const groupInfo = reactive({
	glist: [
		{ status: 1, name: '这是团队1', detail: detailText.value, id: '12345678912341', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
		{ status: 0, name: '这是团队2', detail: detailText.value, id: '12345678912342', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
		{ status: -1, name: '这是团队3', detail: 'xixixixi', id: '12345678912343', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
		{ status: 1, name: '这是团队4', detail: detailText.value, id: '12345678912344', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
		{ status: 1, name: '这是团队5', detail: detailText.value, id: '12345678912345', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
		{ status: 1, name: '这是团队6', detail: detailText.value, id: '12345678912346', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
		{ status: 1, name: '这是团队7', detail: detailText.value, id: '12345678912347', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
		{ status: 1, name: '这是团队8', detail: detailText.value, id: '12345678912348', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
		{ status: 1, name: '这是团队9', detail: detailText.value, id: '12345678912349', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
		{ status: 1, name: '这是团队10', detail: detailText.value, id: '12345678912340', number: '9999', active: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
	]
})
</script>

<style scoped lang="less">

</style>