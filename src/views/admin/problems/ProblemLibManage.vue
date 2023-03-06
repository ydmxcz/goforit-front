<template>
	<Card style="width:100%;height: 100%;">
		<Space style="width: 100%;" direction="vertical">
			<Space>
				<Input search enter-button="搜索" placeholder="Enter something..." />
				<Button type="primary" icon="md-add" @click="showAddUserInfoModal">添加题目</Button>
			</Space>
			<Table stripe :columns="columns" :data="userList">
				<template #status="{ row }">
					<Select v-model="row.status" style="width:100px">
						<Option v-for="item in statusSlelectList" :value="item.value" :key="item.value">{{ item.label }}
						</Option>
					</Select>
					<!-- <strong v-if="row.status == 1" style="color: greenyellow;">正常</strong>
																																																																																		<strong v-else style="color: red;">封禁</strong> -->
				</template>
				<template #createTime="{ row }">
					<Time :time="(row.createTime / 1000) / 1000" type="datetime" />
				</template>
				<template #operation="{ row }">
					<Button type="primary" style="margin-right: 10px;" @click="showEditUserInfoModal(row)">
						<Icon type="ios-create-outline" style="margin-right: 5px;" />编辑
					</Button>
					<Button type="error" @click="handleDeleteUser(row)">
						<Icon type="md-trash" style="margin-right: 5px;" />删除
					</Button>
				</template>
			</Table>
			<Space direction="vertical" type="flex" align="center">
				<Page :total="pageInfo.total" :page-size="pageInfo.pageSize" show-elevator show-sizer show-total
					:page-size-opts="[10, 15, 20]" :model-value="pageInfo.curr" @on-change="changePage"
					@on-page-size-change="changePageSize" />
			</Space>
		</Space>
	</Card>
	<Modal v-model="showEditProblemModal" title="编辑题目信息" @on-ok="editProblemInfoOk" @on-cancel="editProblemInfoCancel" scrollable>

		<Form :model="problemInfo" :label-width="80" :rules="ruleValidate">
			<FormItem label="题目名称：" prop="title" :label-width="180">
				<Input v-model="problemInfo.title"></Input>
			</FormItem>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="C/C++时间限制(ms)：" prop="timeLimit" :label-width="180">
					<Input v-model="problemInfo.cTimeLimit"></Input>
				</FormItem>
				<FormItem label="C/C++内存限制(mb)：" prop="timeLimit" :label-width="180">
					<Input v-model="problemInfo.cMemoryLimit"></Input>
				</FormItem>
			</Space>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="其他语言时间限制(ms)：" prop="email" :label-width="180">
					<Input v-model="problemInfo.timeLimit"></Input>
				</FormItem>
				<FormItem label="其他语言内存限制(mb)：" prop="email" :label-width="180">
					<Input v-model="problemInfo.memoryLimit"></Input>
				</FormItem>
			</Space>
			<Space :size="30" style="width: 100%;" :wrap="false">
				<FormItem label="题目难度：" :label-width="180">
					<Select v-model="problemInfo.difficult" style="width:200px">
						<Option v-for="item in ['简单', '中等', '困难']" :value="item" :key="item">{{ item }}</Option>
					</Select>
				</FormItem>
				<FormItem label="是否公开：" :label-width="180">
					<Select v-model="problemInfo.public" style="width:200px">
						<Option v-for="item in ['公开', '私有', '付费']" :value="item" :key="item">{{ item }}</Option>
					</Select>
				</FormItem>
			</Space>
			<FormItem label="算法标签">
				<Poptip placement="right" width="500" title="全部分类">
					<Tag v-for="subitem in problemInfo.tags" type="border" closable color="primary"
						style="margin-right: 10px;" @on-close="handleCloseTag(subitem)">
						{{ subitem.name }}
					</Tag>
					<Button type="primary" icon="md-add">添加标签</Button>
					<template #content>
						<div class="all-tag">
							<Space style="width: 100%;" direction="vertical" align="start">
								<div class="all-tag-item" v-for="item in tagSelect">
									<div class="vertical-center item-title"
										:style="{ borderLeft: '3px solid ' + item.color, background: item.colorBg }">
										{{ item.name }}</div>
									<Row :wrap="true">
										<Tag v-for="subitem in item.children" :color="subitem.color"
											@click="searchInAllTag(item.name, subitem)"
											style="margin: 5px;cursor: pointer;">
											{{ subitem.name }}
										</Tag>
									</Row>
								</div>
							</Space>
						</div>
					</template>
				</Poptip>
			</FormItem>
			<FormItem label="题目内容">
				<v-md-editor class="md-editor" v-model="problemInfo.content" height="300px" mode="edit"
					placeholder="输入题目信息，点击编辑器右上角可以全屏显示编辑器"
					left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code "></v-md-editor>
			</FormItem>
		</Form>
	</Modal>
	<Modal v-model="showAddUserInfo" :title="'创建新题目'" width="1200" style="top:20px;margin-bottom: 50px;"
		:mask-closable="false" :before-close="handleBeforeClose" scrollable>

		<Form :model="problemInfo" :label-width="80" :rules="ruleValidate">
			<FormItem label="题目名称：" prop="title" :label-width="180">
				<Input v-model="problemInfo.title"></Input>
			</FormItem>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="C/C++时间限制(ms)：" prop="timeLimit" :label-width="180">
					<Input v-model="problemInfo.cTimeLimit"></Input>
				</FormItem>
				<FormItem label="C/C++内存限制(mb)：" prop="timeLimit" :label-width="180">
					<Input v-model="problemInfo.cMemoryLimit"></Input>
				</FormItem>
			</Space>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="其他语言时间限制(ms)：" prop="email" :label-width="180">
					<Input v-model="problemInfo.timeLimit"></Input>
				</FormItem>
				<FormItem label="其他语言内存限制(mb)：" prop="email" :label-width="180">
					<Input v-model="problemInfo.memoryLimit"></Input>
				</FormItem>
			</Space>
			<Space :size="30" style="width: 100%;" :wrap="false">
				<FormItem label="题目难度：" :label-width="180">
					<Select v-model="problemInfo.difficult" style="width:200px">
						<Option v-for="item in ['简单', '中等', '困难']" :value="item" :key="item">{{ item }}</Option>
					</Select>
				</FormItem>
				<FormItem label="是否公开：" :label-width="180">
					<Select v-model="problemInfo.public" style="width:200px">
						<Option v-for="item in ['公开', '私有', '付费']" :value="item" :key="item">{{ item }}</Option>
					</Select>
				</FormItem>
			</Space>
			<FormItem label="算法标签">
				<Poptip placement="right" width="500" title="全部分类">
					<Tag v-for="subitem in problemInfo.tags" type="border" closable color="primary"
						style="margin-right: 10px;" @on-close="handleCloseTag(subitem)">
						{{ subitem.name }}
					</Tag>
					<Button type="primary" icon="md-add">添加标签</Button>
					<template #content>
						<div class="all-tag">
							<Space style="width: 100%;" direction="vertical" align="start">
								<div class="all-tag-item" v-for="item in tagSelect">
									<div class="vertical-center item-title"
										:style="{ borderLeft: '3px solid ' + item.color, background: item.colorBg }">
										{{ item.name }}</div>
									<Row :wrap="true">
										<Tag v-for="subitem in item.children" :color="subitem.color"
											@click="searchInAllTag(item.name, subitem)"
											style="margin: 5px;cursor: pointer;">
											{{ subitem.name }}
										</Tag>
									</Row>
								</div>
							</Space>
						</div>
					</template>
				</Poptip>
			</FormItem>
			<FormItem label="题目内容">
				<v-md-editor class="md-editor" v-model="problemInfo.content" height="300px" mode="edit"
					placeholder="输入题目信息，点击编辑器右上角可以全屏显示编辑器"
					left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code "></v-md-editor>
			</FormItem>
			<FormItem label="上传评测样例文件">
				<Upload multiple type="drag" :action="fileServer.fileServerAddress" :on-success="onUploadSuccess"
					:before-upload="handleUpload" :show-upload-list="false">
					<div style="padding: 20px 0">
						<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
						<p>单击或拖拽 上传题目输入输出文件，输入文件格式.in 输出文件格式.out</p>
						<p>文件格式：样例序号.(in/out)，且.in和.out文件应相匹配</p>
					</div>
				</Upload>
				<Space style="margin-top: 10px;">
					<Tag type="border" closable color="primary" v-for="item, idx in testMap.uploadFileList"
						@on-close="onRemoveUploadedFile(item, idx)">{{ item.name }}</Tag>

				</Space>
			</FormItem>
		</Form>
		<template #footer>
			<div style="width: 100%;height: 40px;">
				<Space style="float: right;">
					<Button @click="addUserInfoCancel">取消</Button>
					<Button type="primary" @click="addProblemInfoOk">确定</Button>
				</Space>
			</div>
		</template>
