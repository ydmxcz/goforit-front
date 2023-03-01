<template>

    <Table :columns="columns" :data="data">
        <template #title="{ row }">
            <div style="float: left;" class="problem-title" @click="gotoProblem(row)">{{ row.title }}</div>
        </template>
        <template #status="{ row }">
            <span v-if="row.status" style="float: left;"> 已通过 </span>
            <span v-else style="float: left;">未通过</span>
        </template>
    </Table>
</template>
    
<script setup name="CompetitionProblems">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()


const columns = reactive([
    {
        title: '题号',
        key: 'number',
        width: '80',
        align: 'center'
    },
    {
        title: '标题',
        key: 'title',
        align: 'center',
        slot: 'title',
    },
    {
        title: '通过率',
        key: 'rate',
        width: '150',
        align: 'center'
    },
    {
        title: '我的状态',
        key: 'status',
        width: '100',
        align: 'center',
        slot: 'status'
    }
])

const data = reactive([
    { number: 'A', title: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'B', title: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'C', title: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'D', title: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'E', title: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'F', title: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'F', title: '两数之和', rate: '233/999', status: true, id: 123 },
])

const gotoProblem = (item) => {
    router.push('/problem/' + item.id)
}

</script>

<style scoped lang="less">
.problem-title:hover {
    color: #2d8cf0
}
</style>