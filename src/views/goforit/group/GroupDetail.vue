<template>
    <Row :wrap="false" class="groupinfo-page">
        <Col flex="auto">
        </Col>
        <Col flex="1200px" class="middle-area">
        <Space direction="vertical" style="width: 100%;">
            <div class="page-header">
                <Row :wrap="false">
                    <Col flex="120px">
                    <Avatar shape="square" icon="md-people" size="80" />
                    </Col>
                    <Col flex="auto">
                    <Space direction="vertical" style="width: 100%;">
                        <Space :wrap="false" class="group-base-top" split>
                            <span style="font-size:20px;height: 20px;">{{ groupInfo.groupname }}</span>
                            <!-- <span style="font-size:14px;">ID:{{ groupInfo.id }}</span> -->
                        </Space>
                        <!-- <div class="group-info-introduce">
                            <Ellipsis :text="'团队介绍：' + groupInfo.instruction" :lines="1" tooltip />
                        </div> -->
                        <div class="group-info-bot">
                            <div style="float: left;">
                                <Space :wrap="false">
                                    <span>
                                        <Icon style="margin-right: 5px;" type="md-information-circle" size="20" />
                                        <span>ID：{{ groupInfo.id }}</span>
                                    </span>
                                    <!-- <span>
                                        <Icon style="margin-right: 5px;" type="ios-contacts" size="20" />
                                        <span>人数：{{ groupInfo.number }}</span>
                                    </span>
                                    <span>
                                        <Icon style="margin-right: 5px;" type="md-bonfire" size="20" />
                                        <span>活跃度：{{ groupInfo.active }}</span>
                                    </span> -->
                                </Space>
                            </div>
                            <Button v-if="groupInfo.status == 1" style="float: right;" shape="circle" type="error"
                                icon="md-close">退出团队</Button>
                            <Button v-else-if="groupInfo.public == 1 && groupInfo.status == 0" style="float: right;"
                                shape="circle" type="primary" icon="md-add">加入</Button>
                            <Button v-else-if="groupInfo.public == 0 && groupInfo.status == 0" style="float: right;"
                                shape="circle" type="primary" icon="md-add">申请加入</Button>
                            <Button v-else style="float: right;" shape="circle" type="primary" icon="md-add"
                                disabled>加入</Button>
                        </div>

                    </Space>
                    </Col>
                </Row>
            </div>
            <Row :wrap="false">
                <Col flex="250px" class="middle-left">
                <Space direction="vertical" style="width:100%;">
                    <!-- <Card style="width: 100%;border-radius: 15px;"> -->
                    <Row :wrap="false" style="text-align: center;font-size: 14px;">
                        <Col flex="12">
                        <Icon style="margin-right: 5px;" type="ios-contacts" size="20" />团队成员</Col><span
                            style="color: #abacaf;">|</span>
                        <Col flex="12">
                        <Icon style="margin-right: 5px;" type="md-bonfire" size="20" />活跃度</Col>
                    </Row>
                    <Row :wrap="false" style="text-align: center;font-size: 12px;">
                        <Col flex="12">9</Col>
                        <Col flex="12">6</Col>
                    </Row>
                    <!-- </Card> -->
                    <!-- <Card style="width: 100%;border-radius: 15px;"> -->
                    <Divider class="left-divider" />

                    <div class="left-title">
                        <h3>团队介绍</h3>
                    </div>
                    <div style="width: 100%;">
                        <Ellipsis :text="groupInfo.instruction" :lines="2" tooltip />
                    </div>
                    <Divider class="left-divider" />
                    <!-- </Card>
                    <Card style="width: 100%;border-radius: 15px;"> -->
                    <div class="left-title">
                        <h3>团队数据</h3>
                    </div>
                    <Space direction="vertical" :size="20">
                        <Space direction="vertical" :size="2">
                            <span style="font-size: 14px;">
                                <Icon type="md-eye" style="margin-right: 5px;" color="#2d8cf0" :size="18" />比赛总次数：0
                            </span>
                            <span style="padding: 30px;font-size:12px;">近期：0</span>
                        </Space>
                        <Space direction="vertical" :size="3">
                            <span style="font-size: 14px;">
                                <Icon type="md-thumbs-up" style="margin-right: 5px;" color="#19be6b" :size="18" />
                                训练总次数：0
                            </span>
                            <span style="padding: 30px;font-size:12px;">近期：0</span>
                        </Space>
                        <Space direction="vertical" :size="3">
                            <span style="font-size: 14px;">
                                <Icon type="md-star" style="margin-right: 5px;" color="#ff9900" :size="18" />讨论数量：0
                            </span>
                            <span style="padding: 30px;font-size:12px;">近期：0</span>
                        </Space>
                    </Space>
                    <Divider class="left-divider" />
                    <!-- </Card> -->
                    <!-- <Card style="width: 100%;border-radius: 15px;"> -->
                    <div class="left-title">
                        <h3>算法标签</h3>
                    </div>
                    <Space :wrap="false">
                        <div class="group-top-lang-item">
                            <div class="group-top-lang-left">Go</div>
                            <div class="group-top-lang-left">C++</div>
                            <div class="group-top-lang-left">Java</div>
                            <div class="group-top-lang-left">Python3</div>
                            <div class="group-top-lang-left">Rust</div>

                        </div>
                    </Space>
                    <Divider class="left-divider" />
                    <!-- </Card>
                    <Card style="width: 100%;border-radius: 15px;"> -->
                    <div class="left-title">
                        <h3>团队成员</h3>
                    </div>
                    <div style="width: 100%;padding-left: 20px;">
                        <AvatarList :list="avatorList.list" :max="10" :excess-style="avatorList.excessStyle" />
                    </div>
                    <!-- </Card> -->
                </Space>

                </Col>
                <Col flex="auto">
                <!-- <Card class="middle-right"> -->
                <Space class="middle-right">
                    <div ref="mentListDom" v-for="(item, idx) in menuListData" @click="handleUserInfoPageClick(idx)"
                        class="top-btn">
                        <Icon :type="item.icon" style="margin-right: 3px;" />{{ item.name }}
                    </div>
                </Space>
                <div style="width: 100%;margin-top: 20px;">
                    <RouterView></RouterView>
                </div>
                <!-- </Card> -->
                </Col>
            </Row>
        </Space>
        </Col>
        <Col flex="auto">
        </Col>
    </Row>
