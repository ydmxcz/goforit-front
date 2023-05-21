<template>
    <div style="width: 100%;">
        <!-- <Space style="width: 100%;" direction="vertical">
            <Space>
                <span>搜索题目：</span>
                <Input search enter-button="搜索" placeholder="输入标题或题目内容" style="width: 300px;" />
            </Space>
            <Space>
                <span>题目筛选：</span>
                <Select v-model="data.problemSearchCondition.difficulty" :placeholder="data.problemPlaceholder.difficulty"
                    style="width:80px" @on-change="handleDifficultyChange">
                    <Option v-for="item in data.difficultList" :value="item.key" :key="item.key">
                        {{ item.lable }}
                    </Option>
                </Select>
                <Select v-model="data.problemSearchCondition.status" :placeholder="data.problemPlaceholder.status"
                    style="width:80px" @on-change="handleStatusChange">
                    <Option v-for="item in data.statusList" :value="item" :key="item">{{
                        item
                    }}</Option>
                </Select>
                <Select class="sb-select" :placeholder="data.problemPlaceholder.tag" style="width:100px" not-found-text="">
                    <div style="width: 500px; padding: 0px 20px 20px 20px;" class="all-tag">
                        <Space style="width:100% ;margin-bottom: 20px;">
                            <Input style="width: 100%;" v-model="data.tagSearchKey" search enter-button placeholder="搜索标签"
                                @on-search="searchTag" />
                            <Button v-if="data.tagSearchList.length != 0" @click="handleTagSelectClearSearch">清空</Button>
                        </Space>
                        <Space style="width: 100%;" v-if="data.tagSearchList.length != 0" direction="vertical">
                            <div class="vertical-center item-title"
                                style=" borderLeft: 3px solid #2d8cf0 ;background-color: #9dcbfb ;display: flex;align-items: center;">
                                搜索结果</div>
                            <Space :wrap="true" style="margin-bottom: 16px;">
                                <Tag v-for="item in data.tagSearchList" color="blue" style="cursor: pointer;"
                                    @click="handleSelectTag(item.name, item)">
                                    {{ item.name }}
                                </Tag>
                            </Space>
                        </Space>
                        <Space class="all-tag-item" v-for="item in data.tagList" direction="vertical">
                            <div class="vertical-center item-title"
                                style=" borderLeft: 3px solid #2d8cf0 ;background-color: #9dcbfb ;display: flex;align-items: center; ">
                                {{ item.name }}</div>
                            <Space :wrap="true" style="margin-bottom: 16px;">
                                <Tag v-for="subitem in item.tags" color="blue" @click="handleSelectTag(item.name, subitem)"
                                    style="cursor: pointer;">{{
                                        subitem.name
                                    }}
                                </Tag>
                            </Space>
                        </Space>
                    </div>
                </Select>
                <Button shape="circle" @click="clearProblemSearchCondition"
                    v-if="data.problemSearchCondition.status != '' || data.problemSearchCondition.status != '' || data.problemSearchCondition.selectedTagList.length !== 0">
                    清除筛选
                    <Icon type="md-refresh" />
                </Button>
            </Space>
        </Space>
        <Row v-if="data.problemSearchCondition.selectedTagList.length !== 0">
            <Space wrap style="padding: 20px 20px 0px 0px; width: 100%;">
                <span>算法标签:</span>
                <Tag v-for="item in data.problemSearchCondition.selectedTagList" :key="item.id" :name="item.name"
                    type="border" closable color="primary" @on-close="handleTagRemove">{{ item.name }}</Tag>
            </Space>
        </Row> -->
        <!-- 表格 -->
        <Table :columns="problemLibraryHeader" :data="data.problemList" style="margin-bottom: 20px;">
            <template #status="{ row }">
                <Icon v-if="row.status" type="md-checkmark" color="#19be6b" />
                <!-- <Icon v-else="row.status" type="md-checkmark" /> -->
            </template>
            <template #difficulty="{ row }">
                <Tag v-if="row.difficulty === 1" color="green">简单</Tag>
                <Tag v-else-if="row.difficulty === 2" color="orange">中等</Tag>
                <Tag v-else color="red">困难</Tag>
            </template>
            <template #rate="{ row }">
                <span>{{ (((row.accept || 0) / (row.totalSubmit || 1)) * 100).toFixed(1) }}%</span>
            </template>
            <template #action="{ row, index }">
                <Button type="primary" shape="circle" @click="handleOpenProblemPage(row.id)">
                    开始挑战
                    <Icon type="ios-arrow-forward"></Icon>
                </Button>
            </template>
        </Table>
        <!-- 使用Space可以非常简单的让分页栏居中 -->
        <Space direction="vertical" type="flex" align="center">
            <Page :total="data.pageInfo.total" :page-size="data.pageInfo.pageSize" show-elevator show-sizer show-total
                :page-size-opts="[10, 15, 20]" :model-value="data.pageInfo.currPage" @on-change="handlePageChange"
                @on-page-size-change="handlePageSizeChange" />
        </Space>
    </div>
