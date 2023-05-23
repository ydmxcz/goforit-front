<template>
    <Card style="border-radius: 10px;margin-top: 20px;margin-bottom: 20px;">
        <Space type="flex" direction="vertical">

            <Space style="width: 100%;" :wrap="false">
                <Input style="width: 400px;" search enter-button placeholder="请输入比赛名称 / 比赛ID进行搜索" />
                <Button type="primary" icon="md-add" @click="showCreateContestInfo = true">创建比赛</Button>
                <!-- <div v-if="cascaderList.length == 0" style="width: 100%;height: 120px;">
                    <Spin fix></Spin>
                </div>
                <Space v-else direction="vertical">
                    <CascaderTagSelect title-lv1="方向" title-lv2="分类" :data-list="cascaderList"
                        @on-lv2-change="handleLv2Change" @on-lv1-change="handleLv1Change">
                    </CascaderTagSelect>
                    <TagSelectSignle title="状态" :data-list="contestStatusTagList" @on-change="handleTagClick">
                    </TagSelectSignle>
                </Space> -->
            </Space>
            <ContestList v-for="item in contestList" :contest-id="item.id" :name="item.title" :is-original="true"
                :is-rated="item.ratingTop != -1" :sign-up-start="item.signUpStartTime" :sign-up-end="item.signUpEndTime"
                :contest-start="item.startTime" :contest-end="item.endTime"
                :length-time="(item.endTime - item.startTime) / 3600000" :sponsor="item.sponsorName"
                :number="item.signUpNum || 0" :max-rating="item.ratingTop" @on-sign-up="toContestDetialPage"
                @to-detial-page="toContestDetialPage" />

            <Space v-if="contestList.length != 0" direction="vertical" type="flex" align="center">
                <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" show-elevator show-sizer show-total
                    :page-size-opts="[10, 15, 20]" :model-value="pageInfo.currPage" @on-change="changePage"
                    @on-page-size-change="changePageSize" />
            </Space>
            <div v-if="contestList.length == 0" style="width: 100%;height:300px">
                <Space style="display: flex;align-items: center;justify-content: center;" direction="vertical"
                    align="center">
                    <img style="height: 200px;width: 200px;" src="https://file.iviewui.com/iview-pro/icon-500-color.svg"
                        alt="">
                    <span style="font-size: 20px;">此小组还未创建过比赛</span>
                </Space>
            </div>
        </Space>
    </Card>
    <Modal v-model="showCreateContestInfo" title="创建新比赛" scrollable width="800px" :mask-closable="false" :closable="false"
		style="top: 30px;">

		<Form :model="formItem" :label-width="120">
			<FormItem label="比赛标题">
				<Input v-model="formItem.title"></Input>
			</FormItem>
			<FormItem label="比赛类型">
				<Row>
					<Col span="6">
					<Select v-model="formItem.contestSelectValue" @on-change="handleSelectContestType">
						<Option v-for="item in contestTagList" :value="item.name" :key="item.id">{{ item.name }}</Option>
					</Select>
					</Col>
					<Col span="4" style="text-align: center">比赛分类</Col>
					<Col span="10">
					<Select v-model="formItem.contestSelectSubValue" @on-change="handleSelectContestTag">
						<Option v-for="item in formItem.subTagList" :value="item.name" :key="item.id">{{ item.name }}
						</Option>
					</Select>
					</Col>
				</Row>

			</FormItem>
			<FormItem label="举办方ID">
                <span>{{ formItem.sponsorId }}</span>
				<!-- <Input v-model="formItem.sponsorId"></Input> -->
			</FormItem>
			<FormItem label="是否公开">
				<Row>
					<Col span="4">
					<Switch size="large" v-model="formItem.public">
						<template #open>
							<span>公开</span>
						</template>
						<template #close>
							<span>私有</span>
						</template>
					</Switch>
					</Col>
					<Col span="4" style="text-align: center">比赛密码</Col>
					<Col span="15">
					<Input v-model="formItem.pwd" :disabled="formItem.public" password type="password"></Input>
					</Col>
				</Row>
			</FormItem>
			<FormItem label="报名起止时间">
				<DatePicker type="datetimerange" confirm v-model="formItem.signUpTime" placeholder="选择比赛报名的起止时间"
					style="width: 100%" @on-ok="handleSignUpTimeSelectOK" />
			</FormItem>
			<FormItem label="比赛起止时间">
				<DatePicker type="datetimerange" confirm v-model="formItem.contestTime" placeholder="选择比赛的起止时间"
					style="width: 100%" @on-ok="handleContestTimeSelectOK" />
			</FormItem>
			<FormItem label="是否开启封榜">
				<Row>
					<Col span="4">
					<Switch size="large" v-model="formItem.sealRank">
						<template #open>
							<span>开启</span>
						</template>
						<template #close>
							<span>关闭</span>
						</template>
					</Switch>
					</Col>
					<Col span="5" style="text-align: center" v-if="formItem.sealRank">在比赛结束前</Col>
					<Col span="11" v-if="formItem.sealRank">
					<InputNumber :max="30" :min="1" :step="1" v-model="formItem.sealRankTime" /> 分钟封榜
					</Col>
				</Row>
			</FormItem>
			<FormItem label="比赛结束后是否开放榜单">
				<Switch size="large" v-model="formItem.openRank">
					<template #open>
						<span>开放</span>
					</template>
					<template #close>
						<span>封闭</span>
					</template>
				</Switch>
			</FormItem>
			<FormItem label="比赛结果是否计入Rating">
				<Row>
					<Col span="4">
					<Switch size="large" v-model="formItem.isRating">
						<template #open>
							<span>计入</span>
						</template>
						<template #close>
							<span>不计</span>
						</template>
					</Switch>
					</Col>
					<Col span="4" style="text-align: center">
					</Col>
					<Col span="15">
					<span v-if="formItem.isRating">
						不计Rating范围：Rating >
						<InputNumber :step="1" v-model="formItem.ratingTop" />
					</span>
					</Col>
				</Row>
			</FormItem>
			<FormItem label="比赛介绍">
				<v-md-editor class="md-editor" v-model="formItem.description" height="300px" mode="edit"
					placeholder="输入题目信息，点击编辑器右上角可以全屏显示编辑器"
					left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code "></v-md-editor>
				<!-- <Input v-model="formItem.description" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
					placeholder="输入比赛介绍..." maxlength="150" show-word-limit></Input> -->
			</FormItem>
		</Form>
		<div>
			<Row :wrap="false" style="width: 100%;height: 50px;margin-bottom: 10px;">
				<Col class="elem-center" flex="100px" style="padding: 0px 20px;">
				<span>题号</span>
				</Col>
				<Col flex="auto" style="display: flex;align-items: center;justify-content: center;">
				<span>题目</span>
				</Col>
			</Row>
			<Row :wrap="false">
				<Col flex="100px" style="padding: 0px 20px;">
				<div v-for="i in dragData.dataList.length" class="dragdata-list-item elem-center">{{
					String.fromCodePoint(64 + i) }}</div>
				</Col>
				<Col flex="auto">
				<div @dragover="dragover($event)" style="width: 100%;">
					<transition-group>
						<div v-for="(item, idx) in dragData.dataList" :key='item.id' :draggable="true"
							class="sort-move dragdata-list-item" @dragstart="dragstart(item)"
							@dragenter="dragenter(item, $event)" @dragend="dragend(item, $event)"
							@dragover="dragover($event)" style="background-color: #eee;">
							<span style="height: 50px;display: flex;align-items: center;float: left;">
								{{ item.label }}
							</span>
							<div style="font-size: 20px;height: 50px;display: flex;align-items: center; float: right;"
								@click="removeProblem(idx)">
								<Icon type="md-trash" />
							</div>
						</div>
					</transition-group>
				</div>
				</Col>
			</Row>
			<!-- <Button type="primary" @click="printList">打印列表信息</Button> -->
			<!-- <Button >添加题目</Button> -->
			<Button type="primary" @click="showSearchAndAddProblemModal = true">搜索并添加题目</Button>
			<Modal v-model="showSearchAndAddProblemModal" scrollable width="600px" :mask-closable="false" :closable="false"
				style="top: 30px;">
				<Input search enter-button placeholder="输入题目ID进行搜索" v-model="problemData.input"
					@on-search="handleGetProblemContent" />
				<v-md-preview :text="problemData.content"></v-md-preview>
				<template #footer>
					<div style="width: 100%;height: 40px;">
						<Space style="float: right;">
							<Button @click="searchAndAddProblemModalCancel">取消</Button>
							<Button type="primary" @click="addProblem">添加题目</Button>
						</Space>
					</div>
				</template>
			</Modal>
		</div>
		<template #footer>
			<div style="width: 100%;height: 40px;">
				<Space style="float: right;">
					<Button @click="createContestCancel">取消</Button>
					<Button type="primary" @click="createContestOK">确定</Button>
				</Space>
			</div>
		</template>
	</Modal>
