<template>
    <div style="width: 100%;">
        <v-md-preview :text="data.content"></v-md-preview>
    </div>
</template>
<script setup name='PracticeProblemContent'>

import {ref,reactive,onMounted} from 'vue'
import { useRouter } from 'vue-router';
import msg from '../../../common/msg';
import http from '../../../plugin/axios';

const router = useRouter();

const data = reactive({
    content:'# 无题目内容',
    id: router.currentRoute.value.params.id,
})


const selectProblemContent = async () => {
	const { data: res } = await http.get('/problem/content?id=' + data.id)
	console.log(res);
    if (res.code != 200) {
        msg.err(res.msg)
        return 
    }
	data.content = res.data.content
}

onMounted(()=>{
    console.log(data.id);
    selectProblemContent()
})

</script>
<style scoped lang='less'>
:deep(div.vuepress-markdown-body) {
    padding: 10px;
}
</style>