<template>
	<Card style="width:100%;height: 100%;">
		<Space style="width: 100%;" direction="vertical">
			<Space>
				<Input search enter-button="搜索" placeholder="Enter something..." />
				<Button type="primary" icon="md-add" @click="showAddUserInfoModal">添加用户</Button>
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
	<Modal v-model="showEditUserInfo" title="编辑用户信息" @on-ok="editUserInfoOk" @on-cancel="editUserInfoCancel" scrollable>

		<Form :model="formItem" :label-width="80">
			<FormItem label="用户ID">
				<span>{{ formItem.id }}</span>
			</FormItem>
			<FormItem label="用户名">
				<Input v-model="formItem.userName"></Input>
			</FormItem>
			<FormItem label="邮箱">
				<span>{{ formItem.email }}</span>
			</FormItem>
			<FormItem label="创建时间">
				<Time :time="(formItem.createTime / 1000) / 1000" type="datetime" />
			</FormItem>
			<FormItem label="年龄">
				<Row>
					<Col span="8">
					<Input v-model="formItem.age"></Input>
					</Col>
					<Col span="4" style="text-align: center">性别</Col>
					<Col span="11">
					<Select v-model="formItem.gender">
						<Option value="男">男</Option>
						<Option value="女">女</Option>
					</Select>
					</Col>
				</Row>
			</FormItem>
			<FormItem label="真实姓名">
				<Input v-model="formItem.real_name"></Input>
			</FormItem>
			<FormItem label="学号">
				<Input v-model="formItem.stuNumber"></Input>
			</FormItem>
			<FormItem label="学校">
				<Input v-model="formItem.school"></Input>
			</FormItem>
			<FormItem label="年级">
				<Row>
					<Col span="8">
					<Input v-model="formItem.grade"></Input>
					</Col>
					<Col span="4" style="text-align: center">专业</Col>
					<Col span="11">
					<Input v-model="formItem.major"></Input>
					</Col>
				</Row>
			</FormItem>
			<FormItem label="个人介绍">
				<Input v-model="formItem.instruction" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
					placeholder="Enter something..."></Input>
			</FormItem>
		</Form>
	</Modal>
	<Modal v-model="showAddUserInfo" title="创建新用户" @on-ok="addUserInfoOk" @on-cancel="addUserInfoCancel" scrollable>

		<Form :model="formItem" :label-width="80" :rules="ruleValidate">
			<FormItem label="用户ID">
				<span style="color: #ddd;">提交后由服务器生成</span>
			</FormItem>
			<FormItem label="用户名" prop="userName">
				<Input v-model="formItem.userName"></Input>
			</FormItem>
			<FormItem label="邮箱" prop="email">
				<Input v-model="formItem.email"></Input>
			</FormItem>
			<FormItem label="密码" prop="password">
				<Input v-model="formItem.password"></Input>
			</FormItem>
			<FormItem label="年龄">
				<Row>
					<Col span="8">
					<Input v-model="formItem.age"></Input>
					</Col>
					<Col span="4" style="text-align: center">性别</Col>
					<Col span="11">
					<Select v-model="formItem.gender">
						<Option value="男">男</Option>
						<Option value="女">女</Option>
					</Select>
					</Col>
				</Row>
			</FormItem>
			<FormItem label="真实姓名">
				<Input v-model="formItem.real_name"></Input>
			</FormItem>
			<FormItem label="学号">
				<Input v-model="formItem.stuNumber"></Input>
			</FormItem>
			<FormItem label="学校">
				<Input v-model="formItem.school"></Input>
			</FormItem>
			<FormItem label="年级">
				<Row>
					<Col span="8">
					<Input v-model="formItem.grade"></Input>
					</Col>
					<Col span="4" style="text-align: center">专业</Col>
					<Col span="11">
					<Input v-model="formItem.major"></Input>
					</Col>
				</Row>
			</FormItem>
			<FormItem label="个人介绍">
				<Input v-model="formItem.instruction" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
					placeholder="输入个人介绍..."></Input>
			</FormItem>
		</Form>
	</Modal>

