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
                                    <Icon style="color: #2b85e4;font-size: 22px;" type="md-add-circle" />
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
                                    <span>总提交数:{{ data.problem.info.acceptCount }}</span>
                                    <span>总通过数:{{ data.problem.info.submitCount }}</span>
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
                                    <Tag color="blue" v-for="item in data.problem.tags"> {{ item.tagName }}</Tag>
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
                                <Select v-model="data.problem.languageTmp" style="width:100px"
                                    @on-change="handleLanguageChange">
                                    <Option v-for="item in data.languageOptions" :value="item.language"
                                        :key="item.language">
                                        {{ item.language }}
                                    </Option>
                                </Select>
                            </Space>
                            <Space>
                                <span style="color: #fff;">主题：</span>
                                <Select v-model="data.problem.theme" style="width:100px" @on-change="handleThemeChange">
                                    <Option v-for="item in data.themOptions" :value="item.theme" :key="item.theme">
                                        {{ item.theme }}
                                    </Option>
                                </Select>
                            </Space>
                            <Button shape="circle">
                                <Icon style="color: #2b85e4;font-size: 20px;" type="md-refresh" />
                            </Button>
                        </Space>
                    </div>
                    <div style="width: 100%;height: calc(100vh - 100px) ; position: relative; overflow: hidden;">
                        <CodeMirror v-model:value="data.codeMirrorOpt.codeContent" :scene="data.codeMirrorOpt.editorType"
                            :height-size="data.codeMirrorOpt.height" :language="data.problem.language"
                            :theme="data.problem.theme" :showDrawer="data.codeMirrorOpt.showDrawer"></CodeMirror>
                        <Drawer placement="bottom" :closable="false" :inner='true' :transfer="false"
                            v-model="data.codeMirrorOpt.showDrawer" :mask-closable="false" :mask="false">
                            <Tabs value="tag1" style="padding:0px">
                                <TabPane label="自测输入" name="tag1">
                                    <Input v-model="data.codeMirrorOpt.userCase" type="textarea" :rows="7" />
                                </TabPane>
                                <TabPane label="运行结果" name="tag2">
                                    <h1>HHHHHHHHHHHHHHHHHHHH-2</h1>
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
                                <Button type="primary" @click="handleSubmitProblem" style="height: 35px;">提交检测</Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </template>

        </Split>
    </div>
    
</template>
<script setup name='Practice'>
import CodeMirror from '../../../components/common/CodeMirror.vue';

import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { RouterView } from 'vue-router';
import http from '../../../plugin/axios';
import router from '../../../router';
import msg from '../../../common/msg';
const data = reactive({
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
        languageTmp: 'Go',
        language: 'text/x-go',
        theme: 'solarized'
    },
    languageOptions: [
        { language: 'C++11', mode: 'text/x-c++src' },
        { language: 'C', mode: 'text/x-csrc' },
        { language: 'Java', mode: 'text/x-java' },
        { language: 'Python', mode: 'text/x-python' },
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
        codeContent: `package main

import "fmt"

func main(){
	fmt.Println("Hello World")
}`,
        editorType: 'edit',
        showDrawer: false
    },
   
});

const handleMenuItemClick = (name) => {
    console.log(name);
    router.push(data.menuObj[Number(name)].path)
}

const handleLanguageChange = (e) => {
    console.log(e);
    data.languageOptions.forEach((item) => {
        if (item.language == e) {
            data.problem.language = item.mode
            console.log("set", data.problem.language);
        }
    })
}

const handleThemeChange = (e) => {
    console.log(e);
}

const openDrawer = () => {
    data.codeMirrorOpt.showDrawer = !data.codeMirrorOpt.showDrawer
    updateCodeMirrorSize()
    data.consoleText = '关闭'
}

const closeDrawer = () => {
    data.codeMirrorOpt.showDrawer = !data.codeMirrorOpt.showDrawer
    updateCodeMirrorSize()
    data.consoleText = '打开'
}


const handleOpenDrawer = () => {
    if (data.codeMirrorOpt.showDrawer) {
        closeDrawer()
    } else {
        openDrawer()
    }
}

// 获取屏幕尺寸
const updateCodeMirrorSize = function () {
    data.windowWidth = window.innerWidth
    data.windowHeight = window.innerHeight

    let h = data.windowHeight - 100
    // if (h > 700) {
    if (data.codeMirrorOpt.showDrawer) {
        data.codeMirrorOpt.height = h - 256
    } else {
        data.codeMirrorOpt.height = h
    }
    // }
}

const handleSubmitProblem = () => {

}

const handleTestProblem = () => {
    openDrawer()
}

const getProblemInfo = async () => {
    const { data: res } = await http.get('/problem/detial?id=' + data.problem.id)
    if (res.code != 200) {
        msg.err(res.msg)
    }
    console.log(res);
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
    // console.log(item);
    router.push(item.path)
}


onMounted(() => {
    nextTick(() => {
        updateByPath(router.currentRoute.value.fullPath)
    })
    getProblemInfo()
    updateCodeMirrorSize()
    window.addEventListener('resize', updateCodeMirrorSize)
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

// .demo-split-pane.no-padding {
//     height: 200px;
//     padding: 0;
// }
</style>