</template>

<script setup name="AllContest">
import { ref, reactive, onMounted } from 'vue'
import ContestList from '../../../components/goforit/contest/ContestList.vue'
import TagSelectSignle from '../../../components/common/TagSelectSignle.vue';
import CascaderTagSelect from '../../../components/common/CascaderTagSelect.vue';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import { useRouter } from 'vue-router'
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import { useStore } from 'vuex';
const store = useStore()
const router = useRouter()
const cascaderList = ref([])
const contestList = ref([])
const pageInfo = reactive({
    currPage: 1,
    pageSize: 15,
    total: 0
})
const queryContestStatus = ref(0)
const queryContestTagId = ref(0);

const contestStatusTagList = ref([
    { label: '全部', value: 0 },
    { label: '未开始', value: 1 },
    { label: '已结束', value: 2 },
    { label: '正在进行', value: 3 }
]);



const toContestDetialPage = (id) => {
    // loginDialogShow.value = true
    router.push("/contest/detail/" + id)
}


// const getContestTags = async () => {
//     const { data: res } = await http.get('/contest/tags')
//     if (res.code != 200) {
//         msg.err(res.msg)
//         return
//     }
//     cascaderList.value = [{
//         id: 0, name: '全部', tags: [{ id: 0, name: '全部' }]
//     }]
//     res.data.tagList.forEach((item) => {
//         item.tags.forEach((subItem) => {
//             cascaderList.value[0].tags.push(subItem)
//         })
//         cascaderList.value.push(item)
//     })
// }