</template>
<script setup name="UserManage">
import { ref, reactive, onMounted } from 'vue'
import http from '../../../plugin/axios';
import { Message } from 'view-ui-plus';
const pageInfo = reactive({
	curr: 1,
	pageSize: 15,
	total: 100
})

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
const formItem = ref({
	id: 0,
	status: 0,
	age: 0,
	stuNumber: 0,
	createTime: 0,
	gender: 0,
	grade: '',
	userName: '',
	avatar: '',
	real_name: '',
	school: '',
	major: '',
	instruction: '',
	email: ''
})


const showEditUserInfo = ref(false)
const showEditUserInfoModal = (row) => {
	showEditUserInfo.value = true
	formItem.value = row
}

const editUserInfoOk = async () => {
	let d = {
		age: Number(formItem.value.age || 0),
		id: formItem.value.id || 0,
		status: Number(formItem.value.status || 0),
		grade: Number(formItem.value.grade || 0),
		stuNumber: Number(formItem.value.stuNumber || 0),
		createTime: formItem.value.createTime || 0,
		gender: formItem.value.gender || '',
		userName: formItem.value.userName || '',
		avatar: formItem.value.avatar || '',
		real_name: formItem.value.real_name || '',
		school: formItem.value.school || '',
		major: formItem.value.major || '',
		instruction: formItem.value.instruction || '',
		email: formItem.value.email || ''
	}
	console.log(d);
	const { data } = await http.post('/user/updateinfo', d)
	if (data.code != 200) {
		Message.error({ background: true, content: data.msg });
		return 
	}
	Message.success({ background: true, content: '修改成功' });
	getUserList()
	clearFormItem()
	showEditUserInfo.value = false
}

const editUserInfoCancel = () => {
	clearFormItem()
}

const clearFormItem = () => {
	formItem.value = {
		id: 0,
		status: 0,
		age: 0,
		stuNumber: 0,
		createTime: 0,
		gender: 0,
		grade: '',
		userName: '',
		avatar: '',
		real_name: '',
		school: '',
		major: '',
		instruction: '',
		email: ''
	}
}


const showAddUserInfo = ref(false)
const showAddUserInfoModal = () => {
	showAddUserInfo.value = true
	clearFormItem()
}

const addUserInfoOk = async () => {
	let d = {
		age: Number(formItem.value.age || 0),
		id: formItem.value.id || 0,
		status: Number(formItem.value.status || 0),
		grade: Number(formItem.value.grade || 0),
		stuNumber: Number(formItem.value.stuNumber || 0),
		createTime: formItem.value.createTime || 0,
		gender: formItem.value.gender || '',
		userName: formItem.value.userName || '',
		avatar: formItem.value.avatar || '',
		real_name: formItem.value.real_name || '',
		school: formItem.value.school || '',
		major: formItem.value.major || '',
		instruction: formItem.value.instruction || '',
		email: formItem.value.email || ''
	}
	console.log(d);
	const { data } = await http.post('/user/add', {
		userInfo: d,
		password: formItem.password || ''
	})
	if (data.code != 200) {
		Message.error({ background: true, content: data.msg });
		return 
	}
	Message.success({ background: true, content: '添加成功' });
	getUserList()
	showEditUserInfo.value = false
	clearFormItem()
}
const addUserInfoCancel = () => {
	clearFormItem()
}

const handleDeleteUser = async (row) => {
	// return
	const { data } = await http.post('/user/delete', {
		UserId: row.id || 0,
	})
	if (data.code != 200) {
		Message.error({ background: true, content: data.msg });
	}
	Message.success({ background: true, content: '删除成功' });
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


onMounted(() => {
	getUserList()
	console.log(new Date(1676400795548));

})

const ruleValidate = reactive({
	userName: [
		{ required: true, message: '姓名不能为空', trigger: 'blur' }
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

</style>