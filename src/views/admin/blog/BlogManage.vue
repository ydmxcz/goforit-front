<template>
	<Card style="width:100%;height: 100%;">
		<Space style="width: 100%;" direction="vertical">
			<Space>
				<Input search enter-button="搜索" placeholder="Enter something..." />
				<Button type="primary" icon="md-add" @click="showAddUserInfoModal">创建博客</Button>
			</Space>
			<Table stripe :columns="columns" :data="problemList">
				<template #status="{ row }">
					<Select v-model="row.status" style="width:100px">
						<Option v-for="item in statusSlelectList" :value="item.value" :key="item.value">{{ item.label }}
						</Option>
					</Select>
				</template>
				<template #public="{ row }">
					<Tag color="blue" v-if="row.public == 1">公开</Tag>
					<Tag color="red" v-else>私有</Tag>
				</template>
				<template #difficulty="{ row }">
					<Tag color="green" v-if="row.difficulty == 1">简单</Tag>
					<Tag color="orange" v-else-if="row.difficulty == 2">中等</Tag>
					<Tag color="red" v-else>困难</Tag>
				</template>
				<template #createTime="{ row }">
					<Time :time="(row.createTime / 1000) / 1000" type="datetime" />
				</template>
				<template #operation="{ row }">
					<Poptip trigger="hover" content="查看详细信息">
						<Button type="primary" style="margin-right: 10px;" @click="showCheckUserInfoModal(row)"
							icon="ios-paper" shape="circle"></Button>
					</Poptip>
					<Poptip trigger="hover" content="编辑比赛信息">
						<Button type="warning" style="margin-right: 10px;" @click="showEditProblemInfoModal(row)"
							icon="ios-create" shape="circle">
						</Button>
					</Poptip>
					<Poptip trigger="hover" content="删除比赛">
						<Button type="error" @click="handleDeleteProblem(row)" icon="md-trash" shape="circle"></Button>
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
	<Modal v-model="showCheckProblemModal" :title="'查看题目信息'" width="1200" style="top:20px;margin-bottom: 50px;"
		:mask-closable="false" :before-close="clearFormItem" scrollable>

		<Form :model="problemInfo" :label-width="80" :rules="ruleValidate">
			<FormItem label="题目名称：" prop="title" :label-width="180">
				<span>{{ problemInfo.title }}</span>
			</FormItem>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="C/C++时间限制(ns)：" prop="timeLimit" :label-width="180">
					<span>{{ problemInfo.cTimeLimit }}</span>
				</FormItem>
				<FormItem label="C/C++内存限制(b)：" prop="timeLimit" :label-width="180">
					<span>{{ problemInfo.cMemoryLimit }}</span>
				</FormItem>
			</Space>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="其他语言时间限制(ns)：" prop="email" :label-width="180">
					<span>{{ problemInfo.timeLimit }}</span>
				</FormItem>
				<FormItem label="其他语言内存限制(b)：" prop="email" :label-width="180">
					<span>{{ problemInfo.memoryLimit }}</span>
				</FormItem>
			</Space>
			<Space :size="30" style="width: 100%;" :wrap="false">
				<FormItem label="题目难度：" :label-width="180">
					<Tag color="green" v-if="problemInfo.difficulty == 1">简单</Tag>
					<Tag color="orange" v-else-if="problemInfo.difficulty == 2">中等</Tag>
					<Tag color="red" v-else>困难</Tag>
				</FormItem>
				<FormItem label="是否公开：" :label-width="180">
					<Tag color="blue" v-if="problemInfo.public == 1">公开</Tag>
					<Tag color="red" v-else>私有</Tag>
				</FormItem>
			</Space>
			<Space :size="30" style="width: 100%;" :wrap="false">
				<FormItem label="样例输入" :label-width="180">
					<Input v-model="problemInfo.caseIn" type="textarea" :autosize="{ minRows: 2 }" placeholder="输入样例..."
						style="width: 250px;" />
				</FormItem>
				<FormItem label="样例输出" :label-width="180">
					<Input v-model="problemInfo.caseOut" type="textarea" :autosize="{ minRows: 2 }" placeholder="输出样例..."
						style="width: 250px;" />
				</FormItem>
			</Space>
			<FormItem label="算法标签">
				<Tag v-for="item in problemInfo.tags" color="blue" style="margin: 5px;cursor: pointer;">
					{{ item.name }}
				</Tag>
			</FormItem>
			<FormItem label="题目内容">
				<v-md-editor class="md-editor" v-model="problemInfo.content" height="300px" mode="edit"
					placeholder="输入题目信息，点击编辑器右上角可以全屏显示编辑器"
					left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code "></v-md-editor>
			</FormItem>
		</Form>
		<template #footer>
			<div style="width: 100%;height: 40px;">
				<Space style="float: right;">
					<Button @click="showCheckProblemModal = false">关闭</Button>
				</Space>
			</div>
		</template>
	</Modal>
	<Modal v-model="showEditProblemModal" :title="'编辑题目信息'" width="1200" style="top:20px;margin-bottom: 50px;"
		:mask-closable="false" :before-close="handleBeforeClose" scrollable>

		<Form :model="problemInfo" :label-width="80" :rules="ruleValidate">
			<FormItem label="题目名称：" prop="title" :label-width="180">
				<Input v-model="problemInfo.title"></Input>
			</FormItem>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="C/C++时间限制(ns)：" prop="timeLimit" :label-width="180">
					<Input v-model="problemInfo.cTimeLimit"></Input>
				</FormItem>
				<FormItem label="C/C++内存限制(b)：" prop="timeLimit" :label-width="180">
					<Input v-model="problemInfo.cMemoryLimit"></Input>
				</FormItem>
			</Space>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="其他语言时间限制(ns)：" prop="email" :label-width="180">
					<Input v-model="problemInfo.timeLimit"></Input>
				</FormItem>
				<FormItem label="其他语言内存限制(b)：" prop="email" :label-width="180">
					<Input v-model="problemInfo.memoryLimit"></Input>
				</FormItem>
			</Space>
			<Space :size="30" style="width: 100%;" :wrap="false">
				<FormItem label="题目难度：" :label-width="180">
					<Select v-model="problemInfo.difficulty" style="width:200px">
						<Option v-for="item in difficultyOpts" :value="item.key" :key="item.key">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="是否公开：" :label-width="180">
					<Select v-model="problemInfo.public" style="width:200px">
						<Option v-for="item in publicOpts" :value="item.key" :key="item.key">{{ item.label }}</Option>
					</Select>
				</FormItem>
			</Space>
			<Space :size="30" style="width: 100%;" :wrap="false">
				<FormItem label="样例输入" :label-width="180">
					<Input v-model="problemInfo.caseIn" type="textarea" :autosize="{ minRows: 2 }" placeholder="输入样例..."
						style="width: 250px;" />
				</FormItem>
				<FormItem label="样例输出" :label-width="180">
					<Input v-model="problemInfo.caseOut" type="textarea" :autosize="{ minRows: 2 }" placeholder="输出样例..."
						style="width: 250px;" />
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
										style=" border-left: 3px solid #fff; background-color: #fff ;">
										{{ item.name }}</div>
									<Row :wrap="true">
										<Tag v-for="subitem in item.tags" color="blue"
											@click="addTagToList(item.name, subitem)" style="margin: 5px;cursor: pointer;">
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
		<template #footer>
			<div style="width: 100%;height: 40px;">
				<Space style="float: right;">
					<Button @click="editProblemInfoCancel">取消</Button>
					<Button type="primary" @click="editProblemInfoOk">确定</Button>
				</Space>
			</div>
		</template>
	</Modal>
	<Modal v-model="showAddUserInfo" :title="'创建新题目'" width="1200" style="top:20px;margin-bottom: 50px;"
		:mask-closable="false" :before-close="handleBeforeClose" scrollable>

		<Form :model="problemInfo" :label-width="80" :rules="ruleValidate">
			<FormItem label="题目名称：" prop="title" :label-width="180">
				<Input v-model="problemInfo.title"></Input>
			</FormItem>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="C/C++时间限制(ns)：" prop="timeLimit" :label-width="180">
					<Input v-model="problemInfo.cTimeLimit"></Input>
				</FormItem>
				<FormItem label="C/C++内存限制(b)：" prop="timeLimit" :label-width="180">
					<Input v-model="problemInfo.cMemoryLimit"></Input>
				</FormItem>
			</Space>
			<Space :size="40" style="width: 100%;" :wrap="false">
				<FormItem label="其他语言时间限制(ns)：" prop="email" :label-width="180">
					<Input v-model="problemInfo.timeLimit"></Input>
				</FormItem>
				<FormItem label="其他语言内存限制(b)：" prop="email" :label-width="180">
					<Input v-model="problemInfo.memoryLimit"></Input>
				</FormItem>
			</Space>
			<Space :size="30" style="width: 100%;" :wrap="false">
				<FormItem label="题目难度：" :label-width="180">
					<Select v-model="problemInfo.difficulty" style="width:200px">
						<Option v-for="item in difficultyOpts" :value="item.key" :key="item.key">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="是否公开：" :label-width="180">
					<Select v-model="problemInfo.public" style="width:200px">
						<Option v-for="item in publicOpts" :value="item.key" :key="item.key">{{ item.label }}</Option>
					</Select>
				</FormItem>
			</Space>
			<Space :size="30" style="width: 100%;" :wrap="false">
				<FormItem label="样例输入" :label-width="180">
					<Input v-model="problemInfo.caseIn" type="textarea" :autosize="{ minRows: 2 }" placeholder="输入样例..."
						style="width: 250px;" />
				</FormItem>
				<FormItem label="样例输出" :label-width="180">
					<Input v-model="problemInfo.caseOut" type="textarea" :autosize="{ minRows: 2 }" placeholder="输出样例..."
						style="width: 250px;" />
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
										style=" border-left: 3px solid #fff; background-color: #fff ;">
										{{ item.name }}</div>
									<Row :wrap="true">
										<Tag v-for="subitem in item.tags" color="blue"
											@click="addTagToList(item.name, subitem)" style="margin: 5px;cursor: pointer;">
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
				<Upload multiple type="drag" :action="fileServer.uploadUrl" :on-success="onUploadSuccess"
					:before-upload="handleUpload" :show-upload-list="false">
					<div style="padding: 20px 0">
						<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
						<p>单击或拖拽 上传题目输入输出文件，输入文件格式.in 输出文件格式.out</p>
						<p>文件格式：样例序号.(in/out)，且.in和.out文件应相匹配</p>
					</div>
				</Upload>
				<Space style="margin-top: 10px;">
					<Tag type="border" closable color="primary" v-for="item, idx in uploadInfoMap.uploadFileList"
						@on-close="onRemoveUploadedFile(item, idx)">{{ item.name }}</Tag>
				</Space>
			</FormItem>
		</Form>
		<template #footer>
			<div style="width: 100%;height: 40px;">
				<Space style="float: right;">
					<Button @click="addProblemInfoCancel">取消</Button>
					<Button type="primary" @click="addProblemInfoOk">确定</Button>
				</Space>
			</div>
		</template>
	</Modal>
