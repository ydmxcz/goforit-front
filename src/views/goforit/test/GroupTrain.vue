<template>
    <div>
        <Button type="primary" @click="data.showCreatTrain = true">创建训练</Button>
        <Modal v-model="data.showCreatTrain" title="创建训练" :closable="false" :mask-closable="false">
            <Form :model="data.modalFormInput" label-position="right" :label-width="100" :rules="ruleValidate">
                <FormItem label="训练名称" prop="title">
                    <Input v-model="data.modalFormInput.title"></Input>
                </FormItem>
                <FormItem label="是否公开">
                    <Select v-model="data.modalFormInput.publicMode" style="width:120px">
                        <Option v-for="item in data.modalFormInput.publicSelect" :value="item.value" :key="item.value">{{
                            item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="训练标签">
                    <Select class="sb-select" :placeholder="data.selectorPlaceholder" style="width:160px" not-found-text="">
                        <div style="width: 500px; padding: 0px 20px 20px 20px;" class="all-tag">
                            <Space style="width:100% ;margin-bottom: 20px;">
                                <Input style="width: 100%;" v-model="data.tagSearchKey" search enter-button
                                    placeholder="搜索标签" @on-search="searchTag" />
                                <Button v-if="data.tagSearchList.length != 0"
                                    @click="handleTagSelectClearSearch">清空</Button>
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
                                    <Tag v-for="subitem in item.tags" color="blue"
                                        @click="handleSelectTag(item.name, subitem)" style="cursor: pointer;">{{
                                            subitem.name
                                        }}
                                    </Tag>
                                </Space>
                            </Space>
                        </div>
                    </Select>
                </FormItem>


                <FormItem label="已选标签" v-if="data.modalFormInput.selectedTagList.length !== 0">
                    <Space wrap style="width: 100%;">
                        <Button shape="circle" @click="clearSelectedTag">
                            清除筛选
                            <Icon type="md-refresh" />
                        </Button>
                        <Tag v-for="item in data.modalFormInput.selectedTagList" :key="item.id" :name="item.name"
                            type="border" closable color="primary" @on-close="handleTagRemove">{{
                                item.name }}</Tag>
                    </Space>
                </FormItem>
                <FormItem label="训练介绍">
                    <Input v-model="data.modalFormInput.instruction" type="textarea" maxlength="100" :rows="3"
                        show-word-limit placeholder="输入题单介绍...." />
                </FormItem>
            </Form>
            <template #footer>
                <div style="width: 100%;height: 40px;">
                    <Space style="float: right;">
                        <Button @click="createProblemListCancel">取消</Button>
                        <Button type="primary" @click="createProblemListOk">确定</Button>
                    </Space>
                </div>
            </template>
        </Modal>
        
    </div>
</template>
<script setup name="GroupTrain">
import { ref, reactive, onMounted, watch } from 'vue'
import http from '../../../plugin/axios';

const data = reactive({
    modalFormInput: {
        title: '',
        search: [],
        selectedTagList: [],
        searchKey: '',
        selectedTagMap: new Map(),
        publicMode: 1,
        publicSelect: [
            { label: '公开', value: 1 },
            { label: '私有', value: 0 },
        ]
    },
    showCreatTrain: false,
    selectorPlaceholder: '点击选择算法标签',
    tagList: [],
    tagSearchKey: '',
    tagSearchList: [],
})

onMounted(() => {
    getTagList()
})

const getTagList = async () => {
    const { data: res } = await http.get('/problem/tags')
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    data.tagList = res.data.tagList
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

const clearSelectedTag = () => {
    data.modalFormInput.selectedTagList = []
    data.modalFormInput.selectedTagMap = new Map()
}

const clearCreateProblemListFormInput = () => {
    data.modalFormInput = {
        title: '',
        search: [],
        selectedTagList: [],
        searchKey: '',
        selectedTagMap: new Map()
    }
}

const handleTagSelectClearSearch = () => {
    data.tagSearchList = []
}

const handleTagRemove = (_, name) => {
    // 删除array指定元素
    let i = 0, id = 0;
    for (i = 0; i < data.modalFormInput.selectedTagList.length; i++) {
        if (data.modalFormInput.selectedTagList[i].name == name) {
            id = data.modalFormInput.selectedTagList[i].id
            break
        }
    }
    data.modalFormInput.selectedTagList.splice(i, 1)
    data.modalFormInput.selectedTagMap.delete(id)
}

const handleSelectTag = (tagFarther, tag) => {
    console.log(tagFarther, tag)
    if (!data.modalFormInput.selectedTagMap.has(tag.id)) {
        data.modalFormInput.selectedTagMap.set(tag.id, 0)
        data.modalFormInput.selectedTagList.push({
            id: tag.id,
            name: tag.name
        })
    }
}

const createProblemListCancel = () => {
    data.showCreatTrain = false
    clearCreateProblemListFormInput()
}

const createProblemListOk = async () => {
    let tagIds = []
    data.modalFormInput.selectedTagList.forEach((item) => {
        tagIds.push(item.id)
    })
    if (tagIds.length == 0) {
        msg.err('题单至少有一个标签')
        return
    }
    let d = {
        title: data.modalFormInput.title,
        tags: tagIds,
        instruction: data.modalFormInput.instruction,
        public: data.modalFormInput.publicMode,
        creator: BigNumber(store.getters.userInfo.id)
    }

    console.log("simple data:", d)
    const { data: res } = await http.post('/problemlist/add', d)
    if (res.code != 200) {
        msg.err(res.msg)
        return
    } else {
        msg.ok('题单创建成功')
    }
    data.showCreatTrain = false
    clearCreateProblemListFormInput()
    getProblemList()
}

const ruleValidate = reactive({
    title: [
        { required: true, message: '题目名称不能为空', trigger: 'blur' },
        { type: 'string', max: 100, message: '题单名称不能多于20个字', trigger: 'blur' }

    ]
})

</script>
<style scoped lang='less'>
.sort-move {
    transition: transform 0.3s;
}

.data-list-item {
    width: 100%;
    height: 50px;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
}
</style>