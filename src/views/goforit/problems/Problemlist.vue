<template>
	<div>
		<Space direction="vertical" style="width: 100%;">
			<!-- <Page :total="100" :page-size="10" show-elevator show-sizer show-total /> -->
			<Space :wrap="false" style="width: 100%;">
				<span style="font-size: 16px;">搜索题单：</span>
				<Input search enter-button placeholder="输入题单ID / 题单名称" style="width: 300px;" />
				<Button type="primary">
					<Icon type="md-add" style="margin-right: 5px;" />创建题单
				</Button>
				<Poptip trigger="hover" placement="right" width="500" title="活跃度计算方式">
					<span class="active-detail">
						<Icon type="ios-help-circle" />活跃度计算方式
					</span>
					<template #content>
						<div>
							1.举办一次比赛、发起一次训练任务、发起一个讨论：活跃度+10<br>
							2.对于一场比赛：未开始的比赛的活跃度报名人数X1；当比赛开始后活跃度为实际参赛人数X1。<br>
							3.对于一次训练任务：用户参与训练，每完成一道题活跃度+1。<br>
							3.对于一次讨论：用户每一条评论以及回复，活跃度+1。<br>
						</div>

					</template>
				</Poptip>
			</Space>
			<ProblemListItem></ProblemListItem>
			<ProblemListItem></ProblemListItem>
			<ProblemListItem></ProblemListItem>
			<Space direction="vertical" type="flex" align="center">
				<Page :total="100" :page-size="10" show-elevator show-sizer show-total />
			</Space>
		</Space>
		<Modal v-model="modal" title="创建题单" :loading="loading" @on-ok="submitCreateProblemList">
			<Form :model="modalFormInput" label-position="right" :label-width="100">
				<FormItem label="题单名称">
					<Input v-model="modalFormInput.problemName"></Input>
				</FormItem>
				<FormItem label="题目标签">
					<Select v-model="modalFormInput.search" filterable multiple>
						<Option v-for="item in algorithmTags" :value="item" :key="item">{{ item }}
						</Option>
					</Select>
				</FormItem>
				<FormItem label="题单介绍">
					<Input v-model="modalFormInput.instruction" maxlength="50" show-word-limit
						placeholder="输入题单介绍...." />
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script setup name="ProblemList">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import ProblemListItem from '../../../components/goforit/problem/ProblemListItem.vue';

const router = useRouter()

const modal = ref(false)
const loading = ref(true)

const handleModalOpen = () => {
	modal.value = true
}

const submitCreateProblemList = () => {
	setTimeout(() => {
		modal.value = false;
	}, 2000);
}

const modalFormInput = reactive({
	problemName: '',
	search: [],
})

const algorithmTags = ref(['二分查找', '排序', '高精度', '前缀和', '位运算',
	'离散化', '区间合并', '单链表', '双链表', '单调栈', '单调队列', 'KMP'])

const userProblemList = reactive([1, 2, 3, 4])

const pushProblemListById = (problemId) => {
	router.push('/problemlist/' + problemId)
}

</script>

<style>

</style>