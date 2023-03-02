<template>
    <Space style="padding: 10px 30px; width: 100%;" direction="vertical">
        <div style="width: 100%;">
            <Input search enter-button placeholder="通过名称搜索题解" style="float: left;width: 300px;" />
            <Button type="primary" icon="md-add" style="float: right;" @click="writeProblemSolution">写题解</Button>
        </div>
        <List item-layout="vertical">
            <ListItem v-for="item in data.solutionList" :key="item.title">
                <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description"
                    @click="checkSolution(item)">
                    <template #title>
                        {{ item.title }}
                    </template>

                </ListItemMeta>
                <template #action>
                    <li @click="clickThumbs">
                        <Icon type="ios-thumbs-up-outline" /> 234
                    </li>
                    <li>
                        <Icon type="ios-chatbubbles-outline" /> 345
                    </li>
                </template>
            </ListItem>
        </List>
        <Space direction="vertical" type="flex" align="center" v-if="data.total > 20">
            <Page :total="data.total" :page-size="data.pageSize" show-elevator show-sizer show-total
                :page-size-opts="[10, 15, 20]" :model-value="data.currPage" @on-change="handlePageOrPageSizeChange"
                @on-page-size-change="handlePageOrPageSizeChange" />
        </Space>
    </Space>
    <Modal v-model="data.problemSolution.showModal" :title="'写题解'" width="1000" style="top:20px;margin-bottom: 50px;"
         :before-close="handleModalBeforeClose" scrollable :closable="false" :mask-closable="false">

        <Form :model="data.problemSolution" :label-width="80" :rules="ruleValidate">
            <FormItem label="题解名称" prop="title" >
                <Input v-model="data.problemSolution.title"></Input>
            </FormItem>
            <FormItem label="题目内容" prop="problem">
                <v-md-preview v-if="data.problemSolution.showContent"
                    :text="data.problemSolution.problemContent"></v-md-preview>
                <Button type="primary" @click="handlerProblemContent" :icon="data.problemSolution.btnIcon">
                {{  data.problemSolution.btnText }}</Button>
            </FormItem>
            <FormItem label="题解内容" prop="solution">
                <v-md-editor class="md-editor" v-model="data.problemSolution.solutionContent" height="500px" mode="edit"
                    placeholder="输入题解内容，点击编辑器右上角可以全屏显示编辑器"
                    left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code "></v-md-editor>
            </FormItem>
        </Form>
        <template #footer>
            <div style="width: 100%;height: 40px;">
                <Space style="float: right;">
                    <Button @click="writeSolutionCancel">取消</Button>
                    <Button type="primary" @click="writeSolutionOk">确定</Button>
                </Space>
            </div>
        </template>
    </Modal>
</template>
<script setup name='PracticeProblemSolutions'>
import { ref, reactive, onMounted } from 'vue'
import http from '../../../plugin/axios';
import { useRouter } from 'vue-router';
const router = useRouter();

const data = reactive({
    id: router.currentRoute.value.params.id,
    solutionList: [
        {
            title: 'This is title 1',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
            title: 'This is title 2',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
            title: 'This is title 3',
            description: 'This is description, this is description, this is description.',
            avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
            content: 'This is the content, this is the content, this is the content, this is the content.'
        }
    ],
    total: 0,
    currPage: 1,
    pageSize: 20,
    problemSolution: {
        solutionContent: '',
        problemContent: '',
        title: '',
        showModal: false,
        btnText: '显示',
        showContent: false,
        btnIcon: 'ios-arrow-down'
    }
})


const handleModalBeforeClose = () => {
    console.log('handleModalBeforeClose');
}

const writeSolutionCancel = () => {
    console.log('writeSolutionCancel');
    data.problemSolution.showModal = false
}

const writeSolutionOk = () => {
    console.log('writeSolutionOk');
}

const writeProblemSolution = () => {
    console.log('writeProblemSolution');
    data.problemSolution.showModal = true
}


const checkSolution = (item) => {
    console.log(item);
}


const handlePageOrPageSizeChange = () => {
    console.log("xixix");
}

const handlerProblemContent = () => {
    if (data.problemSolution.showContent) {
        data.problemSolution.showContent = false
        data.problemSolution.btnText = '显示'
        data.problemSolution.btnIcon = 'ios-arrow-down'
    } else {
        if (data.problemSolution.problemContent == '') {
            selectProblemContent()
        }
        data.problemSolution.showContent = true
        data.problemSolution.btnText = '隐藏'
        data.problemSolution.btnIcon = 'ios-arrow-up'
    }
}


const selectProblemContent = async () => {
    const { data: res } = await http.get('/problem/content?id=' + data.id)
    console.log(res);
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    data.problemSolution.problemContent = res.data.content
}

const ruleValidate = reactive({
	title: [
		{ required: true, message: '题目名称不能为空', trigger: 'blur' },
		{ type: 'string', max: 100, message: '个人介绍不能多于100个字', trigger: 'blur' }

	],
    solution: [
		{ required: true, message: '题解内容不能为空', trigger: 'blur' },
	],
})


</script>
<style scoped lang='less'>
:deep(div.vuepress-markdown-body) {
    padding: 10px;
}
</style>