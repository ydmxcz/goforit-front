<template>
    <div class="bg-img2"></div>
    <div class="bg-img"></div>
    <div class="main">
        <div class="container chuang">
            <div ref="form_box" class="form-box">
                <!-- 注册 -->
                <div ref="register_box" class="register-box hidden">
                    <h1>修改密码</h1>
                    <input type="email" v-model="email" placeholder="邮箱">
                    <input type="password" v-model="password" placeholder="密码">
                    <input type="password" v-model="confirmPassword" placeholder="确认密码">
                    <div style="display:inline-block;">
                        <input style="width:130px" v-model="code" placeholder="验证码">
                        <button type="button" style="font-size: 8px;width:100px;margin-top: 10px;"
                            v-if="!smsCode.is_disabled" @click="sendCode">{{ smsCode.content }}</button>
                        <button type="button" style="font-size: 8px;width:100px;margin-top: 10px;"
                            v-if="smsCode.is_disabled">{{ smsCode.content }}</button>
                    </div>
                    <button @click="clickUpdatePassword">提交</button>
                </div>
                <!-- 登录 -->
                <div ref="login" class="login-box">
                    <h1>登录</h1>
                    <input v-model="email" type="text" placeholder="邮箱/用户名">
                    <input v-model="password" type="password" placeholder="密码" />
                    <button @click="clickLogin">登录</button>
                </div>
            </div>
            <div class="con-box left">
                <h2 class="title">
                    欢迎来到
                    <span>GoForIt</span>
                </h2>
                <img src="../../../assets/login-bg.jpeg" alt="" style="width: 128px;height: 128px;">
                <p>已有账号</p>
                <button id="login" @click="moveToLogin">去登录</button>
            </div>
            <div class="con-box right">
                <h2 class="title">
                    欢迎来到
                    <span>GoForIt</span>
                    <br />后台管理系统
                </h2>
                <img src="../../../assets/login-bg.jpeg" alt="" style="width: 128px;height: 128px;">
                <button ref="register" id="register" @click="moveToRegister">忘记密码</button>
            </div>
        </div>
</div>
</template>

<script setup name="AdminLogin">
import { ref, reactive } from 'vue'
import http from '../../../plugin/axios.js'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import msg from '../../../common/msg.js'
const router = useRouter();
const store = useStore()
// 在vue3通过ref的方式获取并且操作dom
const login = ref();
const register = ref();
const form_box = ref();
const register_box = ref();

const email = ref('1767977452@qq.com');
const password = ref('123456');
const confirmPassword = ref('');
const code = ref('');

const clearInput = () => {
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    code.value = ''
}

const smsCode = reactive({
    is_disabled: false, //控制按钮是否可以点击（false:可以点击，true:不可点击）
    content: '获取验证码', // 发送验证码按钮的初始显示文字
    timer: null,
    count: '',
    model: {},
})


// 去注册按钮点击事件
const moveToRegister = () => {
    form_box.value.style.transform = 'translateX(80%)';
    login.value.classList.add('hidden');
    register_box.value.classList.remove('hidden');
    clearInput()
}
// 去登录按钮点击事件

const moveToLogin = () => {
    form_box.value.style.transform = 'translateX(0%)';
    register_box.value.classList.add('hidden');
    login.value.classList.remove('hidden');
    clearInput()
}


const clickLogin = async () => {
    //提取data重命名res
    const { data: res } = await http.post("/user/login", { email: email.value, password: password.value })
    //const {data: res} = await this.$http.post("login",{"username": this.loginForm.username,"password": this.loginForm.password})
    //this.loginForm);//POST
    if (res.code !== 200) {

        msg.err(res.msg);
        return
    }
    msg.ok('登录成功，欢迎' + res.data.userName)
    store.commit('userLoginSuccess', res.data)
    await router.push('/admin/goforit');
}

const clickUpdatePassword = async () => {
    if (password.value != confirmPassword.value) {
        msg.err('两次密码不一致');
        return
    }
    //提取data重命名res
    const { data: res } = await http.post("/user/updatepwd", { email: email.value, code: code.value })
    //const {data: res} = await this.$http.post("login",{"username": this.loginForm.username,"password": this.loginForm.password})
    //this.loginForm);//POST
    if (res.code !== 200) {
        msg.err(res.msg);
        return
    }
    msg.ok('修改密码成功');
}

const sendCode = async () => {

    // 请求后台发送验证码至手机
    if (email.value === '') {
        msg.err('邮箱不能为空');
        return
    }
    var emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailRegExp.test(email.value)) {
        msg.err('邮箱不合法');
        return
    }

    const { data: res } = await http.get("/user/sendcode?email=" + email.value)
    if (res.code != 200) {
        msg.err('验证码发送失败');
        return
    } else {
        msg.ok('验证码发送成功');
    }
    // 控制倒计时及按钮是否可以点击
    const TIME_COUNT = 60
    smsCode.count = TIME_COUNT
    smsCode.timer = window.setInterval(() => {
        if (smsCode.count > 0 && smsCode.count <= TIME_COUNT) {
            // 倒计时时不可点击
            smsCode.is_disabled = true
            // 计时秒数
            smsCode.count--
            // 更新按钮的文字内容
            smsCode.content = smsCode.count + 's后获取'
        } else {
            // 倒计时完，可点击
            smsCode.is_disabled = false
            // 更新按钮文字内容
            smsCode.content = '获取验证码'
            // 清空定时器!!!
            clearInterval(smsCode.timer)
            smsCode.timer = null
        }
    }, 1000)

}


</script>

<style scoped lang="less">
.bg-img {
    background: url("../../../assets/bg.svg");
    // background-color :#ddd;//linear-gradient(200deg,#4b93ff, #f3e7e9 );
    background-size: cover;
    // background-repeat: no-repeat center;
    height: 100vh;
    position: fixed;
    width: 100vw;
}

.bg-img2 {
    // background: url("../../../assets/bg.svg");
    background: linear-gradient(500deg, #67a2fa, #32ded4);
    background-size: cover;
    background-repeat: no-repeat center;
    height: 100vh;
    position: fixed;
    width: 100vw;
}

.chuang {
    // z-index: 1001;
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

.main {
    /* 初始化 */
    margin: 0;
    padding: 0;
    /* 100%窗口高度 */
    height: 100vh;
    /* 弹性布局 水平+垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 渐变背景 */
    // background: url(../../../assets/bg.svg);
    // background-size: 100% 100%;
    // width: 100vw;
}

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