</Modal>
</template>
<script setup name="ProblemLibManage">
import { ref, reactive, onMounted } from 'vue'
import http from '../../../plugin/axios';
import { Message } from 'view-ui-plus';
import { useStore } from 'vuex';
import fileServer from '../../../common/fierserver'
import msg from '../../../common/msg.js'

const pageInfo = reactive({
	curr: 1,
	pageSize: 15,
	total: 100
})

const store = useStore()

const changePage = (page) => {
	console.log(page);
	pageInfo.curr = page
}

const changePageSize = (psize) => {
	console.log(psize);
}

const statusSlelectList = ref([
	{ label: '正常', value: 1 },
	{ label: '封禁', value: 0 },
]);

const columns = ref([
	{ title: 'ID', key: 'id', width: '200px' },
	{ title: '用户名', key: 'userName' },
	{ title: '邮箱', key: 'email' },
	{ title: '用户状态', key: 'status', slot: 'status', width: '150px' },
	{ title: '注册时间', key: 'createTime', slot: 'createTime' },
	{ title: '操作', slot: 'operation', width: '250px' },
]);

const userList = ref([]);
const problemInfo = ref({
	title: '',
	timeLimit: 0,
	cTimeLimit: 0,
	memoryLimit: 0,
	cMemoryLimit: 0,
	public: '公开',
	difficult: '简单',
	tags: [],
	content: '# SB!',
	caseFileList: []
})
const clearFormItem = () => {
	problemInfo.value = {
		title: '',
		timeLimit: 2000,
		cTimeLimit: 1000,
		memoryLimit: 128,
		cMemoryLimit: 64,
		public: '公开',
		difficult: '简单',
		tags: [],
		content: '# hi SB!',
		caseFileList: []
	}
	testMap.map.clear()
	testMap.closeable = true
	// 用来保存tag list需要的已上传的图片信息
	testMap.uploadFileList = []
}