</template>
<script setup name="ProblemlistProblemTable">
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';

import msg from '../../../common/msg';
import http from '../../../plugin/axios';
const store = useStore()
const router = useRouter();


const data = reactive({
    problemlistId:router.currentRoute.value.params.id,
    pageInfo: {
        currPage: 1,
        pageSize: 15,
        total: 100
    },
    problemList: [],
    statusList: ['已通过', '未通过'],
    difficultList: [
        { lable: '简单', key: 1 },
        { lable: '中等', key: 2 },
        { lable: '困难', key: 3 },
    ],
    problemSearchCondition: {
        status: '',
        difficulty: 0,
        selectedTagList: [],
        searchKey: '',
        selectedTagMap: new Map()
    },
    problemPlaceholder: {
        difficulty: '难度',
        status: '状态',
        tag: '算法标签'
    },
    tagList: [],
    tagSearchKey: '',
    tagSearchList: [],
    userInfo: store.getters.userInfo,
})

onMounted(() => {
    console.log("asds",router.currentRoute.value.params.id);
    getTagList()
    getProblemlistInfo()
})

const handleOpenProblemPage = (id) => {
    let routeUrl = router.resolve({
        path: "/practice/" + id,
        // query: { id: id }
    });
    window.open(routeUrl.href, '_blank');
}


const getTagList = async () => {
    const { data: res } = await http.get('/problem/tags')
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    data.tagList = res.data.tagList
}


const handlePageChange = (page) => {
    data.pageInfo.currPage = page
    getProblemlistInfo()

}

const handlePageSizeChange = (psize) => {
    getProblemlistInfo()
}

const handleStatusChange = (_) => {
    getProblemlistInfo()
}

const handleDifficultyChange = (_) => {
    getProblemlistInfo()

}

const handleSelectTag = (tagFarther, tag) => {
    console.log(tagFarther, tag)
    if (!data.problemSearchCondition.selectedTagMap.has(tag.id)) {
        data.problemSearchCondition.selectedTagMap.set(tag.id, 0)
        data.problemSearchCondition.selectedTagList.push({
            id: tag.id,
            name: tag.name
        })
    }
    // console.log(data.problemSearchCondition.selectedTagList);
    getProblemlistInfo()
}

const clearProblemSearchCondition = () => {
    data.problemSearchCondition = {
        status: '',
        difficulty: '',
        selectedTagList: [],
        searchKey: '',
        selectedTagMap: new Map()
    }
    getProblemlistInfo()
}

const handleTagRemove = (_, name) => {
    // 删除array指定元素
    let i = 0, id = 0;
    for (i = 0; i < data.problemSearchCondition.selectedTagList.length; i++) {
        if (data.problemSearchCondition.selectedTagList[i].name == name) {
            id = data.problemSearchCondition.selectedTagList[i].id
            break
        }
    }
    data.problemSearchCondition.selectedTagList.splice(i, 1)
    data.problemSearchCondition.selectedTagMap.delete(id)
    getProblemlistInfo()
}



const searchTag = () => {
    if (data.tagSearchKey == '') {
        return
    }
    data.tagList.forEach((i) => {
        i.tags.forEach((item) => {
            if (item.name.includes(data.tagSearchKey)) {
                data.tagSearchList.push({
                    id: item.id,
                    name: item.name
                })
            }
        })
    })
}

const handleTagSelectClearSearch = () => {
    data.tagSearchList = []
}

const getProblemlistInfo = async () => {
    const { data: res } = await http.post('/problemlist/all/problem', {
        problemlistId:BigNumber(data.problemlistId)
    })
    if (res.code != 200) {
        msg.err("题库查询失败" + res.msg)
        return
    }
    data.problemList = res.data.problemlist
    data.pageInfo.total = res.data.total
    // console.log();
}

const problemLibraryHeader = reactive([
    {
        title: ' ',
        key: 'status',
        slot: 'status',
        width: 50,
        align: 'center'
    },
    {
        title: '题号',
        key: 'id',
        width: 90,
        align: 'center'
    },
    {
        title: '题目',
        key: 'title',
        sortable: true
    },
    {
        title: '通过率',
        key: 'rate',
        width: 100,
        align: 'center',
        slot: 'rate'
    },
    {
        title: '难度',
        key: 'difficulty',
        width: 100,
        slot: 'difficulty',
        align: 'center'
    }, {
        title: ' ',
        // key: 'action',
        slot: 'action',
        width: 150,
        align: 'center'
    }
])

</script>

<style lang="less" scoped>
.all-tag {
    width: 100%;
    height: 300px;
}

.all-tag-item {
    width: 100%;
}

.item-title {
    height: 30px;
    margin-bottom: 5px;
    width: 100%;
    // border-left: 3px solid #6ea7f1;
    text-align: left;
    padding-left: 10px;
}

.sb-select {
    :deep(.ivu-select-dropdown) {
        max-height: 600px !important;
    }
}
</style>