<template>
    <Row :wrap="false" class="profile-page">
        <Col flex="3">
        </Col>
        <Col flex="1000px">
        <Row :wrap="false" class="middle-area">
            <Col flex="200px" class="left-area">
            <Space direction="vertical" style="width: 100%;">
                <Space direction="vertical" style="width: 100%;" align="center">
                    <Avatar shape="square" icon="ios-person" size="80" />
                    <span>edmund</span>
                </Space>
                <Divider class="left-divider"></Divider>
                <Space v-for="item in leftItems" direction="vertical" style="width: 100%;">
                    <div ref="leftMenuSideDom" class="left-item " v-for="subItem in item.children" @click="handleLeftItemClick(subItem.path)">
                        <Icon :type="subItem.icon" style="margin-right: 5px;" /> {{ subItem.name }}
                    </div>
                    <Divider class="left-divider-item"></Divider>
                </Space>
            </Space>
            </Col>
            <Col flex="auto" style="width: 100%;">
                <RouterView />  
            <!-- <Card style="width: 100%;">
            </Card> -->
            </Col>

        </Row>
        </Col>
        <Col flex="3">
        </Col>
    </Row>
</template>
<script setup name='Profile'>
import { Avatar, Divider, Icon } from 'view-ui-plus';
import { ref, reactive, onMounted,watch,nextTick } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const leftItems = ref([
    {
        children: [
            // { name: '收藏夹', path: '/profile/collection', icon: 'md-star' },
            { name: '我的题解', path: '/profile/solution', icon: 'md-star' },
            { name: '我的博客', path: '/profile/blog', icon: 'md-star' },
            { name: '做题分析', path: '/profile/process', icon: 'md-star' },
        ]
    },
    {
        children: [
            { name: '积分', path: '/profile/points', icon: 'md-star' },
            { name: '优惠券', path: '/profile/coupons', icon: 'md-star' },
            { name: '订单', path: '/profile/order', icon: 'md-star' },
        ]
    },
    {
        children: [
            { name: '个人资料', path: '/profile/info', icon: 'md-star' },
            { name: '账号安全', path: '/profile/account', icon: 'md-star' },
        ]
    },
])

const handleLeftItemClick = (path) => {
    console.log(path);
    router.push(path)
    updateByPath(path)
}

watch(
	// 监听router.path的变化
	() => router.currentRoute.value.fullPath,
	(newPath) => {
		if (newPath == undefined) {
			return
		}
		// store.commit('updateCurrPath', newPath)
		updateByPath(newPath)
	},
	{ immediate: false }
);
const leftMenuSideDom = ref([]);

const updateByPath = (path) => {
    let i  =0
    leftItems.value.forEach((item)=>{
        item.children.forEach((subItem,)=>{
            leftMenuSideDom.value[i].id = (subItem.path == path) ? 'active-item' : '';
            i++
        })
    })
}



onMounted(() => {
	nextTick(() => {
		updateByPath(router.currentRoute.value.fullPath)
	})
	// 绘制折线图
})
</script>
<style scoped lang='less'>
.profile-page {
    width: 100%;
    // min-height: calc(100vh - 50px);
    .middle-area {

        margin-top: 40px;
        margin-bottom: 20px;

        .left-area {
            width: 100%;
            padding-right: 20px;

            .left-item {
                text-align: center;
                width: 100%;
                padding: 10px 14px;
                font-size: 14px;
                display: flex;
                align-items: center;
                color: #8c8c8c;
            }

            .left-item:hover {
                background-color: #edeef0;
                color: #5384fe;
                border-radius: 10px;
            }

            .left-divider {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .left-divider-item {
                margin-top: 5px;
                margin-bottom: 5px;
            }
        }
    }
}


.elem-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

#active-item {
    background-color: #edeef0;
    color: #5384fe;
    border-radius: 10px;
}
</style>