const testMap = reactive({
	map: new Map(),
	closeable: true,
	uploadFileList: []
})

const handleUpload = (file) => {
	let idx = file.name.lastIndexOf(".");
	// 文件拓展名
	let ext = file.name.substring(idx)
	// 文件名为数字，不能转换成Number类型的文件名都不合法
	// 采用转换后的文件名，作为测试样例的序号，
	// 最后确认上传之前还要保证输入输出文件配对且号码连续
	let caseIdx = Number(file.name.substring(0, idx))
	// 检查文件名
	if (!caseIdx) {
		msg.err('文件名应为数字！')
		return false
	}
	// 检查拓展名
	if (ext != '.in' && ext != '.out') {
		msg.err('文件拓展名应为.in或.out')
		return false
	}
	// 如果map中有
	if (testMap.map.has(caseIdx)) {
		let t = testMap.map.get(caseIdx)
		if (ext == '.in' && t.in != '-') {
			msg.err(file.name + "文件重复")
			return false
		} else if (ext == '.out' && t.out != '-') {
			msg.err(file.name + "文件重复")
			return false
		}
	}
	return true
}


const onUploadSuccess = (response, file, fileList) => {
	console.log(response);
	console.log(file);
	let idx = file.name.lastIndexOf(".");
	let ext = file.name.substring(idx)
	let caseIdx = Number(file.name.substring(0, idx))
	if (!testMap.map.has(caseIdx)) {
		testMap.map.set(caseIdx, {
			idx: caseIdx,
			inSize:0,
			outSize:0,
			in: '-',
			out: '-',
		})
	}
	let pair =testMap.map.get(caseIdx)
	if (ext == '.in') {
		pair.in = response.data
		pair.inSize = file.size
	} else if (ext == '.out') {
		pair.out = response.data
		pair.outSize = file.size
	}
	testMap.uploadFileList.push({
		name: file.name,
		addr: response.data
	})
	msg.ok('上传成功')
}

