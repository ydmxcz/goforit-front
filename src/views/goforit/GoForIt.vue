<template>
	<div ref="rootPage">
		<!-- 网站顶部导航栏 -->
		<div class="topbar">
			<!-- 左侧图片 -->
			<div style="padding-left: 10px;padding-right: 10px;">
				<img class="top-pic" src="../../assets/goforit.png">
			</div>
			<!-- 菜单栏按钮 -->
			<div class="top-menu" ref="menuRef" :style="topMenuMinWidth">
				<div class="menu-item" v-for="(item, idx) in menuList" @click="clickTopMenu(item, idx)">
					<span>{{ item.title }}</span>
				</div>
			</div>
			<div v-if="userInfo.id == -1" style="display: flex;align-items: center;
				float: right;width: 230px;min-width: 230px;height: 50px;">
				<Button @click="clickLogin" type="primary" style="float: left;">登录/注册</Button>
			</div>

			<!-- 右侧用户信息区域 -->
			<div v-else class="user-info">
				<!-- 未读消息去按钮 -->
				<Dropdown trigger="click" placement="bottom">
					<Badge dot class="user-unread-message">
						<Icon type="ios-notifications-outline" size="26"></Icon>
					</Badge>
					<template #list>
						<DropdownMenu>
							<DropdownItem @click="$router.push('/msg/system')">系统信息</DropdownItem>
							<DropdownItem @click="$router.push('/msg/attention')">系统信息</DropdownItem>
							<DropdownItem @click="$router.push('/msg/like')">点赞</DropdownItem>
							<DropdownItem @click="$router.push('/msg/comment')">评论</DropdownItem>
							<DropdownItem @click="$router.push('/msg/collection')">收藏</DropdownItem>
						</DropdownMenu>
					</template>
				</Dropdown>

				<Dropdown trigger="click" placement="bottom">
					<div class="user-info-detial">
						<span class="user-name">{{ processUserNameOverflow(userInfo.userName) }}</span>
						<Avatar :src="userInfo.avatar" style="height: 35px;width: 35px;" />
					</div>
					<template #list>
						<DropdownMenu>
							<DropdownItem @click="$router.push('/user/1234567891123/recentlyPass')">我的主页</DropdownItem>
							<DropdownItem @click="$router.push('/profile')">我的信息</DropdownItem>
							<DropdownItem divided @click="logout">退出登录</DropdownItem>
						</DropdownMenu>
					</template>
				</Dropdown>
			</div>
		</div>
		<!-- 网站主要内容区域 -->
		<div class="main-area">
			<!-- <transition >
				<RouterView></RouterView>
			</transition> -->
			<router-view v-slot="{ Component }">
				<transition name="fade">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
		<!-- 全局页脚 -->
		<GlobalFooter :links="globalFooterLinks" :copyright="globalFooterCopyright" />
		<!-- 登录对话框 -->
		<LoginDialog :flag="loginDialogShow" @on-login="onSuccessLogin"></LoginDialog>
</div>
</template>
<script setup name="GoForIt">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import http from '../../plugin/axios.js'
import { useStore } from 'vuex';
import LoginDialog from '../../components/goforit/login/LoginDialog.vue';
import { Message } from 'view-ui-plus'

// TODO:增加登录验证和用户信息处理功能
const store = useStore()
const rootPage = ref()
const loginDialogShow = ref(false)

const clickLogin = () => {
	loginDialogShow.value = !loginDialogShow.value
}
// 登录成功回调函数，清除根节点的样式
const onSuccessLogin = (flag) => {
	console.log("AAA", flag);
	loginDialogShow.value = flag
	userInfo.value = store.getters.userInfo
}

const menuList = ref([
	{ path: "/home", name: "Home", title: '首页', },
	{ path: "/problems", name: "Problems", title: '题库', },
	{ path: "/competition", name: "Competition", title: '竞赛', },
	{ path: "/group", name: "Group", title: '小组', },
	{ path: "/blog", name: "Blog", title: '博客', },
	{ path: "/courses", name: "Course", title: '课程', },
])

const userInfo = ref({})




