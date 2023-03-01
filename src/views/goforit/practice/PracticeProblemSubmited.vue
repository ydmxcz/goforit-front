<template>
    <Table stripe :columns="commitHistoryColumns" :data="commitHistoryList">
        <template #result="{ row }">
            <strong>{{ row.result }}</strong>
        </template>
        <template #mode="{ row, index }">
            <Button type="primary" size="small" style="margin-right: 5px">Test</Button>
        </template>
    </Table>
</template>
<script setup name='PracticeProblemSubmited'>
import { ref, reactive, onMounted } from 'vue'


const commitHistoryColumns = ref([
    { title: '提交结果', key: 'result', slot: 'result' },
    { title: '执行用时', key: 'costTime' },
    { title: '内存消耗', key: 'memCost' },
    { title: '语言', key: 'language' },
    { title: '提交时间', key: 'commitTime' },
    { title: '模式', key: 'mode', slot: 'mode' },
])

const commitHistoryList = reactive([
    {
        result: 'Accept',
        costTime: '18ms',
        memCost: '4096kb',
        language: 'c++11',
        commitTime: '2016-10-03',
        mode: 'acm',
    },
    {
        result: 'Accept',
        costTime: '18ms',
        memCost: '4096kb',
        language: 'c++11',
        commitTime: '2016-10-03',
        mode: 'acm',
    }, {
        result: 'Accept',
        costTime: '18ms',
        memCost: '4096kb',
        language: 'c++11',
        commitTime: '2016-10-03',
        mode: 'acm',
    }, {
        result: 'Accept',
        costTime: '18ms',
        memCost: '4096kb',
        language: 'c++11',
        commitTime: '2016-10-03',
        mode: 'acm',
    }
])

</script>
<style scoped lang='less'></style>