const onRemoveUploadedFile = async (file, idx) => {
	let symIdx = file.name.lastIndexOf(".");
	let ext = file.name.substring(symIdx)
	let caseIdx = Number(file.name.substring(0, symIdx))
	let t = testMap.map.get(caseIdx);
	let addr = ''
	try {
		if (ext == '.in') {
			addr = t.in
			const { data: res } = await http.post('/goforit/remove', { addr: addr })
			if (res.code != 200) {
				msg.err(res.msg)
				return
			}
			t.in = '-'
			t.inSize = 0
		} else if (ext == '.out') {
			addr = t.out
			const { data: res } = await http.post('/goforit/remove', { addr: addr })
			if (res.code != 200) {
				msg.err(res.msg)
				return
			}
			t.out = '-'
			t.outSize=0
		} else {
			msg.err('无效文件类型')
		}
	} catch (e) {
		msg.err(e)
	}
	testMap.uploadFileList.splice(idx, 1)
	if (t.in == '-' && t.out == '-') {
		testMap.map.delete(caseIdx)
	}
	msg.ok("删除成功")
}


const checkCase = () => {
	if (testMap.map.size == 0) {
		msg.err('请上传评测文件')
		return false
	}
	for (let val of testMap.map.values()) {
		console.log("sss:", val);
		if (val.in == '-') {
			msg.err(val.idx + '号测试样例缺少输入(.in)文件')
			return false
		}
		if (val.out == '-') {
			msg.err(val.idx + '号测试样例缺少输入(.in)文件')
			return false
		}
		problemInfo.value.caseFileList.push(val)
	}
	// console.log();
	problemInfo.value.caseFileList.sort((o1, o2) => {
		return o1.idx - o2.idx
	})
	console.log(problemInfo.value.caseFileList);
	for (let i = 0; i < problemInfo.value.caseFileList.length - 1; i++) {
		if (problemInfo.value.caseFileList[i].idx + 1 != problemInfo.value.caseFileList[i + 1].idx) {
			msg.err('测试样例号码不连续，缺少' + (problemInfo.value.caseFileList[i].idx + 1) + '号样例')
			return false
		}
	}
	return true
}


const searchInAllTag = (name, subitem) => {
	console.log("SBSBSBS", name, subitem);
	if (!problemInfo.value.tags.includes(subitem)) {
		problemInfo.value.tags.push(subitem)
	}
}

const handleCloseTag = (item) => {
	let i = problemInfo.value.tags.indexOf(item)
	problemInfo.value.tags.splice(i, 1)
}

const showEditProblemModal = ref(false)
const showEditUserInfoModal = (row) => {
	showEditProblemModal.value = true
	problemInfo.value = row
}

const editProblemInfoOk = async () => {
	let d = {
		age: Number(problemInfo.value.age || 0),
		id: problemInfo.value.id || 0,
		status: Number(problemInfo.value.status || 0),
		grade: Number(problemInfo.value.grade || 0),
		stuNumber: Number(problemInfo.value.stuNumber || 0),
		createTime: problemInfo.value.createTime || 0,
		gender: problemInfo.value.gender || '',
		userName: problemInfo.value.title || '',
		avatar: problemInfo.value.avatar || '',
		real_name: problemInfo.value.real_name || '',
		school: problemInfo.value.school || '',
		major: problemInfo.value.major || '',
		instruction: problemInfo.value.instruction || '',
		email: problemInfo.value.email || ''
	}
	console.log(d);
	// const { data } = await http.post('/user/updateinfo', d)
	// if (data.code != 200) {
	// 	Message.error({ background: true, content: data.msg });
	// 	return
	// }
	Message.success({ background: true, content: '修改成功' });
	getUserList()
	clearFormItem()
	showEditProblemModal.value = false
}

