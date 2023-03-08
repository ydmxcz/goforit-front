<template>
	<Card style="width:100%;height: 100%;">
		<Space style="width: 100%;" direction="vertical">
			<Space>
				<Input search enter-button="搜索" placeholder="输入比赛名称...." />
				<Button type="primary" icon="md-add" @click="showAddUserInfoModal">创建比赛</Button>
			</Space>
			<Table stripe :columns="tableColumns" :data="contestList">
				<template #status="{ row }">
					<Tag color="blue" v-if="row.startTime > new Date().getTime()">未开始</Tag>
					<Tag color="blue"
						v-else-if="row.startTime > new Date().getTime() && row.endTime < new Date().getTime()">进行中</Tag>
					<Tag color="blue" v-else-if="row.endTime < new Date().getTime()">已结束</Tag>
					<Tag color="red" v-else>状态错误</Tag>

				</template>
				<template #contestType="{ row }">
					<Tag color="blue" v-if="row.contestType == 1">ACM</Tag>
					<Tag color="green" v-else-if="row.contestType == 2">OI</Tag>
					<!-- <Time :time="(row.createTime / 1000) / 1000" type="datetime" /> -->
				</template>
				<template #createTime="{ row }">
					<Time :time="(row.createTime / 1000) / 1000" type="datetime" />
				</template>
				<template #startTime="{ row }">
					<span> {{ time.formatDate(new Date(row.startTime)) }}</span>
					<!-- <Time :time="(row.startTime / 1000) / 1000" type="datetime" /> -->
				</template>
				<template #timeLength="{ row }">
					<span> {{ new Date(row.startTime - row.endTime).getHours() }}h</span>
					<!-- <Time :time="(row.startTime / 1000) / 1000" type="datetime" /> -->
				</template>
				<template #operation="{ row }">
					<Poptip trigger="hover" content="查看详细信息">
						<Button type="primary" style="margin-right: 10px;" @click="showContestDetialInfoModal(row)"
							icon="ios-paper" shape="circle"></Button>
					</Poptip>
					<Poptip trigger="hover" content="编辑比赛信息">
						<Button type="warning" style="margin-right: 10px;" @click="showEditContestInfoModal(row)"
							icon="ios-create" shape="circle">
						</Button>
					</Poptip>
					<Poptip trigger="hover" content="删除比赛">
						<Button type="error" @click="handleDeleteUser(row)" icon="md-trash" shape="circle"></Button>
					</Poptip>
				</template>
			</Table>
			<Space direction="vertical" type="flex" align="center">
				<Page :total="pageInfo.total" :page-size="pageInfo.pageSize" show-elevator show-sizer show-total
					:page-size-opts="[10, 15, 20]" :model-value="pageInfo.currPage" @on-change="changePage"
					@on-page-size-change="changePageSize" />
			</Space>
		</Space>
	</Card>
	<Modal v-model="showContestDetialInfo" title="查看比赛详细信息" scrollable width="600px" :mask-closable="false"
		:closable="false" style="top: 30px;">

		<Form :model="formItem" :label-width="120">
			<FormItem label="比赛标题">
				<span> {{ formItem.title }}</span>
			</FormItem>
			<FormItem label="比赛类型">
				<Row>
					<Col span="6">

					<Tag color="blue" v-if="formItem.contestType == 1">ACM</Tag>
					<Tag color="green" v-else-if="formItem.contestType == 2">OI</Tag>
					</Col>
					<Col span="4" style="text-align: center">比赛分类</Col>
					<Col span="10">
					<Tag color="primary">{{ getContestNameById(formItem.contestType) }}</Tag>
					</Col>
				</Row>

			</FormItem>
			<FormItem label="举办方类型">
				<Tag color="primary" v-if="formItem.sponsorType">个人</Tag>
				<Tag color="primary" v-else>小组</Tag>
			</FormItem>
			<FormItem label="举办方ID">
				<span>{{ formItem.sponsorId }}</span>
			</FormItem>
			<FormItem label="是否公开">
				<Row>
					<Col span="4">

					<Tag color="primary" v-if="formItem.public">公开</Tag>
					<Tag color="warning" v-else>私有</Tag>
					</Col>
					<Col span="4" style="text-align: center" v-if="!formItem.public">比赛密码</Col>
					<Col span="15" v-if="!formItem.public">
					<span>{{ formItem.pwd }}</span>
					</Col>
				</Row>
			</FormItem>
			<FormItem label="报名起止时间">
				<span> {{ time.formatDate(new Date(formItem.signUpStartTime)) }} - {{ time.formatDate(new
					Date(formItem.signUpEndTime)) }}</span>
			</FormItem>
			<FormItem label="比赛起止时间">
				<span> {{ time.formatDate(new Date(formItem.startTime)) }} - {{ time.formatDate(new Date(formItem.endTime))
				}}</span>
			</FormItem>
			<FormItem label="是否开启封榜">
				<Row>
					<Col span="4">
					<Tag color="primary" v-if="formItem.sealRank">开启</Tag>
					<Tag color="primary" v-else>关闭</Tag>
					</Col>
					<Col span="5" style="text-align: center" v-if="formItem.sealRank">在比赛结束前</Col>
					<Col span="11" v-if="formItem.sealRank">
					<span>{{ formItem.sealRankTime / 60 }}分钟封榜</span>

					</Col>
				</Row>
			</FormItem>
			<FormItem label="比赛结束后是否开放榜单">
				<Tag color="primary" v-if="formItem.openRank">开启</Tag>
				<Tag color="primary" v-else>关闭</Tag>

			</FormItem>
			<FormItem label="不计Rating范围:">
				<span>Rating > </span>
				<Tag color="blue">{{ formItem.ratingTop }}</Tag>

			</FormItem>
			<FormItem label="比赛介绍">
				<span>{{ formItem.description }}</span>

			</FormItem>
		</Form>
		<template #footer>
			<div style="width: 100%;height: 40px;">
				<Space style="float: right;">
					<Button @click="closeContestDetial">关闭</Button>
				</Space>
			</div>
		</template>
	</Modal>
	<Modal v-model="showEditContestInfo" title="编辑比赛信息" scrollable width="600px" :mask-closable="false" :closable="false"
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
			<FormItem label="举办方类型">
				<Switch size="large" v-model="formItem.sponsorType">
					<template #open>
						<span>个人</span>
					</template>
					<template #close>
						<span>小组</span>
					</template>
				</Switch>
			</FormItem>
			<FormItem label="举办方ID">
				<Input v-model="formItem.sponsorId"></Input>
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
			<FormItem label="不计Rating范围:">
				<span>Rating > </span>
				<InputNumber :min="1500" :step="1" v-model="formItem.ratingTop" />
			</FormItem>
			<FormItem label="比赛介绍">
				<Input v-model="formItem.description" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
					placeholder="输入比赛介绍..." maxlength="150" show-word-limit></Input>
			</FormItem>
		</Form>
		<template #footer>
			<div style="width: 100%;height: 40px;">
				<Space style="float: right;">
					<Button @click="editContestCancel">取消</Button>
					<Button type="primary" @click="editContestInfoOk">确定</Button>
				</Space>
			</div>
		</template>
	</Modal>
	<Modal v-model="showCreateContestInfo" title="创建新比赛" scrollable width="600px" :mask-closable="false" :closable="false"
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
			<FormItem label="举办方类型">
				<Switch size="large" v-model="formItem.sponsorType">
					<template #open>
						<span>个人</span>
					</template>
					<template #close>
						<span>小组</span>
					</template>
				</Switch>
			</FormItem>
			<FormItem label="举办方ID">
				<Input v-model="formItem.sponsorId"></Input>
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
			<FormItem label="不计Rating范围:">
				<span>Rating > </span>
				<InputNumber :min="1500" :step="1" v-model="formItem.ratingTop" />
				<!-- <Input v-model="formItem.ratingTop"></Input> -->
			</FormItem>
			<FormItem label="比赛介绍">
				<Input v-model="formItem.description" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
					placeholder="输入比赛介绍..." maxlength="150" show-word-limit></Input>
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
<script setup name="ContestManage">
import { ref, reactive, onMounted } from 'vue'
import http from '../../../plugin/axios';
import msg from '../../../common/msg'
import time from '../../../common/time'
import { useStore } from 'vuex';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';