</template>
<script setup name="BlogManage">
import { ref, reactive, onMounted } from 'vue'
import http from '../../../plugin/axios';
import { Message } from 'view-ui-plus';
import { useStore } from 'vuex';
import fileServer from '../../../common/fierserver'
import msg from '../../../common/msg.js'
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';

const pageInfo = reactive({
	currPage: 1,
	pageSize: 15,
	total: 100
})

const store = useStore()

const difficultyOpts = ref([
	{ label: '简单', key: 1 },
	{ label: '中等', key: 2 },
	{ label: '困难', key: 3 },
]);

const publicOpts = ref([
	{ label: '公开', key: 1 },
	{ label: '私有', key: 2 },
]);

const changePage = (page) => {
	pageInfo.currPage = page
	getBlogList()
}

const changePageSize = (psize) => {
	pageInfo.pageSize = psize
	getBlogList()
}

const statusSlelectList = ref([
	{ label: '正常', value: 1 },
	{ label: '封禁', value: 0 },
]);

const columns = ref([
	{ title: 'ID', key: 'id', width: '100px', align: 'center' },
	{ title: '博客标题', key: 'title', align: 'center' },
	{ title: '作者ID', key: 'author', align: 'center' },
	{ title: '作者名称', key: 'authorName', align: 'center' },
	{ title: '创建时间', key: 'createTime', slot: 'createTime', align: 'center' },
	{ title: '操作', slot: 'operation', width: '250px', align: 'center' },
]);

