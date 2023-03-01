<template>

	<!-- 遮罩层组件 -->
	<teleport to="body">
		<div v-if="flag === true" class="mask"> <!-- 设置遮罩层 -->
			<div class="container chuang">
				<div ref="form_box" class="form-box">
					<!-- 注册 -->
					<div ref="register_box" class="register-box hidden">
						<h1>注册账号</h1>
						<input type="text" placeholder="用户名">
						<input type="email" placeholder="邮箱">
						<input type="password" placeholder="密码">
						<input type="password" placeholder="确认密码">
						<div style="display:inline-block;">
							<input style="width:130px" type="password" placeholder="验证码">
							<button type="button" style="font-size: 8px;width:100px;margin-top: 10px;"
								@click="sendCode">获取验证码</button>
						</div>
						<button>注册</button>
					</div>
					<!-- 登录 -->
					<div ref="login" class="login-box">
						<div v-if="forget" class="login-box">
							<h1>登录</h1>
							<!-- <Input class="login-box-input" v-model="email" placeholder="Enter something..."  /> -->
							<input v-model="email" type="text" placeholder="邮箱/用户名">
							<input v-model="password" type="password" placeholder="密码" />
							<button @click="clickLogin">登录</button>
							<Text underline @click="forgetPwd" style="margin-top: 20px;color: #fff;" >忘记密码?</Text>
						</div>
						<div v-else class="login-box">
							<h1>修改密码</h1>
							<input type="email" placeholder="邮箱">
							<input type="password" placeholder="新密码">
							<input type="password" placeholder="确认密码">
							<div style="display:inline-block;">
								<input style="width:130px" type="password" placeholder="验证码">
								<button type="button" style="font-size: 8px;width:100px;margin-top: 10px;"
									@click="sendCode">获取验证码</button>
							</div>
							<Text underline @click="forgetPwd" style="margin-top: 20px;color: #fff;" >去登录</Text>
						</div>
					</div>
				</div>
				<div class="con-box left">
					<h2 class="title">
						欢迎来到
						<span>GoForIt</span>
					</h2>
					<img src="../../../assets/login-bg.jpeg" alt="" style="width: 128px;height: 128px;">
					<p>已有账号</p>
					<button id="login" @click="clickGoToLogin">去登录</button>
				</div>
				<div class="con-box right">
					<h2 class="title">
						欢迎来到
						<span>GoForIt</span>
					</h2>
					<img src="../../../assets/login-bg.jpeg" alt="" style="width: 128px;height: 128px;">
					<p>没有账号？</p>
					<button ref="register" id="register" @click="clickGoToRegister">去注册</button>
				</div>
			</div>
		</div>
	</teleport>
	<!-- <div class="main">

	</div> -->

</template>

<script setup name="LoginDialog">
import { ref,reactive } from 'vue'



const props = defineProps({
	flag: {
		type: Boolean
	}
})

// 在vue3通过ref的方式获取并且操作dom
const login = ref();
const register = ref();
const form_box = ref();
const register_box = ref();
const emits = defineEmits(['onLogin']);
const forget = ref(true);

// 忘记密码事件
const forgetPwd = () => {
	clearInput()
	forget.value = !forget.value
}

const email = ref('1767977452@qq.com');
const password = ref('123456');
const cpassword = ref('');
const code = ref('');

const clearInput = () => {
	email.value = ''
	password.value = ''
	cpassword.value = ''
	code.value = ''
}


// 去注册按钮点击事件
const clickGoToRegister = () => {
	form_box.value.style.transform = 'translateX(80%)';
	login.value.classList.add('hidden');
	register_box.value.classList.remove('hidden');
	clearInput()
}
// 去登录按钮点击事件

const clickGoToLogin = () => {
	form_box.value.style.transform = 'translateX(0%)';
	register_box.value.classList.add('hidden');
	login.value.classList.remove('hidden');
	clearInput()
}

const clickLogin = async () => {
	emits('onLogin', {email:email.value,password:password.value})

}


