<template>
    <Row :wrap="false" style="width:100%;min-height: calc(100vh - 172px);">
        <Col flex="auto">
        </Col>
        <Col flex="1000px">
        <Space direction="vertical" style="width: 100%;">

            <Card style="width: 100%;margin-top: 20px;border-radius: 10px;" :padding="20">
                <Row :wrap="false" style="width: 100%;">
                    <Col flex="130px">
                    <img :src="itemInfo.pic" style="width: 130px;height: 180px;">
                    </Col>
                    <Col flex="auto" style="padding-left: 20px;">
                    <Space direction="vertical" style="width: 100%;">
                        <div style="width: 100%;height:40px;">
                            <div style="float: left;display: flex;align-items: center;height: 40px;">
                                <Tag v-if="itemInfo.tag == 1" color="error" style="font-size: 12px;">新品</Tag>
                                <span style="font-size: 24px;font-weight: bolder;color: #333;">{{
                                    itemInfo.title
                                }}</span>
                            </div>
                            <div style="float: right;display: flex;align-items: center;height: 40px;">
                                <Rate show-text allow-half disabled v-model="itemInfo.rate" style="float: right;">
                                    <span style="color: #f5a623">{{ itemInfo.rate }}</span>
                                </Rate>
                            </div>
                        </div>
                        <Ellipsis :text="itemInfo.instruction" :lines="2" tooltip style="height: 40px;" />
                        <Space style="width: 100%;display: flex;align-items: center;">
                            <div style="height: 20px;">
                                <img :src="itemInfo.authorAvatar" style="width: 20px;height: 20px;border-radius: 25px;">
                            </div>
                            <span style="font-size: 14px;">{{ itemInfo.autherName }}</span>
                            <div>
                                <span style="font-size: 14px;">{{ itemInfo.position }}</span>
                                <span style="font-size: 14px;">@{{ itemInfo.company }}</span>
                            </div>
                        </Space>
                        <div style="margin-top: 10px;width: 100%;">
                            <Button type="primary" style="float: left;height: 40px;" shape="circle">
                                <Numeral style="font-size: 15px;color: #fff;" :value="itemInfo.priece" format="0,0.00">
                                    <template #prefix>
                                        <span>¥</span>
                                    </template>
                                </Numeral>
                                立即购买
                            </Button>
                            <Space style="display: flex;align-items: center;height: 40px;float: right;" split>
                                <span v-if="itemInfo.status == 1" style="font-size: 13px;">已完结</span>
                                <span v-else style="font-size: 13px;">未完结 </span>
                                <span> {{ itemInfo.problems }}题</span>
                                <span style="font-size: 13px;">{{ itemInfo.buyers }} 人已购买</span>
                                <span style="font-size: 16px;">
                                    <Icon type="ios-thumbs-up" :size="18" />{{ itemInfo.up }}
                                </span>
                                <span style="font-size: 16px;" :size="18">
                                    <Icon type="ios-thumbs-down" />{{ itemInfo.down }}
                                </span>
                            </Space>
                        </div>
                    </Space>
                    </Col>
                </Row>
            </Card>
            <Card style="width: 100%;border-radius: 10px;" :padding="20">
                <Space :wrap="false" style="margin-bottom: 20px;">
                    <div ref="mentListDom" v-for="(item, idx) in menuListData" @click="handleUserInfoPageClick(idx)"
                        class="top-btn">
                        <Icon :type="item.icon" style="margin-right: 3px;" />{{ item.name }}
                    </div>
                </Space>
                <RouterView></RouterView>
            </Card>
        </Space>
        </Col>
        <Col flex="auto">
        </Col>
    </Row>
</template>
<script setup name='CourseDetial'>
import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const itemInfo = ref({
    id: '223345566766',
    pic: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89f477c9e756448892dbbf1d1b2739c4~tplv-k3u1fbpfcp-no-mark:420:420:300:420.awebp?',
    title: 'Flutter 实战：正则匹配应用',
    instruction: '从思想分析到应用实践， Flutter 全平台玩转正则表达式 ~',
    tag: 1,
    authorAvatar: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
    autherName: '孟成祯',
    priece: 9.9,
    buyers: 20,
    status: 1,
    problems: 20,
    rate: 4.5,
    like: 66,
    up: 23,
    down: 3,
    position: '资深架构师',
    company: '字节跳动'
},);

const mentListDom = ref([])
const menuListData = ref([
    { name: '课程介绍', path: '/course/' + itemInfo.value.id + '/instruction', icon: 'md-paper' },
    { name: '排行', path: '/course/' + itemInfo.value.id + '/ranking', icon: 'md-podium' },
    { name: '学习', path: '/course/' + itemInfo.value.id + '/learn', icon: 'md-book' },
])

const handleUserInfoPageClick = (idx) => {
    if (mentListDom.value[idx].id == 'menu-item-active') {
        return
    }
    mentListDom.value.forEach((item, i) => {
        item.id = (i == idx) ? 'menu-item-active' : '';
    })
    router.push(menuListData.value[idx].path)
}

const updateByPath = (path) => {
    menuListData.value.forEach((item, i) => {
        mentListDom.value[i].id = (item.path == path) ? 'menu-item-active' : '';
    })
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

onMounted(() => {
    nextTick(() => {
        updateByPath(router.currentRoute.value.fullPath)
    })
})
</script>
<style scoped lang='less'>
.top-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 14px;
    color: #262626;
    background-color: #f2f3f4;
    border-radius: 25px;
    margin-right: 10px;
}

#menu-item-active {
    color: #fff;
    background: #2d8cf0;
}


</style>