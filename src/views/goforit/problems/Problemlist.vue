<template>
	<div>
		<Space direction="vertical" style="width: 100%;">
			<!-- <Page :total="100" :page-size="10" show-elevator show-sizer show-total /> -->
			<Space :wrap="false" style="width: 100%;">
				<span style="font-size: 16px;">搜索题单：</span>
				<Input search enter-button placeholder="输入题单名称" style="width: 300px;" v-model="problemInput" @on-search="searchProblemByInput"/>
				<Button type="primary" @click="handleModalOpen">
					<Icon type="md-add" style="margin-right: 5px;" />创建题单
				</Button>
				<!-- <Checkbox v-model="data.justMyOwn">只看我创建的</Checkbox> -->

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
			<!-- <ProblemListItem></ProblemListItem>
			<ProblemListItem></ProblemListItem>
			<ProblemListItem></ProblemListItem> -->

			<ProblemListItem v-for="item in data.problemList" :name="item.name" :problem-list-id="item.id"
				:creator="item.creator" :activation="item.activation" :avatar="item.avatar"
				:collection-num="item.collectionNum" :instruction="item.instruction" :is-collection="item.isCollection"
				:problem-num="item.problemNum" :update-time="item.lastUpdateTime"
				:tag-list="data.problemListTagMap.get(item.id)"></ProblemListItem>
			<Space direction="vertical" type="flex" align="center">
				<Page :total="data.pageInfo.total" :page-size="data.pageInfo.pageSize" show-elevator show-sizer show-total
					:page-size-opts="[10, 15, 20]" :model-value="data.pageInfo.currPage" @on-change="changePage"
					@on-page-size-change="changePageSize" />
			</Space>
		</Space>
		<Modal v-model="data.showCreatProblemList" title="创建题单" :closable="false" :mask-closable="false">
			<Form :model="data.modalFormInput" label-position="right" :label-width="100" :rules="ruleValidate">
				<FormItem label="题单名称" prop="title">
					<Input v-model="data.modalFormInput.title"></Input>
				</FormItem>
				<FormItem label="题目标签">
					<Select class="sb-select" :placeholder="data.selectorPlaceholder" style="width:140px" not-found-text="">
						<div style="width: 500px; padding: 0px 20px 20px 20px;" class="all-tag">
							<Space style="width:100% ;margin-bottom: 20px;">
								<Input style="width: 100%;" v-model="data.tagSearchKey" search enter-button
									placeholder="搜索标签" @on-search="searchTag" />
								<Button v-if="data.tagSearchList.length != 0"
									@click="handleTagSelectClearSearch">清空</Button>
							</Space>
							<Space style="width: 100%;" v-if="data.tagSearchList.length != 0" direction="vertical">
								<div class="vertical-center item-title"
									style=" borderLeft: 3px solid #2d8cf0 ;background-color: #9dcbfb ;display: flex;align-items: center;">
									搜索结果</div>
								<Space :wrap="true" style="margin-bottom: 16px;">
									<Tag v-for="item in data.tagSearchList" color="blue" style="cursor: pointer;"
										@click="handleSelectTag(item.name, item)">
										{{ item.name }}
									</Tag>
								</Space>
							</Space>
							<Space class="all-tag-item" v-for="item in data.tagList" direction="vertical">
								<div class="vertical-center item-title"
									style=" borderLeft: 3px solid #2d8cf0 ;background-color: #9dcbfb ;display: flex;align-items: center; ">
									{{ item.name }}</div>
								<Space :wrap="true" style="margin-bottom: 16px;">
									<Tag v-for="subitem in item.tags" color="blue"
										@click="handleSelectTag(item.name, subitem)" style="cursor: pointer;">{{
											subitem.name
										}}
									</Tag>
								</Space>
							</Space>
						</div>
					</Select>
				</FormItem>
				<FormItem label="已选标签" v-if="data.modalFormInput.selectedTagList.length !== 0">
					<Space wrap style="width: 100%;">
						<Button shape="circle" @click="clearProblemSearchCondition">
							清除筛选
							<Icon type="md-refresh" />
						</Button>
						<Tag v-for="item in data.modalFormInput.selectedTagList" :key="item.id" :name="item.name"
							type="border" closable color="primary" @on-close="handleTagRemove">{{
								item.name }}</Tag>
					</Space>
				</FormItem>
				<FormItem label="题单介绍">
					<Input v-model="data.modalFormInput.instruction" type="textarea" maxlength="100" :rows="3"
						show-word-limit placeholder="输入题单介绍...." />
				</FormItem>
			</Form>
			<template #footer>
				<div style="width: 100%;height: 40px;">
					<Space style="float: right;">
						<Button @click="createProblemListCancel">取消</Button>
						<Button type="primary" @click="createProblemListOk">确定</Button>
					</Space>
				</div>
			</template>
		</Modal>
	</div>
</template>