const sendCode = () => {
	console.log("SBSBSBSBSBSBSB")
}


</script>

<style scoped lang="less">
.mask {
	/* 遮罩层的写法 */
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: calc(100vh);
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	// overflow: auto;
	// display: none;
}

.chuang {
	z-index: 1001;
	width: 400px;
	height: 300px;
	text-align: center;
	border: 1px solid transparent;
	border-radius: 12px;
	background-color: red;
	margin: 15% auto;
}

.demo-login {
	width: 100%;
	margin: 0 auto !important;
}

.demo-auto-login {
	margin-bottom: 24px;
	text-align: left;
}

.demo-auto-login a {
	float: right;
}

// .main {
// 	/* 初始化 */
// 	margin: 0;
// 	padding: 0;
// 	/* 100%窗口高度 */
// 	height: 100vh;
// 	/* 弹性布局 水平+垂直居中 */
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	/* 渐变背景 */
// 	background: linear-gradient(200deg, #f3e7e9, #e3eeff);
// }

.container {
	background-color: #fff;
	width: 650px;
	height: 415px;
	/* 相对定位 */
	position: relative;
	border-radius: 5px;
	/* 阴影 */
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.form-box {
	/* 绝对定位 */
	position: absolute;
	top: -10%;
	left: 5%;
	background-color: #5cadff;
	width: 320px;
	height: 500px;
	border-radius: 5px;
	box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
	/* 动画过渡 加速后减速 */
	transition: 0.5s ease-in-out;
	z-index: 2;
	display: flex;
	justify-content: center;
	align-items: center;
}

.register-box,
.login-box {
	/* 弹性布局 垂直排列 */
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.hidden {
	display: none;
	/* 动画过渡 */
	transition: 0.5s;
}

h1 {
	text-align: center;
	margin-bottom: 25px;
	/* 转大写 */
	text-transform: uppercase;
	color: #fff;
	/* 字间距 */
	letter-spacing: 5px;
}


input {
	background-color: transparent;
	width: 70%;
	color: #fff;
	border: none;
	/* 下边框样式 */
	border-bottom: 1px solid rgba(255, 255, 255, 0.4);
	padding: 10px 0;
	text-indent: 10px;
	margin: 8px 0;
	font-size: 14px;
	letter-spacing: 2px;
}

input::placeholder {
	color: #fff;
}

input:focus {
	color: #fff;
	outline: none;
	border-bottom: 1px solid #a262ad80;
	transition: 0.5s;
}

input:focus::placeholder {
	opacity: 0;
}

.form-box button {
	width: 70%;
	margin-top: 35px;
	background-color: #f6f6f6;
	outline: none;
	border-radius: 8px;
	padding: 13px;
	color: #2db7f5;
	letter-spacing: 2px;
	border: none;
	cursor: pointer;
}

.form-box button:hover {
	border: 1px solid #f6f6f6;
	background-color: #2db7f5;
	color: #f6f6f6;
	transition: background-color 0.5s ease;
}

.con-box {
	width: 50%;
	/* 弹性布局 垂直排列 居中 */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* 绝对定位 居中 */
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}

.con-box.left {
	left: -2%;
}

.con-box.right {
	right: -2%;
}

.con-box h2 {
	color: #8e9aaf;
	font-size: 25px;
	font-weight: bold;
	letter-spacing: 3px;
	text-align: center;
	margin-bottom: 4px;
}

.con-box p {
	font-size: 12px;
	letter-spacing: 2px;
	color: #8e9aaf;
	text-align: center;
}

.con-box span {
	color: #5cadff;
}

.con-box img {
	width: 150px;
	height: 150px;
	opacity: 0.9;
	margin: 40px 0;
}

.con-box button {
	margin-top: 3%;
	background-color: #fff;
	color: #2db7f5;
	border: 1px solid #5cadff;
	padding: 6px 10px;
	border-radius: 5px;
	letter-spacing: 1px;
	outline: none;
	cursor: pointer;
}

.con-box button:hover {
	background-color: #5cadff;
	color: #fff;
}
</style>