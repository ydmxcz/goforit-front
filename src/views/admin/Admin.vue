<template>
    <div class="layout">
        <!-- 页面主体布局 -->
        <Layout style="height: 100%;">
            <!-- 侧边栏区域 -->
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="layout-logo">
                    <img v-if="isCollapsed === false" src="../../assets/goforit.png" @click="router.push('/admin/goforit')"
                        style="line-height: 64px;width: 100px;	height: 50px;">
                </div>
                <Menu theme="dark" width="auto" :class="menuitemClasses" accordion ref="sideMenu">
                    <Submenu :name="item.name" v-for="item in menuList" :class="menuitemClasses">
                        <template #title>
                            <Icon :type="item.icon" />
                            <span> {{ item.title }}</span>
                        </template>
                        <MenuItem :name="subitem.name" v-for="subitem in item.children" @click="adminPush(subitem.path)">
                        {{ subitem.title }}
                        </MenuItem>
                    </Submenu>
                </Menu>

            </Sider>
            <!-- 侧边栏右侧区域 -->
            <Layout>
                <!-- 右侧Header -->
                <Header :style="{ padding: 0 }" class="layout-header-bar">
                    <div v-if="userInfo.id == -1" style="display: flex;align-items: center;
                                				float: right;width: 230px;min-width: 230px;height: 64px;">
                        <Button @click="clickLogin" type="primary" style="float: left;">登录/注册</Button>
                    </div>
                    <!-- <div style="display: flex;"> -->
                    <div v-else style="height:64px;width:64px;width: 100%;">
                        <!-- Header最左侧图标 -->
                        <Icon @click="collapsedSider" :class="rotateIcon" style="margin: 20px; float: left;" type="md-menu"
                            size="24"></Icon>
                        <!-- Header右侧用户信息区域 -->
                        <Space class="user-info">
                            <Dropdown trigger="click" placement="bottom">
                                <div class="user-info-detial">
                                    <span class="user-name">{{ processUserNameOverflow(userInfo.userName) }}</span>
                                    <Avatar :src="userInfo.avatar" style="height: 35px;width: 35px;" />

                                </div>
                                <template #list>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <DropdownItem @click="logout">退出登录</DropdownItem>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </template>
                            </Dropdown>
                        </Space>
                    </div>
                    <!-- </div> -->
                </Header>
                <!-- Header以下 页面主要内容区域 -->
                <Content style="min-width: 700px;overflow-y: scroll;">
                    <div style="padding: 0 20px 20px 20px;">
                        <DynamicBreadcrumb></DynamicBreadcrumb>
                        <router-view />
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script setup name="Admin">
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import DynamicBreadcrumb from '../../components/common/DynamicBreadcrumb.vue';
import { useStore } from 'vuex';
import { Message } from 'view-ui-plus'
import http from '../../plugin/axios'
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import msg from '../../common/msg';
const store = useStore()
const router = useRouter();
const isCollapsed = ref(false)

// 侧边栏菜单的引用
const sideMenu = ref();
const menuList = reactive([
    // name字段用于对MenuItem进行active
    // title才是真正的显示的名字

    {
        icon: 'ios-navigate', name: '1', title: '题库管理', path: '',
        children: [
            { icon: '', name: '1-1', title: '题目列表', path: '/problem', children: null },
            { icon: '', name: '1-2', title: '题解管理', path: '/problemSolution', children: null },
            { icon: '', name: '1-3', title: '题目样例', path: '/problemCase', children: null },

        ]
    },
    {
        icon: 'ios-people', name: '2', title: '用户管理', path: '',
        children: [
            { icon: '', name: '2-2', title: '用户列表', path: '/user', children: null },
        ]
    },
    {
        icon: 'ios-stats', name: '3', title: '比赛管理', path: '',
        children: [
            { icon: '', name: '3-1', title: '竞赛列表', path: '/contest', children: null },
        ]
    },
    {
        icon: 'ios-stats', name: '4', title: '小组管理', path: '',
        children: [
            { icon: '', name: '4-1', title: '小组列表', path: '/group', children: null },

        ]
    },{
        icon: 'ios-stats', name: '5', title: '博客管理', path: '',
        children: [
            { icon: '', name: '4-1', title: '博客列表', path: '/blog', children: null },

        ]
    },
    // { icon: 'ios-navigate', name: '1-1', title: 'Option 1', path: '/userlist' },
])

const rotateIcon = computed({
    get() {
        return [
            'menu-item',
            isCollapsed.value ? 'collapsed-menu' : ''
        ]
    },
    set(value) {
    }
})

const menuitemClasses = computed({
    get() {
        return [
            'menu-item',
            isCollapsed.value ? 'collapsed-menu' : ''
        ]
    }
})


// 上一次展开的子菜单的index
let collapsedSiderLastIndex = -1

// 左侧菜单栏回调事件，通过dom控制左侧菜单栏的子菜单展开和关闭
const collapsedSider = () => {
    if (isCollapsed.value) {
        // 侧边栏展开，打开上一次子菜单
        if (collapsedSiderLastIndex !== -1) {
            sideMenu.value.submenuList[collapsedSiderLastIndex].submenu.opened = true
        }
    } else {
        // 侧边栏收起,关闭所有菜单，
        // 记住上次打开的哪一个子菜单，下一次侧边栏展开时将其打开
        collapsedSiderLastIndex = -1
        for (let i = 0; i < sideMenu.value.submenuList.length; i++) {
            if (sideMenu.value.submenuList[i].submenu.opened) {
                sideMenu.value.submenuList[i].submenu.opened = false
                collapsedSiderLastIndex = i
            }
        }
    }
    isCollapsed.value = !isCollapsed.value
}

const adminPush = (path) => {
    router.push('/admin/goforit' + path)
}

// 增加用户名处理函数，使得超出一定长度的名字的多余部分变成 '...'
const processUserNameOverflow = (value) => {
    if (!value) return "";
    if (value.length > 15) {
        return value.slice(0, 15) + "...";
    }
    return value;
}

const userInfo = ref({})

const logout = async () => {
    const { data: res } = await http.post('/user/logout', { userId: BigNumber(userInfo.value.id) })
    if (res.code != 200) {
        Message.error({ background: true, content: res.msg });
    } else {
        Message.success({ background: true, content: '用户退出登录' });
    }
    store.commit('userLogout', true)
    router.push('/admin/login')
}


// 设置第一个menuitem为默认激活的
onMounted(() => {
    userInfo.value = store.getters.userInfo
    if (userInfo.value.id == -1 || userInfo.value.roleId == -1) {
        // msg.err("无效用户信息或用户非管理员")
        logout()
    }
});
</script>
<style scoped lang="less">
.layout {
    // border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100vh;
    background-color: red;
}

.layout .ivu-menu {
    z-index: 0
}

.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);


}


.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}

.layout-logo {
    width: 100%;
    height: 64px;
    // 水平垂直居中
    display: flex;
    justify-content: center;
    align-items: center;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}

.menu-icon {
    transition: all .3s;
}

.user-info {
    width: 200px;
    min-width: 230px;
    height: 64px;
    float: right;

    .user-info-detial {
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

.rotate-icon {
    transform: rotate(-90deg);
}

.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}

.menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}

.collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
}

.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>