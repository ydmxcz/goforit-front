<template>
    <div style="width: 100%;">
        <Space style="padding-left: 30px;margin-top: 30px;margin-bottom: 30px;">
            <Input v-model="searchKey" search enter-button placeholder="输入用户名进行搜索" style="width: 300px;float: left;"
                @on-search="searchUserSubmit" />
            <Checkbox style="margin-left: 30px;" v-model="checkboxFlag">只看我的提交</Checkbox>
        </Space>
    </div>
    <Table ref="tableRef" :columns="columns" :data="data">
        <template #runId="{ row }">
            <div class="runid" @click="handleClickRunId(item)">{{ row.runId }}</div>
        </template>
        <template #userName="{ row }">
            <div style="color: #bbb4c5;" @click="handleClickUserName(item)">{{ row.userName }}</div>
        </template>
        <template #problemId="{ row }">
            <div @click="handleClickProblemId(item)">{{ row.problemId }}</div>
        </template>
        <template #result="{ row }">
            <span v-if="row.result == '答案正确'" style="color: #25bb9b;"> {{ row.result }} </span>
            <span v-else style="color: red;"> {{ row.result }} </span>
        </template>
        <template #score="{ row }">
            <!-- 伴随着分数从高到低，颜色从绿到黄再到大红色 -->
            <span v-if="row.score == 100" style="color: #25bb9b;"> {{ row.score }} </span>
            <span v-else-if="row.score >= 80" style="color: #f3be29;"> {{ row.score }} </span>
            <span v-else-if="row.score >= 60" style="color: #e6a23c;"> {{ row.score }} </span>
            <span v-else-if="row.score >= 30" style="color: #f97300;"> {{ row.score }} </span>
            <span v-else style="color: red;"> {{ row.score }} </span>
        </template>
    </Table>
</template>

<script setup name="ContestSubmit">
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

// 运行ID, 用户名, 题号, 运行结果, 得分, 运行时间(ms), 使用内存(KB), 代码长度, 使用语言, 提交时间
const columns = reactive([
    { title: '运行ID', key: 'runId', slot: 'runId',width:100,align:'center', },
    { title: '用户名', key: 'userName', slot: 'userName' ,align:'center',},
    {
        title: '题号', key: 'problemId', slot: 'problemId',width:80,align:'center',
        filters: [
            { label: 'A', value: 1 },
            { label: 'B', value: 2 },
            { label: 'C', value: 3 },
            { label: 'D', value: 4 },
            { label: 'E', value: 5 },
            { label: 'F', value: 6 },
        ],
        filterMultiple: false,
        filterMethod(value, row) {
            if (value === 1) {
                return row.label == 'A';
            } else if (value === 2) {
                return row.label == 'B';
            } else if (value === 3) {
                return row.label == 'C';
            } else if (value === 4) {
                return row.label == 'D';
            } else if (value === 5) {
                return row.label == 'E';
            } else if (value === 6) {
                return row.label == 'F';
            } else {
                return false
            }
        }
    },
    {
        title: '运行结果', key: 'result', slot: 'result',align:'center',
        filters: [
            { label: '答案正确', value: 1 },
            { label: '答案错误', value: 2 },
            { label: '运行超时', value: 3 },
            { label: '段错误', value: 4 },
        ],
        filterMultiple: false,
        filterMethod(value, row) {
            if (value === 1) {
                return row.label == '答案正确';
            } else if (value === 2) {
                return row.label == '答案错误';
            } else if (value === 3) {
                return row.label == '运行超时';
            } else if (value === 4) {
                return row.label == '段错误';
            } else {
                return false
            }
        }
    },
    { title: '得分', key: 'score', sortable: true, align:'center',slot: 'score',width:80 },
    { title: '运行时间(ms)', key: 'costTime',align:'center', sortable: true },
    { title: '使用内存(KB)', key: 'costMem', align:'center',sortable: true },
    { title: '代码长度', key: 'codeLen',align:'center', sortable: true },
    {
        title: '使用语言', key: 'lang',align:'center',width:120,
        filters: [
            { label: 'C', value: 1 },
            { label: 'C++', value: 2 },
            { label: 'Python', value: 3 },
            { label: 'Go', value: 4 },
            { label: 'Rust', value: 5 },
            { label: 'Java', value: 6 },
        ],
        filterMultiple: false,
        filterMethod(value, row) {
            if (value === 1) {
                return row.label == 'C';
            } else if (value === 2) {
                return row.label == 'C++';
            } else if (value === 3) {
                return row.label == 'Python';
            } else if (value === 4) {
                return row.label == 'Go';
            } else if (value === 3) {
                return row.label == 'Rust';
            } else if (value === 4) {
                return row.label == 'Java';
            } else {
                return false
            }
        }
    },
    { title: '提交时间', key: 'submitTime',align:'center', sortable: true },
])