const problemInfo = ref({
	title: '',
	timeLimit: 2000000000,
	cTimeLimit: 1000000000,
	memoryLimit: 134217728,
	cMemoryLimit: 67108864,
	public: 1,
	difficulty: 1,
	tags: [],
	content: '# 输入题目内容',
	caseFileList: [],
	caseIn: '',
	caseOut: ''
})

const uploadInfoMap = reactive({
	map: new Map(),
	closeable: true,
	uploadFileList: []
})


const clearFormItem = () => {
	problemInfo.value = {
		title: '',
		timeLimit: 2000000000,
		cTimeLimit: 1000000000,
		memoryLimit: 134217728,
		cMemoryLimit: 67108864,
		public: 1,
		difficulty: 1,
		tags: [],
		content: '# 输入题目内容',
		caseFileList: [],
		caseIn: '',
		caseOut: ''
	}
	uploadInfoMap.map.clear()
	uploadInfoMap.closeable = true
	// 用来保存tag list需要的已上传的图片信息
	uploadInfoMap.uploadFileList = []
}


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
	if (uploadInfoMap.map.has(caseIdx)) {
		let t = uploadInfoMap.map.get(caseIdx)
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
	let idx = file.name.lastIndexOf(".");
	let ext = file.name.substring(idx)
	let caseIdx = Number(file.name.substring(0, idx))
	if (!uploadInfoMap.map.has(caseIdx)) {
		uploadInfoMap.map.set(caseIdx, {
			idx: caseIdx,
			inSize: 0,
			outSize: 0,
			in: '-',
			out: '-',
		})
	}
	let pair = uploadInfoMap.map.get(caseIdx)
	if (ext == '.in') {
		pair.in = response.data
		pair.inSize = file.size
	} else if (ext == '.out') {
		pair.out = response.data
		pair.outSize = file.size
	}
	uploadInfoMap.uploadFileList.push({
		name: file.name,
		addr: response.data
	})
	msg.ok('上传成功')
}