<script setup name="ProblemList">
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import ProblemListItem from '../../../components/goforit/problem/ProblemListItem.vue';
import http from '../../../plugin/axios'
import time from '../../../common/utils'
import msg from '../../../common/msg'
import { useStore } from 'vuex';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';

const store = useStore()

const router = useRouter()
const problemInput = ref();

const data = reactive({
	pageInfo: {
		currPage: 1,
		pageSize: 10,
		total: 0
	},
	justMyOwn: false,
	showCreatProblemList: false,
	modalFormInput: {
		title: '',
		search: [],
		selectedTagList: [],
		searchKey: '',
		selectedTagMap: new Map()
	},
	selectorPlaceholder: '点击选择算法标签',
	tagList: [],
	tagSearchKey: '',
	tagSearchList: [],
})

onMounted(() => {
	getTagList()
	getProblemList()

})

const searchProblemByInput = async () => {
	console.log('asdasd');
	const { data: res } = await http.get('/problem/search/by/input',{
		input:problemInput
	})
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}	
	console.log(res);
}


const changePage = (page) => {
	data.pageInfo.currPage = page
	getProblemList()
}

const changePageSize = (psize) => {
	data.pageInfo.pageSize = psize
	getProblemList()
}

const getTagList = async () => {
	const { data: res } = await http.get('/problem/tags')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	data.tagList = res.data.tagList
}


const searchTag = () => {
	if (data.tagSearchKey == '') {
		return
	}
	data.tagList.forEach((i) => {
		i.tags.forEach((item) => {
			if (item.name.includes(data.tagSearchKey)) {
				data.tagSearchList.push({
					id: item.id,
					name: item.name
				})
			}
		})
	})
}

const clearProblemSearchCondition = () => {
	data.modalFormInput = {
		title: '',
		search: [],
		selectedTagList: [],
		searchKey: '',
		selectedTagMap: new Map()
	}
}

const handleTagSelectClearSearch = () => {
	data.tagSearchList = []
}

const handleTagRemove = (_, name) => {
	// 删除array指定元素
	let i = 0, id = 0;
	for (i = 0; i < data.modalFormInput.selectedTagList.length; i++) {
		if (data.modalFormInput.selectedTagList[i].name == name) {
			id = data.modalFormInput.selectedTagList[i].id
			break
		}
	}
	data.modalFormInput.selectedTagList.splice(i, 1)
	data.modalFormInput.selectedTagMap.delete(id)
}

const handleSelectTag = (tagFarther, tag) => {
	if (!data.modalFormInput.selectedTagMap.has(tag.id)) {
		data.modalFormInput.selectedTagMap.set(tag.id, 0)
		data.modalFormInput.selectedTagList.push({
			id: tag.id,
			name: tag.name
		})
	}
}

const createProblemListCancel = () => {
	data.showCreatProblemList = false
	clearProblemSearchCondition()
}

const createProblemListOk = () => {
	data.showCreatProblemList = false
	console.log("simple data:", {
		title: data.modalFormInput.title,
		tags: data.modalFormInput.selectedTagList,
		instruction: data.modalFormInput.instruction,
		creator: 'userId'
	});
	clearProblemSearchCondition()
}

const handleModalOpen = () => {
	data.showCreatProblemList = true
}

const getProblemList = async () => {
	const { data: res } = await http.post('/problemlist/user/collection', {
		userId :BigNumber(store.getters.userInfo.id)
	})
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	data.problemList = []
	data.problemListTagMap = new Map()
	res.data.problemlists.forEach((item) => {
		data.problemList.push({
			name: item.title,
			id: item.id || 0,
			creator: item.creator.toString() || '',
			collectionNum: item.collectionNum || 0,
			activation: item.activation || 0,
			instruction: item.instruction || '',
			isCollection: item.isCollection,
			avatar: item.avatar || '',
			lastUpdateTime: time.formatDate(new Date(item.lastUpdateTime / 1000000)),
			createTime: time.formatDate(new Date(item.createTime)),
			problemNum: item.problemNum || 0,
		})
	})
	res.data.tags.forEach((item) => {
		if (!data.problemListTagMap.has(item.problemlistId)) {
			data.problemListTagMap.set(item.problemlistId, [item])
		} else {
			data.problemListTagMap.get(item.problemlistId).push(item)
		}
	})
	data.pageInfo.total = res.data.total
	getProblemList()

}


const ruleValidate = reactive({
	title: [
		{ required: true, message: '题目名称不能为空', trigger: 'blur' },
		{ type: 'string', max: 100, message: '题单名称不能多于20个字', trigger: 'blur' }

	]
})




const pushProblemListById = (problemId) => {
	router.push('/problemlist/' + problemId)
}


</script>

<style lang="less" scoped>
.sb-select {
	:deep(.ivu-select-dropdown) {
		max-height: 600px !important;
	}
}
</style>