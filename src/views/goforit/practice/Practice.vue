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
                            <div style="width: 100%;">
                                <span>反转链表</span>
                                <Icon style="float: right;" type="md-add-circle" />
                            </div>
                        </template>
                        <!-- <template #action style="width: 40px;">
                            <Icon type="md-add-circle" />
                        </template> -->
                        <template #content>
                            <Space direction="vertical" style="width: 100%;">
                                <Space :size="25">
                                    <span style="color: #2b85e4;">简单</span>
                                    <div>
                                        <Icon type="md-checkmark-circle-outline"
                                            style="font-size: 16px;margin-right: 5px;" />通过率
                                    </div>
                                    <div>
                                        <Icon type="md-time" style="font-size: 16px;margin-right: 5px;" />时间限制：1000 ms
                                    </div>
                                    <div>
                                        <Icon type="md-alert" style="font-size: 16px;margin-right: 5px;" />空间限制:128 M
                                    </div>
                                </Space>
                                <Space style="font-size: 12px;">
                                    <span>知识点:</span>
                                    <Tag color="blue"> 二分</Tag>
                                    <Tag color="blue"> 二分</Tag>
                                    <Tag color="blue"> 二分</Tag>
                                    <Tag color="blue"> 二分</Tag>
                                    <Tag color="blue"> 二分</Tag>
                                </Space>
                            </Space>
                        </template>
                    </PageHeader>
                    <div class="btn-line">
                        <Space :size="15">
                            <div class="btn-item" v-for="item in data.menuObj">
                                <Icon :type="item.icon" style="margin-right: 5px;"/>{{ item.name }}
                            </div>
                        </Space>
                    </div>
                    <!-- <Menu mode="horizontal" active-name="1" @on-select="handleMenuItemClick">
                        <MenuItem v-for="item in data.menuObj" :name="item.id">
                        <Icon :type="item.icon" />{{ item.name }}
                        </MenuItem>
                    </Menu> -->
                    <!-- <Card style="height: 100%;"></Card> -->
                    <!-- <div style="width: 100%;background-color: blue;height: 70px;">
                    </div>
                    Left Pane -->
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

import { ref, reactive, onMounted } from 'vue'
import { RouterView } from 'vue-router';
import router from '../../../router';
const data = reactive({
    windowWidth: 0,
    windowHeight: 0,
    split1: 0.5,
    split2: 0.5,
    consoleText: '打开',
    menuObj: [
        { id: 0, name: '题目内容', icon: 'ios-paper', path: 'content' },
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
    }
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
    // data.codeMirrorOpt.height -= 256
    updateCodeMirrorSize()
    data.consoleText = '关闭'
}

const closeDrawer = () => {
    data.codeMirrorOpt.showDrawer = !data.codeMirrorOpt.showDrawer
    // data.codeMirrorOpt.height += 256
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

onMounted(() => {
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
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            height: 50px;
            display: flex;
            align-items: center;
            padding: 0px 20px;

            .btn-item {
                // border: 1px solid #2b85e4;
                // background-color: #2b85e4;
                height: 40px;
                width: 100px;
                border-radius: 10px;
                color: #515a6e;
                display: flex;
                align-items: center;
                justify-content: center;
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
// }</style>