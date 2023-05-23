<template>
    <Space direction="vertical" style="width: 100%;">
        <div style="width: 100%;">
            <Button type="primary" icon="md-fresh" style="float: right;" @click="selectProblemSubmitRecords">刷新</Button>
        </div>
        <Table stripe :columns="data.recordsColums" :data="data.recordsList">
            <template #status="{ row }">
                <span v-if="row.status == 1" style="color:#19be6b">Accept</span>
                <span v-else style="color:#ed4014">{{ utils.selectRunStatus(row.status) }} </span>
            </template>
            <template #costTime="{ row }">
                <span>{{ ((row.costTime / 1000000) || 0).toFixed(1) }} ms</span>
            </template>
            <template #costMemory="{ row }">
                <span>{{ ((row.costMemory / 1024) || 0).toFixed(1) }} KB</span>
            </template>
            <template #submitTime="{ row }">
                <span>{{ utils.formatDate(new Date(Number((row.submitTime / 1000000).toFixed(0)))) }}</span>
                <!-- <span>{{ new Date(row.submitTime / 1000) }}</span> -->
            </template>
        </Table>
        <Space direction="vertical" type="flex" align="center" v-if="data.total > data.pageSize" style="margin: 10px 0px;">
            <Page :total="data.total" :page-size="data.pageSize" show-elevator show-sizer show-total
                :page-size-opts="[10, 15, 20]" :model-value="data.currPage" @on-change="handlePageChange"
                @on-page-size-change="handlePageSizeChange" />
        </Space>
    </Space>
</template>

<script setup name='PracticeProblemSubmited'>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import msg from '../../../../common/msg';
import utils from '../../../../common/utils';
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
    pageSize: 10,
    total: 0
})

const selectProblemSubmitRecords = async () => {
    const { data: res } = await http.post('/problem/submit/records', {
        userId: BigNumber(store.getters.userInfo.id),
        problemId: Number(data.id),
        currPage: data.currPage,
        pageSize: data.pageSize
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    data.recordsList = res.data.records
    data.total = res.data.total
}

const handlePageChange = (page) => {
    data.currPage = page
    selectProblemSubmitRecords()
}

const handlePageSizeChange = (pageSize) => {
    data.pageSize = pageSize
    selectProblemSubmitRecords()
}

onMounted(() => {
    selectProblemSubmitRecords()
})

</script>
<style scoped lang='less'></style>