<template>
    <div style="width: 100%;">
        <v-md-preview :text="data.content"></v-md-preview>
    </div>
</template>
<script setup name='PracticeProblemContent'>

import {ref,reactive,onMounted} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const data = reactive({
    content:'# 无题目内容',
    id: router.currentRoute.value.params.id,
})

onMounted(()=>{
    console.log(data.id);
})

</script>
<style scoped lang='less'>
:deep(div.vuepress-markdown-body) {
    padding: 10px;
}
</style>