const store = useStore()

const pageInfo = reactive({
	currPage: 1,
	pageSize: 15,
	total: 100
})

const userInfo = ref(store.getters.userInfo)

const changePage = (page) => {
	pageInfo.currPage = page
	getcontestList()
}

const changePageSize = (psize) => {
	pageInfo.pageSize = psize
	getcontestList()
}


const tableColumns = ref([
	{ title: 'ID', key: 'id', width: '70px', align: 'center' },
	{ title: '比赛标题', key: 'title', align: 'center' },
	{ title: '举办方ID', key: 'sponsorId', align: 'center' },
	{ title: '比赛类型', slot: 'contestType', width: '100px', align: 'center' },
	{ title: '比赛状态', slot: 'status', width: '150px', align: 'center' },
	{ title: '创建时间', key: 'createTime', slot: 'createTime', align: 'center' },
	{ title: '开始时间', slot: 'startTime', align: 'center' },
	{ title: '比赛时长', slot: 'timeLength', align: 'center' },
	{ title: '操作', slot: 'operation', width: '250px', align: 'center' },
]);

const contestList = ref([]);
const formItem = ref({
	id: '',
	sponsorId: '',
	sponsorType: true,
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
	mender: '',
	signUpTime: [],
	contestTime: [],
	contestSelectValue: '',
	contestSelectSubValue: '',
	subTagList: []

})