const handleSelectContestType = (name) => {
	formItem.value.contestSelectValue = name
	contestTagList.value.forEach(item => {
		if (item.name == name) {
			formItem.value.subTagList = item.tags
			formItem.value.contestType = item.id
		}
	})
}

const handleSelectContestTag = (name) => {
	formItem.value.subTagList.forEach((item) => {
		// console.log(item.name,name);
		if (item.name == name) {
			formItem.value.contestTagId = item.id
			formItem.value.contestTagName = item.name
		}
	})
}

const showSearchAndAddProblemModal = ref(false)

const changePage = (page) => {
    pageInfo.currPage = page
    getContestList()
}

const changePageSize = (psize) => {
    pageInfo.pageSize = psize
    getContestList()
}

const handleTagClick = (t) => {
    queryContestStatus.value = t
    getContestList()
}

const handleLv2Change = (t) => {
    getContestList()
}

const handleSignUpTimeSelectOK = () => {
	let s = Date.parse(formItem.value.signUpTime[0])
	let e = Date.parse(formItem.value.signUpTime[1])
	if (s == e) {

	} else {
		formItem.value.signUpStartTime = s
		formItem.value.signUpEndTime = e
	}
}

const handleContestTimeSelectOK = () => {
	formItem.value.startTime = Date.parse(formItem.value.contestTime[0])
	formItem.value.endTime = Date.parse(formItem.value.contestTime[1])
	if (formItem.value.startTime < formItem.value.signUpEndTime) {
		msg.err("比赛开始时间要晚于报名截止时间")
		formItem.value.startTime = 0
		formItem.value.endTime = 0
		formItem.value.contestTime = []
		return
	}
}