const onRemoveUploadedFile = async (file, idx) => {
	let symIdx = file.name.lastIndexOf(".");
	let ext = file.name.substring(symIdx)
	let caseIdx = Number(file.name.substring(0, symIdx))
	let t = uploadInfoMap.map.get(caseIdx);
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
			t.outSize = 0
		} else {
			msg.err('无效文件类型')
		}
	} catch (e) {
		msg.err(e)
	}
	uploadInfoMap.uploadFileList.splice(idx, 1)
	if (t.in == '-' && t.out == '-') {
		uploadInfoMap.map.delete(caseIdx)
	}
	msg.ok("删除成功")
}


const checkCase = () => {
	if (!problemInfo.value.title) {
		msg.err("请输入题目标题")
		return false
	}
	if (problemInfo.value.tags.length == 0) {
		msg.err("请选择至少一个选择题目标签")
		return false
	}
	if (uploadInfoMap.map.size != 0) {
		for (let val of uploadInfoMap.map.values()) {
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
	}
	return true
}


const addTagToList = (name, subitem) => {
	console.log("SBSBSBS", name, subitem);
	if (!problemInfo.value.tags.includes(subitem)) {
		problemInfo.value.tags.push(subitem)
	}
}

const handleCloseTag = (item) => {
	let i = problemInfo.value.tags.indexOf(item)
	problemInfo.value.tags.splice(i, 1)
}

const getProblemDetial = async (id) => {
	const { data: res } = await http.get('/problem/detial?id=' + id)
	// console.log(res);
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	problemInfo.value = res.data.info
	problemInfo.value.tags = res.data.tags
	const { data: res1 } = await http.get('/problem/content?id=' + id)
	if (res1.code != 200) {
		msg.err(res.msg)
		return
	}
	problemInfo.value.content = res1.data.content
	// console.log("aaaa", problemInfo.value);
}

const showCheckProblemModal = ref(false)
// 打开查看题目信息对话框
const showCheckUserInfoModal = async (row) => {
	getProblemDetial(row.id)
	showCheckProblemModal.value = true
}

const showEditProblemModal = ref(false)
const showEditProblemInfoModal = async (row) => {
	const { data: res } = await http.get('/problem/detial?id=' + row.id)
	// console.log(res);
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	problemInfo.value = res.data.info
	problemInfo.value.tags = res.data.tags
	const { data: res1 } = await http.get('/problem/content?id=' + row.id)
	console.log(res1);
	if (res1.code != 200) {
		msg.err(res.msg)
		return
	}
	problemInfo.value.content = res1.data.content
	problembank.content = res1.data.content
	showEditProblemModal.value = true
	problembank.tagSet = new Set()
	problemInfo.value.tags.forEach((item) => {
		problembank.tagSet.add(item.id)
	})
	console.log("ssss", problemInfo.value, problembank.tagSet);
}

const problembank = reactive({
	tagSet: null,
	content: ''
})

const showAddUserInfo = ref(false)
const showAddUserInfoModal = () => {
	console.log(uploadInfoMap.uploadFileList);
	showAddUserInfo.value = true
	clearFormItem()
}

const handleBeforeClose = async () => {
	for (let val of uploadInfoMap.map.values()) {
		if (val.in != '-') {
			await http.post('/goforit/remove', { addr: val.in })
		}
		if (val.out != '-') {
			await http.post('/goforit/remove', { addr: val.out })
		}
		// problemInfo.value.caseFileList.push(val)
	}
	clearFormItem()
}

const editProblemInfoOk = async () => {
	if (!checkCase()) {
		msg.err('样例检查不通过，禁止提交');
		problemInfo.value.caseFileList.length = 0
		return
	}
	let postData = {
		info: {
			id: problemInfo.value.id,
			author: BigNumber(userInfo.value.id),
			title: problemInfo.value.title,// '',
			timeLimit: problemInfo.value.timeLimit,// 2000,
			cTimeLimit: problemInfo.value.cTimeLimit,// 1000,
			memoryLimit: problemInfo.value.memoryLimit,// 128,
			cMemoryLimit: problemInfo.value.cMemoryLimit,// 64,
			public: problemInfo.value.public,// 1,
			difficulty: problemInfo.value.difficulty,// 1,
			content: problemInfo.value.content,// '# 输入题目内容',
			caseIn: problemInfo.value.caseIn,// '',
			caseOut: problemInfo.value.caseOut,// ''
		}
	}
	// console.log(postData)
	msg.ok('正在提交');
	const { data } = await http.post('/problem/update', postData)
	if (data.code != 200) {
		msg.err(data.msg)
		return
	}
	msg.ok('修改题目信息成功')
	let ut = false
	if (problemInfo.value.tags.length != problembank.tagSet.size) {
		ut = true
	} else {
		for (let i = 0; i < problemInfo.value.tags.length; i++) {
			const item = problemInfo.value.tags[i];
			if (!problembank.tagSet.has(item.id)) {
				ut = true
				break
			}
		}
	}
	if (ut) {
		let tags = []
		problemInfo.value.tags.forEach((item) => {
			tags.push(item.id)
		})
		console.log(tags, problemInfo.value.id);
		const { data } = await http.post('/problem/update/tag', {
			problemId: problemInfo.value.id,
			tagIds: tags
		})
		if (data.code != 200) {
			msg.err(data.msg)
			return
		}
		msg.ok('修改题目标签成功')
	}
	if (problembank.content !== problemInfo.value.content) {

		const { data } = await http.post('/problem/update/content', {
			problemId: problemInfo.value.id,
			content: problemInfo.value.content
		})
		if (data.code != 200) {
			msg.err(data.msg)
			return
		}
		msg.ok('修改题目内容成功')
	}
	clearFormItem()
	getBlogList()
	showEditProblemModal.value = false
}


const addProblemInfoOk = async () => {
	if (!checkCase()) {
		msg.err('样例检查不通过，禁止提交');
		problemInfo.value.caseFileList.length = 0
		return
	}
	console.log(problemInfo.value.caseFileList);
	let postData = {
		info: {
			author: BigNumber(userInfo.value.id),
			title: problemInfo.value.title,// '',
			timeLimit: problemInfo.value.timeLimit,// 2000,
			cTimeLimit: problemInfo.value.cTimeLimit,// 1000,
			memoryLimit: problemInfo.value.memoryLimit,// 128,
			cMemoryLimit: problemInfo.value.cMemoryLimit,// 64,
			public: problemInfo.value.public,// 1,
			difficulty: problemInfo.value.difficulty,// 1,
			content: problemInfo.value.content,// '# 输入题目内容',
			caseIn: problemInfo.value.caseIn,// '',
			caseOut: problemInfo.value.caseOut,// ''
		},
		tags: [],
		caseFileList: problemInfo.value.caseFileList
	}
	problemInfo.value.tags.forEach((item) => {
		postData.tags.push({ problemId: 0, tagId: item.id })
	})
	console.log(postData)
	msg.ok('正在提交');
	const { data } = await http.post('/problem/add', postData)
	if (data.code != 200) {
		msg.err(data.msg)
		return
	}
	msg.ok('题目添加成功')
	clearFormItem()
	getBlogList()
	showAddUserInfo.value = false
}

const addProblemInfoCancel = () => {
	handleBeforeClose()
	showAddUserInfo.value = false
}

const editProblemInfoCancel = () => {
	clearFormItem()
	showEditProblemModal.value = false
}


const handleDeleteProblem = async (row) => {
	const { data } = await http.post('/problem/delete', {
		problemId: BigNumber(row.id) || 0,
		userId: BigNumber(userInfo.value.id)
	})
	// console.log(data)
	if (data.code != 200) {
		msg.err(data.msg)
		return
	}
	msg.ok('删除成功')
	getBlogList()
}

const problemList = ref([]);

const getBlogList = async () => {
	const { data } = await http.post('/blog/select',{
		currPage: pageInfo.currPage , 
		pageSize: pageInfo.pageSize,
		userId:BigNumber(store.getters.userInfo.id)
	})
	if (data.code != 200) {
		msg.err(data.msg)
		return
	}
	console.log(data);
	try {
		problemList.value = data.data.infos
		// pageInfo.total = data.data.total
	} catch (e) {
		problemList.value = []
		// pageInfo.total = 0
	}
}


const userInfo = ref({ userName: '' });



const tagSelect = ref({})

const getTagList = async () => {
	const { data: res } = await http.get('/problem/tags')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	tagSelect.value = res.data.tagList
}



onMounted(() => {
	userInfo.value = store.getters.userInfo
	getTagList()
	getBlogList()
	// console.log(new Date(1676400795548));

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


.vertical-center {
	display: flex;
	align-items: center;
}
</style>