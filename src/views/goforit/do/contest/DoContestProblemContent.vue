<template>
    <div style="width: 100%;">
        <v-md-preview :text="data.content"></v-md-preview>
    </div>
</template>
<script setup name='PracticeProblemContent'>

import {ref,reactive,onMounted} from 'vue'
import { useRouter } from 'vue-router';
import msg from '../../../../common/msg';
import http from '../../../../plugin/axios';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';

const router = useRouter();

const data = reactive({
    content:'# 无题目内容',
    id: router.currentRoute.value.params.id,
})

const problemId = ref(router.currentRoute.value.params.problemId);
const contestId = ref(router.currentRoute.value.params.contestId);

const selectProblemContent = async () => {
	const { data: res } = await http.post('/contest/problem/content' ,{
        contestId:BigNumber(contestId.value),
        problemId:BigNumber(problemId.value)
    })
	console.log(res);
    if (res.code != 200) {
        msg.err(res.msg)
        return 
    }
	data.content = res.data.content
}

onMounted(()=>{
    // console.log(data.id);
    selectProblemContent()
})

</script>
<style scoped lang='less'>
:deep(div.vuepress-markdown-body) {
    padding: 10px;
}
</style>