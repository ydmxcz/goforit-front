<template>
    <div class="problem-page">
        <Split v-model="data.split1" min="500px" max="400px">
            <template #left>
                <div class="left-area">
                    <PageHeader back hidden-breadcrumb>

                        <template #back>
                            <Icon type="md-home" />
                        </template>
                        <template #title>
                            <div style="width: 100%;display: inline;">
                                <span>{{ data.problem.id }}.{{ data.problem.info.title }}</span>
                                <Poptip style="float: right;" trigger="hover" content="添加到题单">
                                    <Icon style="color: #2b85e4;font-size: 22px;" type="md-add-circle"
                                        @click="handleOpenCollectToProblemList" />
                                </Poptip>
                            </div>
                        </template>
                        <!-- <template #action style="width: 40px;">
                            <Icon type="md-add-circle" />
                        </template> -->
                        <template #content>
                            <Space direction="vertical" style="width: 100%; font-size: 12px;">
                                <Space :size="20" :wrap="true">
                                    <!-- <span style="color: #2b85e4;"></span> -->
                                    <Tag v-if="data.problem.info.difficulty == '简单'" color="green">简单</Tag>
                                    <Tag v-else-if="data.problem.info.difficulty == '中等'" color="orange">中等</Tag>
                                    <Tag v-else color="green">困难</Tag>

                                    <div>
                                        <Icon type="md-checkmark-circle-outline"
                                            style="font-size: 16px;margin-right: 5px;" />通过率：{{
                                                (((data.problem.info.acceptCount || 0) / (data.problem.info.submitCount || 1)) *
                                                    100).toFixed(1) }}%
                                    </div>
                                    <span>总提交数:{{ data.problem.info.submitCount || 0 }}</span>
                                    <span>总通过数:{{ data.problem.info.acceptCount || 0 }}</span>
                                </Space>
                                <Space :size="20" :wrap="true">
                                    <div>
                                        <Icon type="md-alert" style="font-size: 16px;margin-right: 3px;" />
                                        C/C++时空限制:{{ data.problem.info.cTimeLimit / 1000000 }}ms/{{
                                            data.problem.info.cMemoryLimit >> 20 }}MB
                                    </div>
                                    <div>
                                        <Icon type="md-alert" style="font-size: 16px;margin-right: 3px;" />
                                        其他语言:{{ data.problem.info.timeLimit / 1000000 }}ms/{{
                                            data.problem.info.memoryLimit >> 20 }}MB
                                    </div>
                                </Space>
                                <Space style="font-size: 12px;" :wrap="true">
                                    <span>知识点:</span>
                                    <Tag color="blue" v-for="item in data.problem.tags"> {{ item.name }}</Tag>
                                </Space>
                            </Space>
                        </template>
                    </PageHeader>
                    <div class="btn-line">
                        <Space :size="0">
                            <div ref="btnItemDom" class="btn-item" v-for="item in data.menuObj"
                                @click="handleClickBtn(item)">
                                <Icon :type="item.icon" style="margin-right: 5px;" />{{ item.name }}
                            </div>
                        </Space>
                    </div>
                    <RouterView></RouterView>
                </div>
            </template>
            <template #right>
                <div class="right-area">
                    <div class="top-area">
                        <Space :size="30">
                            <Space>
                                <span style="color: #fff;">语言：</span>
                                <Select v-model="data.problem.languageName" style="width:100px"
                                    @on-change="handleLanguageChange">
                                    <Option v-for="item in data.languageOptions" :value="item.language"
                                        :key="item.language">
                                        {{ item.language }}
                                    </Option>
                                </Select>
                            </Space>
                            <Space>
                                <span style="color: #fff;">主题：</span>
                                <Select v-model="data.problem.theme" style="width:100px">
                                    <Option v-for="item in data.themOptions" :value="item.theme" :key="item.theme">
                                        {{ item.theme }}
                                    </Option>
                                </Select>
                            </Space>
                            <Button shape="circle" @click="handlerUpdateCode">
                                <Icon style="color: #2b85e4;font-size: 20px;" type="md-refresh" />
                            </Button>
                        </Space>
                    </div>
                    <div style="width: 100%;height: calc(100vh - 100px) ; position: relative; overflow: hidden;">
                        <CodeMirror v-model:value="data.codeMirrorOpt.code" :scene="data.codeMirrorOpt.editorType"
                            :height-size="data.codeMirrorOpt.height" :language="data.problem.language"
                            :theme="data.problem.theme" :showDrawer="data.codeMirrorOpt.showDrawer"
                            :update-code="data.codeMirrorOpt.updateCode"></CodeMirror>
                        <Drawer placement="bottom" :closable="false" :inner='true' :transfer="false"
                            v-model="data.codeMirrorOpt.showDrawer" :mask-closable="false" :mask="false">
                            <Tabs v-model="data.tabValue" style="padding:0px">
                                <TabPane label="自测输入" name="selfInput">
                                    <Input v-model="data.codeMirrorOpt.userCase" type="textarea" :rows="7" />
                                </TabPane>
                                <TabPane label="运行结果" name="runResult" style="position: relative;">
                                    <Spin fix v-if="data.submitBtnLoading">
                                        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                        <div>Loading</div>
                                    </Spin>
                                    <div v-else>
                                        <span v-if="!data.runRes.status" style="color: green;"></span>
                                        <!-- <span v-if="data.runRes.status == 1" style="color: green;">Accept</span> -->
                                        <!-- <span v-else style="color: red;">{{ selectRunStatus(data.runRes.status) }}</span> -->
                                        <!-- <span>{{ data.runRes }}</span> -->
                                        <Result type="success" v-else-if="data.runRes.status == 1">
                                            <template #title>
                                                Accept
                                            </template>
                                            <template #desc>
                                                <Space>
                                                    <div style="margin: 0 10px;">
                                                        运行时间：{{ (data.runRes.costTime / 1e6).toFixed(2) }} ms
                                                    </div>
                                                    <div style="margin: 0 10px;">
                                                        运行空间：{{ data.runRes.costMemory / 1024 }} KB
                                                    </div>
                                                </Space>
                                            </template>
                                        </Result>
                                        <Result type="error" v-else>
                                            <template #title>
                                                <span>{{ utils.selectRunStatus(data.runRes.status) }}</span>
                                            </template>
                                            <template #extra v-if="data.runRes.statusDetial">
                                                <span style="color:red">{{ data.runRes.statusDetial }}</span>
                                            </template>
                                        </Result>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Drawer>
                    </div>
                    <div style="height: 50px;width: 100%;padding: 0px 20px;">
                        <div style="height: 50px;float: left; display: flex;align-items: center;">
                            <Button type="text" @click="handleOpenDrawer">{{ data.consoleText }}控制台</Button>
                        </div>
                        <div style="height: 50px;float: right; display: flex;align-items: center;">
                            <Space>
                                <Button @click="handleTestProblem" style="height: 35px;">运行自测</Button>
                                <Button type="primary" @click="handleSubmitProblem" style="height: 35px;"
                                    :loading="data.submitBtnLoading">
                                    <span v-if="!data.submitBtnLoading">提交</span>
                                    <span v-else>Loading...</span>
                                </Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </template>

        </Split>
        <Modal v-model="data.showCollectToProblemList" width="360">
            <template #header>
                <p style="text-align:center">
                    添加到题单
                </p>
            </template>
            <div style="display: flex;align-items: center;height: 50px;padding: 0px 5px;" class="my-problem-item"
                @click="handleCreateProblemListModalOpen">
                <Icon type="md-add" style="color: #2b85e4;margin-right: 5px;"></Icon>
                <span>新建题单</span>
            </div>
            <div v-for="item in data.myProblemlists" style="height:50px;width: 100%;padding: 0px 5px;"
                class="my-problem-item">
                <span style="float: left;height: 50px;display: flex;align-items: center;">{{ item.title }}</span>
                <div style="float: right;height: 50px;display: flex;align-items: center;">
                    <Button type="primary" icon="md-add" shape="circle" @click="addProblemToProblemList(item.id)"></Button>
                </div>
            </div>
            <template #footer>
                <div></div>
            </template>
            <Modal v-model="data.showCreatProblemList" title="创建题单">
                <Form :model="data.modalFormInput" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem label="题单名称" prop="title">
                        <Input v-model="data.modalFormInput.title"></Input>
                    </FormItem>
                    <FormItem label="是否公开">
                        <Select v-model="data.modalFormInput.publicMode" style="width:120px">
                            <Option v-for="item in data.modalFormInput.publicSelect" :value="item.value" :key="item.value">
                                {{
                                    item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="题目标签">
                        <Select class="sb-select" :placeholder="data.selectorPlaceholder" style="width:160px"
                            not-found-text="">
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
                    <FormItem label="题单介绍">
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
        </Modal>
    </div>
</template>
<script setup name='Practice'>
import CodeMirror from '../../../../components/common/CodeMirror.vue';
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { RouterView, useRouter } from 'vue-router';
import http from '../../../../plugin/axios';
import msg from '../../../../common/msg';
import { useStore } from 'vuex';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import storage from '../../../../common/storage';
import utils from '../../../../common/utils';

const store = useStore()
const router = useRouter()
const data = reactive({
    userId: store.getters.userInfo.id,
    windowWidth: 0,
    windowHeight: 0,
    split1: 0.5,
    split2: 0.5,
    consoleText: '打开',
    menuObj: [
        { id: 0, name: '题目内容', icon: 'md-document', path: 'content' },
        { id: 1, name: '提交记录', icon: 'ios-paper', path: 'submited' },
        { id: 2, name: '题解', icon: 'ios-people', path: 'solutions' },
    ],
    problem: {
        id: router.currentRoute.value.params.id,
        info: {},
        tags: [],
        languageName: 'C++',
        language: 'text/x-c++src',
        theme: 'solarized'
    },
    languageOptions: [
        { language: 'C++', mode: 'text/x-c++src' },
        { language: 'C', mode: 'text/x-csrc' },
        { language: 'Java', mode: 'text/x-java' },
        { language: 'Python3', mode: 'text/x-python' },
        { language: 'Go', mode: 'text/x-go' },
    ],
    themOptions: [
        { theme: 'default' },
        { theme: 'darcula' },
        { theme: 'idea' },
        { theme: 'eclipse' },
        { theme: 'solarized' },
    ],
    codeMirrorOpt: {
        userCase: '1 2 3 4 5 6 7 8 9',
        height: 300,
        code: ``,
        editorType: 'edit',
        showDrawer: false,
        updateCode: false
    },
    tabValue: 'selfInput',
    submitBtnLoading: false,
    // 下面的字符串不要乱改，或导致在代码编辑器格式有问题
    codeTemplate: {
        "C++": `#include <iostream>
using namespace std;
int main()
{     
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`,
        "C": `#include<stdio.h>

int main() {
    int a,b;
    scanf("%d%d",&a,&b);
    ptintf("%d\\n",a+b);
}`,
        "Java": `import java.util.Scanner;
 
 public class Main{
     public static void main(String[] args) {
         Scanner sc=new Scanner(System.in);
         int a=sc.nextInt();
         int b=sc.nextInt();
         System.out.println(a+b);
     }    
 }`,
        "Python3": `a=input().split()
print(int(a[0])+int(a[1]))
`,
        "Go": `package main

import "fmt"

func main(){
    var a,b int
    fmt.Scanln(&a,&b)
	fmt.Println(a+b)
}`,
    },
    showCollectToProblemList: false,
    myProblemlists: [],
    showCreatProblemList: false,
    modalFormInput: {
        title: '',
        search: [],
        selectedTagList: [],
        searchKey: '',
        selectedTagMap: new Map(),
        publicMode: 1,
        publicSelect: [
            { label: '公开', value: 1 },
            { label: '私有', value: 2 },
        ]
    },
    tagList: [],
    tagSearchKey: '',
    tagSearchList: [],
    runRes: {},
    // errorArray: [
    //     "Accept",        // normal
    //     "Compile Error",         // compile error
    //     "Memory Limit Exceeded", // mle
    //     "Time Limit Exceeded", // tle
    //     "Output Limit Exceeded", // ole
    //     "File Error", // fe
    //     "Nonzero Exit Status",
    //     "Signalled",
    //     "Internal Error", // system error
    //     "Wrong Answer"]
});

const addProblemToProblemList = async (problemlistId) => {
    const { data: res } = await http.post('/problemlist/add/problem', {
        problemlistId: BigNumber(problemlistId),
        problemId: BigNumber(data.problem.id),
    })
    console.log(res);
    if (res.code != 200) {
        msg.err(res.msg)
        return
    } else {
        msg.ok('添加题目成功')
    }
    // data.showCreatProblemList = false
    data.showCollectToProblemList = false
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
    data.modalFormInputselectedTagMap = new Map()
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
    data.showCreatProblemList = false
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
    getMyProblemList()
    data.showCreatProblemList = false
    clearCreateProblemListFormInput()
}


const getTagList = async () => {
    const { data: res } = await http.get('/problem/tags')
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    data.tagList = res.data.tagList
}

const handleCreateProblemListModalOpen = () => {
    data.showCreatProblemList = true
    clearCreateProblemListFormInput()
    getTagList()
}

const handleOpenCollectToProblemList = () => {
    data.showCollectToProblemList = true
    getMyProblemList()
}

// 查询我创建的题单
const getMyProblemList = async () => {
    const { data: res } = await http.post('/problemlist/my', { userId: BigNumber(store.getters.userInfo.id) })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    } else {
        data.myProblemlists = res.data.problemlist
    }
}


const handlerUpdateCode = () => {
    refreshCodeTemplate(data.codeTemplate[data.problem.languageName])
}


const refreshCodeTemplate = (code) => {
    data.codeMirrorOpt.updateCode = !data.codeMirrorOpt.updateCode
    data.codeMirrorOpt.code = code
}


const handleLanguageChange = (e) => {
    data.languageOptions.forEach((item) => {
        if (item.language == e) {
            data.problem.language = item.mode
            initCodeInEdit()
        }
    })
}

const openDrawer = (tabName) => {
    data.codeMirrorOpt.showDrawer = true//!data.codeMirrorOpt.showDrawer
    updateCodeMirrorSize()
    data.consoleText = '关闭'
    data.tabValue = tabName//'selfInput'
}

const closeDrawer = () => {
    data.codeMirrorOpt.showDrawer = false//!data.codeMirrorOpt.showDrawer
    updateCodeMirrorSize()
    data.consoleText = '打开'
}


const handleOpenDrawer = () => {
    if (data.codeMirrorOpt.showDrawer) {
        closeDrawer()
    } else {
        openDrawer('selfInput')
    }
}

// 获取屏幕尺寸
const updateCodeMirrorSize = function () {
    data.windowWidth = window.innerWidth
    data.windowHeight = window.innerHeight

    let h = data.windowHeight - 100
    if (data.codeMirrorOpt.showDrawer) {
        data.codeMirrorOpt.height = h - 256
    } else {
        data.codeMirrorOpt.height = h
    }
}

// const selectRunStatus = (i) => {
//     if (i > data.errorArray.length) {
//         i = 0
//     }
//     return data.errorArray[i - 1]
// }


const handleSubmitProblem = async () => {
    data.submitBtnLoading = true
    openDrawer('runResult')

    let d = {
        userId: BigNumber(data.userId),
        problemId: BigNumber(data.problem.id),
        language: data.problem.languageName,
        code: data.codeMirrorOpt.code,
    }
    console.log(d);
    const { data: res } = await http.post('/problem/submit', d)
    console.log(res);
    if (res.code != 200) {
        msg.err(res.msg)
        data.runRes = {
            status: 0,
            statusDetial: res.msg
        }

    } else {
        data.runRes = res.data
    }
    data.submitBtnLoading = false
    // setTimeout(() => {
    //     data.submitBtnLoading = false
    // }, 1000)
}


const handleTestProblem = () => {
    openDrawer('runResult')
}

const getProblemInfo = async () => {
    const { data: res } = await http.get('/problem/detial?id=' + data.problem.id)
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    // console.log(res);
    data.problem.info = res.data.info
    data.problem.tags = res.data.tags
}

const btnItemDom = ref([]);
watch(
    () => router.currentRoute.value.fullPath,
    (newPath) => {
        if (newPath == undefined) {
            return
        }
        updateByPath(newPath)
    },
    { immediate: false }
);

const updateByPath = (path) => {
    let i = 0
    data.menuObj.forEach((item) => {
        if (path.includes(item.path)) {
            btnItemDom.value[i].id = 'active-btn';
        } else {
            btnItemDom.value[i].id = '';
        }
        i++
    })
}

const handleClickBtn = (item) => {
    router.push(item.path)
}
const initCodeInEdit = () => {
    let code = storage.get(data.userId + '_' + data.problem.languageName + '_' + data.problem.id)
    if (!code) {
        refreshCodeTemplate(data.codeTemplate[data.problem.languageName])
    } else {
        refreshCodeTemplate(code)
    }
}


onMounted(() => {
    console.log(data.userId)
    nextTick(() => {
        updateByPath(router.currentRoute.value.fullPath)
    })
    initCodeInEdit()
    getProblemInfo()
    updateCodeMirrorSize()
    window.addEventListener('resize', updateCodeMirrorSize)
})

const ruleValidate = reactive({
    title: [
        { required: true, message: '题目名称不能为空', trigger: 'blur' },
        { type: 'string', max: 100, message: '题单名称不能多于20个字', trigger: 'blur' }

    ]
})
</script>
<style scoped lang='less'>
.problem-page {
    height: calc(100vh);
    width: calc(100vw);
    background-color: #fff;
    min-height: 700px;
    min-width: 900px;

    .left-area {
        height: 100%;
        overflow-y: auto;

        .btn-line {
            background-color: #eee;
            width: 100%;
            // border-top: 1px solid #ddd;
            // border-bottom: 1px solid #ddd;
            height: 35px;
            display: flex;
            align-items: center;
            padding: 0px 20px;

            .btn-item {
                // border: 1px solid #2b85e4;
                // background-color: #2b85e4;
                background-color: #eee;
                height: 35px;
                font-size: 12px;
                width: 100px;
                border-radius: 7px;
                color: #515a6e;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
        }
    }

    .right-area {
        // padding: 0px 10px;
        padding-left: 5px;

        .top-area {
            width: 100%;
            background-color: #2d8cf0;
            height: 50px;
            display: flex;
            align-items: center;
            padding: 0px 20px;
        }
    }
}

#active-btn {
    background-color: #2b85e4;
    color: #fff;
}

.demo-spin-col .circular {
    width: 25px;
    height: 25px;
}

.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
    from {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}

.my-problem-item:hover {
    background-color: #eee;
}


.sb-select {
    :deep(.ivu-select-dropdown) {
        max-height: 600px !important;
    }
}
</style>