// 绑定菜单dom的引用
const menuRef = ref();
const $router = useRouter();
// /problems/all /problems
// 动态更新导航栏选中时样式
const updateMenuActive = (currPath) => {
	for (let i = 0; i < menuList.value.length; i++) {
		if (menuList.value[i].path == currPath.slice(0, menuList.value[i].path.length)) {
			menuRef.value.children[i].id = 'active-item';
		} else {
			menuRef.value.children[i].id = '';
		}
	}
}

// 增加用户名处理函数，使得超出一定长度的名字的多余部分变成 '...'
const processUserNameOverflow = (value) => {
	if (!value) return "";
	if (value.length > 15) {
		return value.slice(0, 15) + "...";
	}
	return value;
}
const topMenuMinWidth = ref('min-width: ' + (menuList.value.length * 100) + 'px;');



// 检查当前用户是否登录
const checkLogin = (path) => {
	if (userInfo.id != -1) {
		return
	}
	let f = false
	for (let i = 0; i < menuList.value.length; i++) {
		if (menuList.value[i].path == path) {
			f = true
			break
		}
	}
	if (!f) {
		if (path == '/problems/all' || path == '/blog/all') {
			return
		}
		loginDialogShow.value = true
	}
}

const hello = async () => {
	userInfo.value = store.getters.userInfo
	// const { data } = await http.get('/user/hello')
	// console.log('aaa', userInfo.value)
}

const logout = async () => {
	const { data } = await http.post('/user/logout', { userId: userInfo.value.id })
	console.log(data);
	if (data.code == 200) {
		Message.success({
			background: true,
			content: data.data.userName + ' 退出登录'
		});
	}
	store.commit('userLogout', null)
	userInfo.value = store.getters.userInfo
}


// 设置第一个menuitem为默认激活的
onMounted(() => {
	hello()
	checkLogin($router.currentRoute.value.path)
	updateMenuActive($router.currentRoute.value.path)
});

watch(
	// 监听router.path的变化
	() => $router.currentRoute.value.path,
	(newPath) => {
		// console.log(newPath)
		if (newPath == undefined) {
			return
		}
		checkLogin(newPath)
		updateMenuActive(newPath)
	},
	{ immediate: false }
);

const clickTopMenu = (item, idx) => {
	// 进行路由跳转
	$router.push(item.path)
}

const globalFooterLinks = reactive([
	{
		key: '帮助',
		title: '帮助',
		href: 'https://www.baidu.com',
		blankTarget: true
	},
	{
		key: 'github',
		icon: 'logo-github',
		href: 'https://www.baidu.com',
		blankTarget: true
	},
	{
		key: '条款',
		title: '条款',
		href: 'www.baidu.com',
		blankTarget: true
	}
])

const globalFooterCopyright = ref('Copyright © 2022 GoForIt Rights Reserved')

</script>

<style scoped lang='less'>
.main-area {
	width: 100%;
	min-width: 1200px;
	background-color: #f7f8fa;
}

.topbar {
	display: flex;
	width: 100%;
	/* background-color: aqua; */
	height: 50px;

	.top-pic {
		width: 100px;
		height: 50px;
	}


	.top-menu {
		// 主页顶栏高70px
		height: 50px;
		width: 100%;

		.menu-item {
			cursor: pointer;
			width: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			float: left;
			height: 100%;
			/* margin-left: 10px; */
		}

		.menu-item:hover {
			color: #2d8cf0;
			border-bottom: 3px solid #2d8cf0;
			/* color: red; */
		}
	}

	.user-info {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 230px;
		min-width: 230px;
		height: 50px;
		float: right;

		.user-unread-message {
			cursor: pointer;
			margin-top: 5px;
		}

		.user-info-detial {
			cursor: pointer;
			display: flex;
			align-items: center;

			.user-name {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 50px;
				margin-right: 5px;
				width: 150px;
				text-align: center;
				max-width: 150px;
				overflow: hidden;
			}

			.user-avator-badge {
				font-size: 6 !important;
				background: #5cb85c !important;
			}
		}

		// .user-avator {
		// 	margin-top: 5px;
		// }
	}
}

#active-item {
	color: #2d8cf0;
	border-bottom: 3px solid #2d8cf0;
}
</style>