const clearFormItem = () => {
	formItem.value = {
		id: '',
		sponsorId: '',
		sponsorType: true,
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
		mender: '',
		signUpTime: [],
		contestTime: [],
		contestSelectValue: '',
		contestSelectSubValue: '',
		subTagList: []
	}
}

const handleSelectContestType = (name) => {
	// console.log(name);
	formItem.value.contestSelectValue = name
	contestTagList.value.forEach(item => {
		// console.log(item);
		if (item.name == name) {
			formItem.value.subTagList = item.tags
			formItem.value.contestType = item.id
		}
	})
	// console.log(formItem.value.subTagList);
}

const handleSelectContestTag = (name) => {
	formItem.value.subTagList.forEach((item) => {
		// console.log(item.name,name);
		if (item.name == name) {
			formItem.value.contestTagId = item.id
			formItem.value.contestTagName = item.name
			// console.log(formItem.value.contestTagName,formItem.value.contestTagId);
		}
	})
}

const showContestDetialInfo = ref(false)
const showContestDetialInfoModal = (row) => {
	showContestDetialInfo.value = true
	formItem.value = row
}

const showEditContestInfo = ref(false)
const showEditContestInfoModal = (row) => {
	showEditContestInfo.value = true
	formItem.value = row
}

const editContestInfoOk = async () => {
	let contestInfo = {
		sponsorId: 0,
		sponsorType: true,
		title: formItem.value.title || '',
		description: formItem.value.description || '',
		public: formItem.value.public || true,
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
		creator: BigNumber(userInfo.value.id) || 0,
	}
	try {
		contestInfo.sponsorId = BigNumber(formItem.value.sponsorId)
	} catch (e) {
		msg.err("举办方ID输入错误")
		return
	}
	if (contestInfo.sponsorId == 0) {
		msg.err("检查举办方ID")
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

	// console.log(contestInfo, formItem.value);
	const { data } = await http.post('/contest/update', contestInfo)
	// console.log(data);
	if (data.code != 200) {
		msg.err(data.msg);
		return
	}
	msg.ok('更新比赛信息成功');
	getcontestList()
	showEditContestInfo.value = false
	clearFormItem()
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



const showSearchAndAddProblemModal = ref(false)

const showCreateContestInfo = ref(false)
const showAddUserInfoModal = () => {
	showCreateContestInfo.value = true
	clearFormItem()
}

const getAndCheckFormItem = () => {
	let contestInfo = {
		sponsorId: 0,
		sponsorType: true,
		title: formItem.value.title || '',
		description: formItem.value.description || '',
		public: formItem.value.public || true,
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
		creator: BigNumber(userInfo.value.id) || 0,
	}
	if(contestInfo.title == '') {
		msg.err("请输入比赛标题")
		return 
	}
	try {
		contestInfo.sponsorId = BigNumber(formItem.value.sponsorId)
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


const handleDeleteUser = async (row) => {
	// return
	const { data } = await http.post('/user/delete', {
		UserId: row.id || 0,
	})
	if (data.code != 200) {
		msg.err({ background: true, content: data.msg });
	}
	msg.ok({ background: true, content: '删除成功' });
	// console.log(data);
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

const getContestTags = async () => {
	const { data: res } = await http.get('/contest/tags')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	contestTagList.value = res.data.tagList
}

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
	return '算法基础'
}

const contestTagList = ref([])

onMounted(() => {
	// console.log();
	console.log("userId", userInfo.value.id);
	getcontestList();
	getContestTags()
})


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