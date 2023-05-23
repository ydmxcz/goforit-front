<template>
    <Table :columns="columns" :data="problemList">
        <template #name="{ row }">
            <div style="float: left;" class="problem-title" @click="gotoProblem(row)">{{ row.name }}</div>
        </template>
        <template #rate="{ row }">
            <span>{{ row.acceptCount }}/{{ row.submitCount }}</span>
        </template>
        <template #status="{ row,idx }">
            <span v-if="row.accepted" style="float: left;"> 已通过 </span>
            <span v-else style="float: left;">未通过</span>
        </template>
    </Table>
</template>
    
<script setup name="ContestProblems">
import { onMounted, reactive, ref } from 'vue';
import http from '../../../plugin/axios';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import msg from '../../../common/msg';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore()
const problemList = ref([
    { number: 'A', name: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'B', name: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'C', name: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'D', name: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'E', name: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'F', name: '两数之和', rate: '233/999', status: true, id: 123 },
    { number: 'F', name: '两数之和', rate: '233/999', status: true, id: 123 },
])
// const problemList = ref([])
const router = useRouter()
const acceptMap = new Map();
const getContestProblems = async () => {
    const { data: res } = await http.post("/contest/problems", { 
        contestId: BigNumber(router.currentRoute.value.params.id) ,
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        if(res.msg.include('redis')){
            return
        }
        msg.err(res.msg)
        return
    }
    console.log(res);
    let arr = []
    if(res.data.accepted) {
        res.data.accepted.forEach((item)=>{
            acceptMap.set(item.problemId,item.accepted)
        })
    } 
    res.data.problems.forEach((item) => {
        arr.push({
            problemIndex: item.problemIndex,
            name: item.name,
            problemId: item.problemId,
            acceptCount: item.acceptCount || 0,
            submitCount: item.submitCount || 0,
            status:false,
            accepted:acceptMap.get(item.problemId)
        })
    })
   
    problemList.value = arr
    // contestInstructionText.value = res.data.instruction
}
const userAccess = async () => {
    const { data: res } = await http.post("/contest/access", {
        contestId: BigNumber(router.currentRoute.value.params.id),
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    if (res.data && res.data.status) {
        data.status = true
    } else {
        data.status = false
    }
    return res.data.status
}

onMounted(() => {
    onMounted(() => {
        if (!userAccess()) {
            msg.err('未报名参加比赛,禁止查询相关信息')
            return
        }
    })
    getContestProblems()
})

const columns = reactive([
    {
        title: '题号',
        key: 'problemIndex',
        width: '80',
        align: 'center'
    },
    {
        title: '标题',
        key: 'name',
        align: 'center',
        slot: 'name',
    },
    {
        title: '通过率',
        slot: 'rate',
        // key: 'rate',
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
//  int32  `protobuf:"varint,1,opt,name=problemIndex,proto3" json:"problemIndex,omitempty"`
//          string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
//     int64  `protobuf:"varint,3,opt,name=problemId,proto3" json:"problemId,omitempty"`
//   int64  `protobuf:"varint,4,opt,name=acceptCount,proto3" json:"acceptCount,omitempty"`
// 





const gotoProblem = (item) => {
    
    router.push('/do/contest/'+router.currentRoute.value.params.id+'/problem/' + item.problemId+'/index/'+item.problemIndex)
}

</script>

<style scoped lang="less">
.problem-title:hover {
    color: #2d8cf0
}
</style>