const getContestList = async () => {
    // let d = {
    //     currPage: pageInfo.currPage,
    //     pageSize: pageInfo.pageSize,
    //     tagId: queryContestTagId.value,
    //     status: queryContestStatus.value
    // }
    const { data: res } = await http.post('/contest/select/by/id', {
        creator: BigNumber(router.currentRoute.value.params.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    try {
        contestList.value = res.data.infos
        pageInfo.total = res.data.total
    } catch (e) {
        contestList.value = []
        pageInfo.total = 0
    }
}

const formItem = ref({
	id: '',
	sponsorId: router.currentRoute.value.params.id,
	title: '',
	contestType: 1,
	contestTagId: 0,
	contestTagName: '',
	description: '',
	problemNum: '',
	source: '',
	public: true,
	pwd: '',
	startTime: 0,
	endTime: 0,
	signUpStartTime: 0,
	signUpEndTime: 0,
	sealRank: false,
	sealRankTime: 20,
	openRank: true,
	ratingTop: 2199,
	createTime: '',
	lastUpdateTime: '',
	isRating: true,
	mender: '',
	signUpTime: [],
	contestTime: [],
	contestSelectValue: '',
	contestSelectSubValue: '',
	subTagList: []

})
const contestTagList = ref([])
const clearFormItem = () => {
	formItem.value = {
		id: '',
		sponsorId: BigNumber(router.currentRoute.value.params.id),
		title: '',
		contestType: 1,
		contestTagId: 0,
		contestTagName: '',
		description: '',
		problemNum: '',
		source: '',
		public: true,
		pwd: '',
		startTime: 0,
		endTime: 0,
		signUpStartTime: 0,
		signUpEndTime: 0,
		sealRank: false,
		sealRankTime: 20,
		openRank: true,
		isRating: true,
		ratingTop: 2199,
		createTime: '',
		lastUpdateTime: '',
		mender: '',
		signUpTime: [],
		contestTime: [],
		contestSelectValue: '',
		contestSelectSubValue: '',
		subTagList: []
	}
}



const getAndCheckFormItem = () => {
	let contestInfo = {
		sponsorId: 0,
		title: formItem.value.title || '',
		description: formItem.value.description || '',
		public: formItem.value.public || true,
		isRating: formItem.value.isRating || true,
		pwd: formItem.value.pwd || '',
		startTime: Number(formItem.value.startTime) || 0,
		endTime: Number(formItem.value.endTime) || 0,
		signUpStartTime: Number(formItem.value.signUpStartTime) || 0,
		signUpEndTime: Number(formItem.value.signUpEndTime) || 0,
		sealRank: formItem.value.sealRank,
		sealRankTime: Number(formItem.value.sealRankTime) || 20,
		openRank: formItem.value.openRank || true,
		ratingTop: Number(formItem.value.ratingTop) || 2199,
		contestType: Number(formItem.value.contestType) || 1,
		contestTagId: Number(formItem.value.contestTagId) || 0,
		contestTagName: formItem.value.contestTagName || '',
		creator: BigNumber(store.getters.userInfo.id) || 0,
	}
	if (contestInfo.title == '') {
		msg.err("请输入比赛标题")
		return
	}
	try {
		contestInfo.sponsorId = BigNumber(router.currentRoute.value.params.id)
	} catch (e) {
		msg.err("举办方ID输入错误")
		return
	}
	if (contestInfo.sponsorId == 0) {
		msg.err("检查举办方ID")
		return
	}
	let now = new Date().getTime()
	if (contestInfo.signUpStartTime <= now || contestInfo.signUpEndTime <= now) {
		msg.err("报名时间不能早于现在")
		return
	}
	if (contestInfo.startTime <= now || contestInfo.endTime <= now) {
		msg.err("比赛时间不能早于现在")
		return
	}
	if (contestInfo.startTime < contestInfo.signUpEndTime) {
		msg.err("比赛开始时间要晚于报名截止时间")
		return
	}
	if (contestInfo.sealRankTime > 30 || contestInfo.sealRankTime < 0) {
		msg.err("封榜时间应大于0分钟且小于30分钟")
		return
	} else {
		// 转换成秒
		contestInfo.sealRankTime *= 60
	}
	if (!contestInfo.public) {
		contestInfo.pwd = ''
	}
	if (dragData.dataList.length == 0) {
		msg.err('请添加至少一道题目！')
		return
	}
	let problemIds = []
	dragData.dataList.forEach((item) => {
		problemIds.push(item.id)
	})
	return {
		info: contestInfo,
		problemIds: problemIds
	}
}


const createContestOK = async () => {
	let createData = getAndCheckFormItem()
	if (!createData) {
		return
	}
	console.log(createData);
	const { data } = await http.post('/contest/create', createData)
	// console.log(data);
	if (data.code != 200) {
		msg.err(data.msg);
		return
	}
	msg.ok('添加成功');
	getcontestList()
	showCreateContestInfo.value = false
	clearFormItem()
}
const createContestCancel = () => {
	showCreateContestInfo.value = false
	clearFormItem()
}

const editContestCancel = () => {
	showEditContestInfo.value = false
	clearFormItem()
}

const closeContestDetial = () => {
	showContestDetialInfo.value = false
	clearFormItem()
}


const getContestTags = async () => {
	const { data: res } = await http.get('/contest/tags')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	contestTagList.value = res.data.tagList
}

const handleDeleteContest = async (row) => {
	// return
	const { data } = await http.post('/contest/delete', {
		mender: BigNumber(userInfo.value.id),
		contestId: row.id
	})
	console.log(data);
	if (data.code != 200) {
		msg.err(data.msg);
	}
	msg.ok('删除成功');
	getcontestList()
}


const getcontestList = async () => {
	const { data } = await http.post('/contest/all', {
		currPage: pageInfo.currPage,
		pageSize: pageInfo.pageSize
	})
	if (data.code != 200) {
		msg.err({ background: true, content: data.msg });
		return
	}
	// console.log(data);
	contestList.value = data.data.infos
	pageInfo.total = data.data.total
}

// const getContestTags = async () => {
// 	const { data: res } = await http.get('/contest/tags')
// 	if (res.code != 200) {
// 		msg.err(res.msg)
// 		return
// 	}
// 	contestTagList.value = res.data.tagList
// }

// const getContestNameById = (id) => {
// 	// console.log("aaa",contestTagList.value.length);
// 	for (let i = 0; i < contestTagList.value.length; i++) {
// 		let e = contestTagList.value[i];
// 		// console.log(e);
// 		for (let j = 0; j < e.tags.length; j++) {
// 			if (e.tags[j].id == id) {
// 				return e.tags[j].name
// 			}
// 			// console.log(e.tags[j]);
// 		}
// 	}
// 	return ''
// }



const dragData = reactive({
	oldData: null, // 开始排序时按住的旧数据
	newData: null, // 拖拽过程的数据
	// 列表数据
	dataList: [],
	idSet: new Set()
})


const dragstart = (value) => {
	dragData.oldData = value
}

// 记录移动过程中信息
const dragenter = (value, e) => {
	dragData.newData = value
	e.preventDefault()
}

// 拖拽最终操作
const dragend = (value, e) => {
	if (dragData.oldData !== dragData.newData) {
		let oldIndex = dragData.dataList.indexOf(dragData.oldData)
		let newIndex = dragData.dataList.indexOf(dragData.newData)
		let newItems = [...dragData.dataList]
		// 删除老的节点
		newItems.splice(oldIndex, 1)
		// 在列表中目标位置增加新的节点
		newItems.splice(newIndex, 0, dragData.oldData)
		dragData.dataList = [...newItems]
	}
}

// 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
const dragover = (e) => {
	e.preventDefault()
}


const printList = () => {
	console.log(dragData.dataList);
}

const problemData = reactive({
	id: 0,
	input: '',
	content: '',
})

const handleGetProblemContent = async () => {
	const { data: res } = await http.get('/problem/content?id=' + problemData.input)
	console.log(res);
	if (res.code != 200) {
		msg.err('题目搜索失败')
		msg.err(res.msg)
		return
	}
	problemData.content = res.data.content
	problemData.id = Number(problemData.input)
}


const printItem = (item) => {
	console.log(item);
}

const searchAndAddProblemModalCancel = () => {
	showSearchAndAddProblemModal.value = false
}


const addProblem = () => {

	let id = problemData.id
	if (id == 0) {
		msg.err("请选择添加的题目")
		return
	}
	if (dragData.idSet.has(id)) {
		msg.err('题目已存在请勿重复添加')
		return
	}
	dragData.idSet.add(id)
	// let i = dragData.dataList.length
	dragData.dataList.push({ id: id, label: 'ID:' + (id) })
	showSearchAndAddProblemModal.value = false
	problemData.id = 0
	problemData.input = ''
	problemData.content = ''
}

const removeProblem = (idx) => {
	let id = dragData.dataList[idx].id
	dragData.dataList.splice(idx, 1)
	dragData.idSet.delete(id)
	console.log(idx, "ok");
}


const handleLv1Change = (t) => {
    // empty function
}



onMounted(() => {
    let s = router.currentRoute.value.params.status
    if (s == 'all') {
        queryContestStatus.value = 0
    } else if (s == 'not-started') {
        queryContestStatus.value = 1
    } else if (s == 'finished') {
        queryContestStatus.value = 2
    } else if (s == 'in-process') {
        queryContestStatus.value = 3
    }
    getContestList()
    getContestTags()
})

const showCreateContestInfo = ref(false)
const showAddUserInfoModal = () => {
	showCreateContestInfo.value = true
	clearFormItem()
}


// const getContestTags = async () => {
// 	const { data: res } = await http.get('/contest/tags')
// 	if (res.code != 200) {
// 		msg.err(res.msg)
// 		return
// 	}
// 	contestTagList.value = res.data.tagList
// }

const getContestNameById = (id) => {
	// console.log("aaa",contestTagList.value.length);
	for (let i = 0; i < contestTagList.value.length; i++) {
		let e = contestTagList.value[i];
		// console.log(e);
		for (let j = 0; j < e.tags.length; j++) {
			if (e.tags[j].id == id) {
				return e.tags[j].name
			}
			// console.log(e.tags[j]);
		}
	}
	return ''
}


</script>

<style scoped lang="less">
.sort-move {
	transition: transform 0.3s;
}

.dragdata-list-item {
	width: 100%;
	height: 50px;
	margin-bottom: 10px;
	border-radius: 10px;
	padding: 0px 20px;
}

.elem-center {
	display: flex;
	align-items: center;
	justify-content: center;
}

:deep(div.vuepress-markdown-body) {
	padding: 10px;
}
</style>