const editProblemInfoCancel = () => {
	clearFormItem()
}




const showAddUserInfo = ref(false)
const showAddUserInfoModal = () => {
	console.log(testMap.uploadFileList);
	showAddUserInfo.value = true
	clearFormItem()
}

const handleBeforeClose = async () => {
	console.log('取消上传');
	for (let val of testMap.map.values()) {
		if (val.in != '-') {
			await http.post('/goforit/remove', { addr: val.in })
		}
		if (val.out != '-') {
			await http.post('/goforit/remove', { addr: val.out })
		}
		// problemInfo.value.caseFileList.push(val)
	}
	clearFormItem()
	// let s = false;
	// return new Promise(function (resolve, reject) {
	// 	//resolve,reject都是一个函数
	// 	//resolve是讲pending转为resolved
	// 	//reject是讲pending转为rejected
	// 	if (s) {
	// 		msg.ok('可以关闭')
	// 		resolve("true");
	// 	} else {
	// 		msg.err('禁止关闭')
	// 		reject("false");
	// 	}
	// })
}


const addProblemInfoOk = async () => {
	if (!checkCase()) {
		msg.err('样例检查不通过，禁止提交');
		problemInfo.value.caseFileList.length = 0
		return
	}
	msg.ok('样例检查通过');
	console.log(problemInfo.value.caseFileList);
	// const { data } = await http.post('/user/add', {
	// 	userInfo: d,
	// 	password: formItem.password || ''
	// })
	// if (data.code != 200) {
	// 	Message.error({ background: true, content: data.msg });
	// 	return
	// }
	msg.ok('添加成功')
	// getUserList()
	showAddUserInfo.value = false
	// clearFormItem()
	handleBeforeClose()
}
const addUserInfoCancel = () => {
	handleBeforeClose()
	showAddUserInfo.value = false
	// clearFormItem()
}


const handleDeleteUser = async (row) => {
	// return
	// const { data } = await http.post('/user/delete', {
	// 	UserId: row.id || 0,
	// })
	// if (data.code != 200) {
	// 	Message.error({ background: true, content: data.msg });
	// }
	msg.err('删除成功')
	console.log(data);
	getUserList()
}


const getUserList = async () => {
	const { data } = await http.get('/user/list?currPage=' + pageInfo.curr + '&pageSize=' + pageInfo.pageSize)
	if (data.code != 200) {
		Message.error({ background: true, content: data.msg });
	}
	// console.log(data);
	userList.value = data.data.userlist
	pageInfo.total = data.data.total
}


const userInfo = ref({ userName: '' });

