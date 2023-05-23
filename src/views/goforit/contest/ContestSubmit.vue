<template>
    <!-- <div style="width: 100%;">
        <Space style="padding-left: 30px;margin-top: 30px;margin-bottom: 30px;">
            <Input v-model="searchKey" search enter-button placeholder="输入用户名进行搜索" style="width: 300px;float: left;"
                @on-search="searchUserSubmit" />
            <Checkbox style="margin-left: 30px;" v-model="checkboxFlag">只看我的提交</Checkbox>
        </Space>
    </div> -->
    <Table ref="tableRef" :columns="columns" :data="data">
        <template #id="{ row }">
            <div class="runid" @click="handleClickRunId(item)">{{ row.id }}</div>
        </template>
        <template #user_id="{ row }">
            <div style="color: #bbb4c5;" @click="handleClickUserName(item)">{{ row.user_id }}</div>
        </template>
        <template #problem_number="{ row }">
            <div @click="handleClickProblemId(item)">{{ row.problem_number }}</div>
        </template>
        <template #status="{ row }">
            <span v-if="row.status ==1" style="color: #25bb9b;"> 答案正确 </span>
            <span v-else-if="row.status ==2" style="color: red;"> 答案错误 </span>
            <span v-else-if="row.status ==3" style="color: #e6a23c;"> 运行超时 </span>
            <span v-else-if="row.status ==4" style="color: #f97300;"> 内存超时 </span>
            <span v-else style="color: red;"> 未知错误 </span>
            <!-- <span  style="color: #25bb9b;"> {{ row.status }} </span> -->
            <!-- <span v-else style="color: red;"> {{ row.status }} </span> -->
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
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';

const router = useRouter()

const pageInfo = reactive({
    currPage:1,
    pageSize:10
});


// 运行ID, 用户名, 题号, 运行结果, 得分, 运行时间(ms), 使用内存(KB), 代码长度, 使用语言, 提交时间
const columns = reactive([
    { title: '运行ID', key: 'id', slot: 'id',width:100,align:'center', },
    { title: '用户ID', key: 'user_id', slot: 'user_id' ,align:'center',},
    {
        title: '题号', key: 'problem_number', slot: 'problem_number',width:80,align:'center',
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
        title: '运行结果', key: 'status', slot: 'status',align:'center',
        filters: [
            { label: 1, value: '答案正确' },
            { label: 2, value: '答案错误' },
            { label: 3, value: '运行超时' },
            { label: 4, value: '段错误' },
        ],
        filterMultiple: false,
        filterMethod(value, row) {
            if (value === '答案正确') {
                return row.label == 1;
            } else if (value === '答案错误') {
                return row.label == 2;
            } else if (value === '运行超时') {
                return row.label == 3;
            } else if (value === '段错误') {
                return row.label == 4;
            } else {
                return false
            }
        }
    },
    { title: '得分', key: 'score', sortable: true, align:'center',slot: 'score',width:80 },
    { title: '运行时间(ms)', key: 'cost_time',align:'center', sortable: true },
    { title: '使用内存(KB)', key: 'cost_memory', align:'center',sortable: true },
    { title: '代码长度', key: 'code_length',align:'center', sortable: true },
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
    { title: '提交时间', key: 'submit_time',align:'center', sortable: true },
])

const userAccess = async () => {
    const { data: res } = await http.post("/contest/access", {
        contestId: BigNumber(router.currentRoute.value.params.id),
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    return res.data.status
}


onMounted(()=>{
    getContestRecords()
})
const getContestRecords = async () => {
    const { data: res } = await http.post("/contest/submit/records", {
        contestId: BigNumber(router.currentRoute.value.params.id),
        currPage:Number(pageInfo.currPage),
        pageSize:Number(pageInfo.pageSize)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    data.value = res.data.records
    console.log(res.data);
    // return res.data.status
}


const data = ref([
    { id: '55156718', user_id: '12312433435377623', problem_number: 'A', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'C++', submit_time: '2023-04-04 20:59:16' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'A', status: 1, score: 95, cost_time: 255, cost_memory: 137264, code_length: 1036, lang: 'C', submit_time: '2023-04-04 20:59:15' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'F', status: 2, score: 80, cost_time: 255, cost_memory: 137264, code_length: 1036, lang: 'C++', submit_time: '2023-04-04 20:59:15' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'D', status: 2, score: 70, cost_time: 255, cost_memory: 137264, code_length: 1036, lang: 'C++', submit_time: '2023-04-04 20:59:15' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'A', status: 3, score: 60, cost_time: 55, cost_memory: 137264, code_length: 1036, lang: 'C', submit_time: '2023-04-04 20:59:14' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'A', status: 3, score: 40, cost_time: 55, cost_memory: 137264, code_length: 1036, lang: 'C++', submit_time: '2023-04-04 20:59:14' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'A', status: 4, score: 19, cost_time: 55, cost_memory: 137264, code_length: 1036, lang: 'Python', submit_time: '2023-04-04 20:59:14' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'A', status: 4, score: 20, cost_time: 35, cost_memory: 137264, code_length: 1036, lang: 'C++', submit_time: '2023-04-04 20:59:13' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'A', status: 1, score: 20, cost_time: 35, cost_memory: 137264, code_length: 1036, lang: 'C++', submit_time: '2023-04-04 20:59:13' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'A', status: 1, score: 20, cost_time: 35, cost_memory: 137264, code_length: 1036, lang: 'Python', submit_time: '2023-04-04 20:59:13' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'B', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'C++', submit_time: '2023-04-04 20:59:12' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'B', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'Go', submit_time: '2023-04-04 20:58:16' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'B', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'Go', submit_time: '2023-04-04 20:57:16' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'B', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'Go', submit_time: '2023-04-04 20:56:16' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'B', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'Rust', submit_time: '2023-04-04 20:55:16' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'D', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'Rust', submit_time: '2023-04-04 20:54:16' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'E', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'Rust', submit_time: '2023-04-04 20:53:16' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'C', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'Java', submit_time: '2023-04-04 20:52:16' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'C', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'C++', submit_time: '2023-04-04 20:51:16' },
    { id: '55156718', user_id: '12312433435377623', problem_number: 'C', status: 1, score: 100, cost_time: 355, cost_memory: 137264, code_length: 1036, lang: 'Java', submit_time: '2023-04-04 20:50:16' }
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