</template>
<script setup name="GroupDetail">
import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const groupInfo = reactive({
    groupname: 'EdmundShelby',
    instruction: '你好hhhhhhhhhhh',
    id: '12345678912341',
    number: 999,
    active: 666,
    public: 0, 
    status: 0,
})

const avatorList = reactive({
    excessStyle: {
        color: '#f56a00',
        backgroundColor: '#fde3cf'
    },
    list: [
        {
            src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
            tip: '史蒂夫·乔布斯'
        },
        {
            src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
            tip: '斯蒂夫·沃兹尼亚克'
        },
        {
            src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
            tip: '乔纳森·伊夫'
        },
        {
            src: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
            tip: '蒂姆·库克'
        },
        {
            src: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
            tip: '比尔·费尔南德斯'
        }, {
            src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
            tip: '史蒂夫·乔布斯'
        },
        {
            src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
            tip: '斯蒂夫·沃兹尼亚克'
        },
        {
            src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
            tip: '乔纳森·伊夫'
        },
        {
            src: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
            tip: '蒂姆·库克'
        },
        {
            src: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
            tip: '比尔·费尔南德斯'
        }, {
            src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
            tip: '史蒂夫·乔布斯'
        },
        {
            src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
            tip: '斯蒂夫·沃兹尼亚克'
        },
        {
            src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
            tip: '乔纳森·伊夫'
        },
        {
            src: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
            tip: '蒂姆·库克'
        },
        {
            src: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
            tip: '比尔·费尔南德斯'
        }
    ]
});
const mentListDom = ref([])
const menuListData = ref([
    { name: '训练任务', path: '/group/' + groupInfo.id + '/train', icon: 'ios-podium' },
    { name: '团队比赛', path: '/group/' + groupInfo.id + '/competition', icon: 'md-paper' },
    { name: '团队成员', path: '/group/' + groupInfo.id + '/numbers', icon: 'md-book' },
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

<style scoped lang="less">
.groupinfo-page {
    width: 100%;


    .middle-area {
        min-width: 1200px;
        margin-bottom: 20px;


        .page-header {
            // background-color: green;
            width: 100%;
            margin-top: 40px;
            padding: 10px;

            .group-base-top {
                display: flex;
                align-items: center;
            }

            .group-info-instruction {
                width: 100%;
                // margin-top: 16px;
            }

            .group-info-bot {
                width: 100%;
                margin-top: 16px;
            }
        }

        .middle-left {
            padding: 0px 10px 0px 0px;

            .left-divider {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .left-title {
                padding-left: 5px;
                border-left: 3px solid #2d8cf0;
                margin-bottom: 10px;
            }

            .group-top-lang-item {
                width: 100%;
                padding: 5px;

                .group-top-lang-left {
                    font-size: 12px;
                    background-color: #f2f3f4;
                    border-radius: 10px;
                    float: left;
                    padding-left: 6px;
                    padding-right: 6px;
                    color: #abacaf;
                    margin-right: 20px;
                    margin-bottom: 10px;
                }

                .group-top-lang-right {
                    float: right;
                    font-size: 12px;
                }
            }


        }

        .middle-right {
            width: 100%;
            // border-radius: 15px;

            .top-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 20px;
                font-size: 14px;
                color: #262626;
                background-color: #f2f3f4;
                border-radius: 25px;
            }
        }

    }
}


#menu-item-active {
    color: #fff;
    background: #515a6e;
}
</style>