const tagSelect = reactive([
	{
		name: '算法', id: '1', colorBg: '#9dcbfb', color: '#2d8cf0', children: [
			{ name: '分布式系统', id: '1', color: 'blue' },
			{ name: 'Go', id: '1', color: 'blue' },
			{ name: 'Java', id: '1', color: 'blue' },
			{ name: 'MySQL', id: '1', color: 'blue' },
			{ name: 'Redis', id: '1', color: 'blue' },
			{ name: 'Kafka', id: '1', color: 'blue' },
			{ name: 'ElasticSearch', id: '1', color: 'blue' },
			{ name: 'Spring', id: '1', color: 'blue' },
			{ name: 'SpringCloud', id: '1', color: 'blue' },
			{ name: 'Linux', id: '1', color: 'blue' },
			{ name: '计算机网络', id: '1', color: 'blue' },
			{ name: '算法', id: '1', color: 'blue' },
			{ name: '面试', id: '1', color: 'blue' },
			{ name: '架构', id: '1', color: 'blue' },
			{ name: '数据库', id: '1', color: 'blue' },
			{ name: 'Kubernetes', id: '1', color: 'blue' },
			{ name: 'Docker', id: '1', color: 'blue' },
			{ name: '源码阅读', id: '1', color: 'blue' },
		]
	}, {
		name: '后端', id: '1', colorBg: '#9dcbfb', color: '#2d8cf0', children: [
			{ name: '分布式系统', id: '1', color: 'blue' },
			{ name: 'Go', id: '1', color: 'blue' },
			{ name: 'Java', id: '1', color: 'blue' },
			{ name: 'MySQL', id: '1', color: 'blue' },
			{ name: 'Redis', id: '1', color: 'blue' },
			{ name: 'Kafka', id: '1', color: 'blue' },
			{ name: 'ElasticSearch', id: '1', color: 'blue' },
			{ name: 'Spring', id: '1', color: 'blue' },
			{ name: 'SpringCloud', id: '1', color: 'blue' },
			{ name: 'Linux', id: '1', color: 'blue' },
			{ name: '计算机网络', id: '1', color: 'blue' },
			{ name: '算法', id: '1', color: 'blue' },
			{ name: '面试', id: '1', color: 'blue' },
			{ name: '架构', id: '1', color: 'blue' },
			{ name: '数据库', id: '1', color: 'blue' },
			{ name: 'Kubernetes', id: '1', color: 'blue' },
			{ name: 'Docker', id: '1', color: 'blue' },
			{ name: '源码阅读', id: '1', color: 'blue' },
		]
	}, {
		name: '前端', id: '1', colorBg: '#a6ecc9', color: '#19be6b', children: [
			{ name: 'Html', id: '1', color: 'green' },
			{ name: 'JavaScript', id: '1', color: 'green' },
			{ name: 'TypeScript', id: '1', color: 'green' },
			{ name: 'CSS', id: '1', color: 'green' },
			{ name: 'Vue', id: '1', color: 'green' },
			{ name: 'Node.js', id: '1', color: 'green' },
			{ name: 'Next.js', id: '1', color: 'green' },
			{ name: 'React', id: '1', color: 'green' },
			{ name: 'Webpack', id: '1', color: 'green' },
			{ name: 'Flutter', id: '1', color: 'green' },
		]
	}, {
		name: 'Android', id: '1', colorBg: '#fcd69d', color: '#ff9900', children: [
			{ name: 'Java', id: '1', color: 'orange' },
			{ name: 'Go', id: '1', color: 'orange' },
			{ name: 'MySQL', id: '1', color: 'orange' },
			{ name: 'Redis', id: '1', color: 'orange' },
			{ name: 'Kafka', id: '1', color: 'orange' },
			{ name: 'ElasticSearch', id: '1', color: 'orange' },
			{ name: 'Spring', id: '1', color: 'orange' },
			{ name: 'SpringCloud', id: '1', color: 'orange' },
			{ name: 'Linux', id: '1', color: 'orange' },
			{ name: '计算机网络', id: '1', color: 'orange' },
			{ name: '算法', id: '1', color: 'orange' },
			{ name: '面试', id: '1', color: 'orange' },
			{ name: '架构', id: '1', color: 'orange' },
			{ name: '数据库', id: '1', color: 'orange' },
		]
	}
])




onMounted(() => {
	userInfo.value = store.getters.userInfo
	getUserList()
	console.log(new Date(1676400795548));

})

const ruleValidate = reactive({
	userName: [
		{ required: true, message: '姓名不能为空', trigger: 'blur' }
	],
	title: [
		{ required: true, message: '题目名称不能为空', trigger: 'blur' }
	],
	email: [
		{ required: true, message: '邮箱信息不能为空', trigger: 'blur' },
		{ type: 'email', message: '不合法邮箱名', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '密码不能为空', trigger: 'blur' },
		{ type: 'string', min: 6, message: '不能少于6个字符', trigger: 'blur' },
		{ type: 'string', max: 20, message: '不能多多于20个字符', trigger: 'blur' }
	],
	desc: [
		{ required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
		{ type: 'string', max: 100, message: '个人介绍不能多于100个字', trigger: 'blur' }
	]
})

</script>


<style scoped lang="less">
.all-tag {
	width: 100%;
	height: 400px;

	.all-tag-item {
		width: 100%;

		.item-title {
			height: 30px;
			margin-bottom: 5px;
			width: 100%;
			// border-left: 3px solid #6ea7f1;
			text-align: left;
			padding-left: 10px;
		}
	}
}

.vertical-center {
	display: flex;
	align-items: center;
}
</style>