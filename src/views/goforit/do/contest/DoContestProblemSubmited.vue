<template>
    <Table stripe :columns="data.recordsColums" :data="data.recordsList">
        <template #status="{ row }">
            <span v-if="row.status == 1" style="color:#19be6b">通过</span>
            <span v-else style="color:#ed4014">未知错误</span>
            <!-- <span>{{ row.status }}</span> -->
        </template>
        <template #costTime="{ row }">
            <span>{{ (row.costTime / 1000000).toFixed(1) }} ms</span>
        </template>
        <template #costMemory="{ row }">
            <span>{{ ((row.costMemory / 1024) / 1024).toFixed(1) }} MB</span>
        </template>
        <template #submitTime="{ row }">
            <span>{{ time.formatDate(new Date(Number((row.submitTime / 1000000).toFixed(0)))) }}</span>
            <!-- <span>{{ new Date(row.submitTime / 1000) }}</span> -->
        </template>
    </Table>
    <Space direction="vertical" type="flex" align="center" v-if="data.total > 20">
        <Page :total="data.total" :page-size="data.pageSize" show-elevator show-sizer show-total
            :page-size-opts="[10, 15, 20]" :model-value="data.currPage" @on-change="handlePageOrPageSizeChange"
            @on-page-size-change="handlePageOrPageSizeChange" />
    </Space>
</template>
<script setup name='DoContestProblemSubmited'>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import msg from '../../../../common/msg';
import time from '../../../../common/time';
import http from '../../../../plugin/axios';

const store = useStore()
const router = useRouter()
const data = reactive({
    id: router.currentRoute.value.params.id,
    recordsColums: [
        { title: '提交结果', key: 'status', slot: 'status', width: '100px', align: 'center' },
        { title: '执行用时', key: 'costTime', align: 'center', slot: 'costTime' },
        { title: '内存消耗', key: 'costMemory', align: 'center', slot: 'costMemory' },
        { title: '语言', key: 'lang', align: 'center' },
        { title: '提交时间', key: 'submitTime', align: 'center', slot: 'submitTime' },
    ],
    recordsList: [],
    currPage: 1,
    pageSize: 20,
    total: 0
})


const selectProblemContent = async () => {
    const { data: res } = await http.post('/problem/submit/records', {
        userId: BigInt('1188889026082373823'),
        problemId: Number(data.id),
        currPage: data.currPage,
        pageSize: data.pageSize
    })
    console.log(res)
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    data.recordsList = res.data.records
    data.total = res.data.total
}

const handlePageOrPageSizeChange = () => {
    selectProblemContent()
}


onMounted(() => {
    selectProblemContent()
})

</script>
<style scoped lang='less'></style>