const data = reactive([
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'A', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'C++', submitTime: '2022-12-04 20:59:16' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'A', result: '答案错误', score: 95, costTime: 255, costMem: 137264, codeLen: 1036, lang: 'C', submitTime: '2022-12-04 20:59:15' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'F', result: '答案错误', score: 80, costTime: 255, costMem: 137264, codeLen: 1036, lang: 'C++', submitTime: '2022-12-04 20:59:15' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'D', result: '答案错误', score: 70, costTime: 255, costMem: 137264, codeLen: 1036, lang: 'C++', submitTime: '2022-12-04 20:59:15' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'A', result: '运行超时', score: 60, costTime: 55, costMem: 137264, codeLen: 1036, lang: 'C', submitTime: '2022-12-04 20:59:14' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'A', result: '运行超时', score: 40, costTime: 55, costMem: 137264, codeLen: 1036, lang: 'C++', submitTime: '2022-12-04 20:59:14' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'A', result: '运行超时', score: 19, costTime: 55, costMem: 137264, codeLen: 1036, lang: 'Python', submitTime: '2022-12-04 20:59:14' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'A', result: '段错误', score: 20, costTime: 35, costMem: 137264, codeLen: 1036, lang: 'C++', submitTime: '2022-12-04 20:59:13' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'A', result: '段错误', score: 20, costTime: 35, costMem: 137264, codeLen: 1036, lang: 'C++', submitTime: '2022-12-04 20:59:13' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'A', result: '段错误', score: 20, costTime: 35, costMem: 137264, codeLen: 1036, lang: 'Python', submitTime: '2022-12-04 20:59:13' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'B', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'C++', submitTime: '2022-12-04 20:59:12' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'B', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'Go', submitTime: '2022-12-04 20:58:16' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'B', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'Go', submitTime: '2022-12-04 20:57:16' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'B', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'Go', submitTime: '2022-12-04 20:56:16' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'B', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'Rust', submitTime: '2022-12-04 20:55:16' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'D', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'Rust', submitTime: '2022-12-04 20:54:16' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'E', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'Rust', submitTime: '2022-12-04 20:53:16' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'C', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'Java', submitTime: '2022-12-04 20:52:16' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'C', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'C++', submitTime: '2022-12-04 20:51:16' },
    { runId: '55156718', userName: 'GoForIt 558396654号', problemId: 'C', result: '答案正确', score: 100, costTime: 355, costMem: 137264, codeLen: 1036, lang: 'Java', submitTime: '2022-12-04 20:50:16' }
])

const handleClickProblemId = (item) => {
    router.push('/problem/' + item.id)
}

const handleClickRunId = (item) => {
    // router.push('/problem/' + item.id)
    console.log(item)
}

const handleClickUserName = (item) => {
    console.log(item)
}

const checkboxFlag = ref(false)
const searchKey = ref('')
const searchUserSubmit = () => {

}

const tableRef = ref()

onMounted(() => {
    console.log(tableRef.value)
})

</script>

<style scoped lang="less">
.runid:hover {
    color: #2d8cf0;
}

.problem-title {
    float: left;
    height: 80px;
}

.problem-title:hover {
    color: #2d8cf0;

}
</style>